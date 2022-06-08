import { Match } from '../../types/matches';
import Teams from '../../database/models/Teams';
import { LeaderBoardModel } from '../../types/leaderBoard';

class LeaderBoardService {
  private matchModel: LeaderBoardModel;
  private allMatches: Match[];

  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private getAwayMatches(teamId: number) {
    const awayMatches = this.allMatches.filter((matches) => matches.awayTeam === teamId);
    return awayMatches;
  }

  private getHomeMatches(teamId: number) {
    const homeMatches = this.allMatches.filter((matches) => matches.homeTeam === teamId);
    return homeMatches;
  }

  private countTotalGames(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalGames = home.length + away.length;
    return totalGames;
  }

  private countGamePoints(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const countPoints = home.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0)
      + away.reduce((acc: number, curr: any) => {
        if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
        if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    return countPoints;
  }

  private countTotalGoalsFavor(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalGoalsFavor = home
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0)
      + away.reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  private countTotalGoalsOwn(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalGoalsFavor = away
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0)
      + home.reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  private countTotalGoalsBalance(teamId: number) {
    const homeGoals = this.countTotalGoalsFavor(teamId);
    const awayGoals = this.countTotalGoalsOwn(teamId);
    const balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  private countVictories(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalVictories = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0)
      + away
        .reduce((
          acc: number,
          curr: any,
        ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalVictories;
  }

  private countLoses(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalLoses = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0)
      + away
        .reduce((
          acc: number,
          curr: any,
        ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0);
    return totalLoses;
  }

  private countDraws(teamId: number) {
    const home = this.getHomeMatches(teamId);
    const away = this.getAwayMatches(teamId);
    const totalDraws = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0)
      + away
        .reduce((
          acc: number,
          curr: any,
        ) => ((curr.awayTeamGoals === curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalDraws;
  }

  private getEfficiency(teamId: number) {
    const totalPoints = this.countGamePoints(teamId);
    const totalGames = this.countTotalGames(teamId);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private static sortTeams(teams: any) {
    const teamsSorted = teams
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
    this.allMatches = await this.getAllMatches();
    const leaderboardsHome = this.allMatches.map((team: any) => ({
      name: team.teamHome.teamName,
      totalPoints: this.countGamePoints(team.homeTeam),
      totalGames: this.countTotalGames(team.homeTeam),
      totalVictories: this.countVictories(team.homeTeam),
      totalLosses: this.countLoses(team.homeTeam),
      totalDraws: this.countDraws(team.homeTeam),
      goalsFavor: this.countTotalGoalsFavor(team.homeTeam),
      goalsOwn: this.countTotalGoalsOwn(team.homeTeam),
      goalsBalance: this.countTotalGoalsBalance(team.homeTeam),
      efficiency: this.getEfficiency(team.homeTeam),
    }));
    const teamsSorted = LeaderBoardService.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardService;
