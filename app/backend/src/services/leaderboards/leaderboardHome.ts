import { LeaderBoard, LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';
/* referencia para remover duplicados https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
referencia sort compare https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
*/
class LeaderBoardHomeService {
  matchModel: LeaderBoardModel;
  arrayWithoutDuplicates: [];
  lintSortCompare:any;
  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  async getHomeMatches(teamId: number) {
    const homeMatches = await this.matchModel.findAll({
      where: { homeTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return homeMatches;
  }

  async getAwayMatches(teamId: number) {
    const awayMatches = await this.matchModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamAway', attributes: { exclude: ['id'] } },
    });
    return awayMatches;
  }

  async countTotalGames(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGames = home.length;
    return totalGames;
  }

  async countGamePoints(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const countPoints = home.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    return countPoints;
  }

  async countTotalGoalsFavor(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGoalsFavor = home
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);

    return totalGoalsFavor;
  }

  async countTotalGoalsOwn(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalGoalsFavor = home
      .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);

    return totalGoalsFavor;
  }

  async countTotalGoalsBalance(teamId: number) {
    const homeGoals = await this.countTotalGoalsFavor(teamId);
    const awayGoals = await this.countTotalGoalsOwn(teamId);
    const balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  async countVictories(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalVictories = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0);
    return totalVictories;
  }

  async countLoses(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalLoses = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0);

    return totalLoses;
  }

  async countDraws(teamId: number) {
    const home = await this.getHomeMatches(teamId);
    const totalDraws = home
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0);

    return totalDraws;
  }

  async getEfficiency(teamId: number) {
    const totalPoints = await this.countGamePoints(teamId);
    const totalGames = await this.countTotalGames(teamId);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  Sortcompare(a: number, b: number) {
    this.lintSortCompare = '';
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  }

  async sortTeams(teams: any) {
    const t = await teams;
    this.arrayWithoutDuplicates = t
      .filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i);
    return this.arrayWithoutDuplicates
      .sort((a: LeaderBoard, b: LeaderBoard) => this.Sortcompare(a.goalsOwn, b.goalsOwn))
      .sort((a: LeaderBoard, b: LeaderBoard) => this.Sortcompare(a.goalsFavor, b.goalsFavor))
      .sort((a: LeaderBoard, b: LeaderBoard) => this.Sortcompare(a.goalsBalance, b.goalsBalance))
      .sort((a: LeaderBoard, b: LeaderBoard) => this.Sortcompare(a.totalPoints, b.totalPoints));
  }

  async getAll() {
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    const leaderboardsHome = Promise.all(matches.map(async (team: any) => ({
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
    const teamsSorted = this.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardHomeService;
