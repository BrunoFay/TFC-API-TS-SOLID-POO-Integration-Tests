import { LeaderBoard, LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';

class LeaderBoardAwayService {
  private matchModel: LeaderBoardModel;

  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private async getHomeMatches(teamId: number) {
    const homeMatches = await this.matchModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return homeMatches;
  }

  private async countTotalGames(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGames = home.length;
    return totalGames;
  }

  private async countGamePoints(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const countPoints = home.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return countPoints;
  }

  private async countTotalGoalsFavor(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGoalsFavor = home
      .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  private async countTotalGoalsOwn(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGoalsFavor = home.reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);
    return totalGoalsFavor;
  }

  private async countTotalGoalsBalance(teamId: number) {
    const homeGoals = await this.countTotalGoalsFavor(teamId);
    const awayGoals = await this.countTotalGoalsOwn(teamId);
    const balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  private async countVictories(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalVictories = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals < curr.awayTeamGoals) ? acc + 1 : acc), 0);

    return totalVictories;
  }

  private async countLoses(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalLoses = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals < curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalLoses;
  }

  private async countDraws(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalDraws = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0);

    return totalDraws;
  }

  private async getEfficiency(teamId: number) {
    const totalPoints = await this.countGamePoints(teamId);
    const totalGames = await this.countTotalGames(teamId);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }


  private static async sortTeams(teams: any) {
    const teamsSorted = await teams
      .filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i);
    return teamsSorted.sort((a:any, b:any) =>
    b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn)
  }

  async getAll() {
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    const leaderboardsHome = await Promise.all(matches.map(async (team: any) => ({
      name: team.teamHome.teamName,
      totalPoints: await this.countGamePoints(team.homeTeam),
      totalGames: await this.countTotalGames(team.homeTeam),
      totalVictories: await this.countVictories(team.homeTeam),
      totalLosses: await this.countLoses(team.homeTeam),
      totalDraws: await this.countDraws(team.homeTeam),
      goalsFavor: await this.countTotalGoalsFavor(team.homeTeam),
      goalsOwn: await this.countTotalGoalsOwn(team.homeTeam),
      goalsBalance: await this.countTotalGoalsBalance(team.homeTeam),
      efficiency: await this.getEfficiency(team.homeTeam),
    })));
    const teamsSorted = LeaderBoardAwayService.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardAwayService;
