import Teams from '../../database/models/Teams';
import { LeaderBoard, LeaderBoardModel } from '../../types/leaderBoard';

class LeaderBoardService {
  private matchModel: LeaderBoardModel;

  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private async getHomeMatches(teamId: number) {
    const homeMatches = await this.matchModel.findAll({
      where: { homeTeam: teamId, inProgress: false },
      include: { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return homeMatches;
  }

  private async getAwayMatches(teamId: number) {
    const awayMatches = await this.matchModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
      include: { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    });
    return awayMatches;
  }

  private static async countTotalGames(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalGames = matchesH.length + matchesA.length;
    return totalGames;
  }

  private static async countGamePoints(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const countPoints = matchesH.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0)
      + matchesA.reduce((acc: number, curr: any) => {
        if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
        if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return countPoints;
  }

  private static async countTotalGoalsFavor(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalGoalsFavor = matchesH.reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0)
      + matchesA.reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  private static async countTotalGoalsOwn(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalGoalsFavor = matchesA
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0)
      + matchesH.reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  private static async countTotalGoalsBalance(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const homeGoals = await this.countTotalGoalsFavor(matchesH, matchesA);
    const awayGoals = await this.countTotalGoalsOwn(matchesA, matchesH);
    const balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  private static async countVictories(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalVictories = matchesH.reduce((
      acc: number,
      curr: any,
    ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0)
      + matchesA.reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalVictories;
  }

  private static async countLoses(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalLoses = matchesH.reduce((
      acc: number,
      curr: any,
    ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0)
      + matchesA.reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0);
    return totalLoses;
  }

  private static async countDraws(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalDraws = matchesH.reduce((
      acc: number,
      curr: any,
    ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0)
      + matchesA.reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals === curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalDraws;
  }

  private static async getEfficiency(matchesH: LeaderBoard[], matchesA: LeaderBoard[]) {
    const totalPoints = await this.countGamePoints(matchesH, matchesA);
    const totalGames = await this.countTotalGames(matchesA, matchesH);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private static async sortTeams(teams: any) {
    const teamsSorted = await teams
      .filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i);
    return teamsSorted.sort((a: any, b: any) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
  }

  async getAllMatches() {
    const allMatches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return allMatches;
  }

  async getAll() {
    const matches = await this.getAllMatches();
    const leaderboardsHome = await Promise.all(matches.map(async (team: any) => {
      const homeMatches = await this.getHomeMatches(team.homeTeam);
      const awayMatches = await this.getAwayMatches(team.homeTeam);
      return {
        name: team.teamHome.teamName,
        totalPoints: await LeaderBoardService.countGamePoints(homeMatches, awayMatches),
        totalGames: await LeaderBoardService.countTotalGames(homeMatches, awayMatches),
        totalVictories: await LeaderBoardService.countVictories(homeMatches, awayMatches),
        totalLosses: await LeaderBoardService.countLoses(homeMatches, awayMatches),
        totalDraws: await LeaderBoardService.countDraws(homeMatches, awayMatches),
        goalsFavor: await LeaderBoardService.countTotalGoalsFavor(homeMatches, awayMatches),
        goalsOwn: await LeaderBoardService.countTotalGoalsOwn(homeMatches, awayMatches),
        goalsBalance: await LeaderBoardService.countTotalGoalsBalance(homeMatches, awayMatches),
        efficiency: await LeaderBoardService.getEfficiency(homeMatches, awayMatches),
      };
    }));
    return LeaderBoardService.sortTeams(leaderboardsHome);
  }
}
export default LeaderBoardService;
