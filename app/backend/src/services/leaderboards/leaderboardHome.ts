import { LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';
import LeaderboardsHelpers from './helpers';
/* referencia para remover duplicados https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
referencia sort compare https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-valu
*/
class LeaderBoardHomeService {
  private matchModel: LeaderBoardModel;
  private helpers = new LeaderboardsHelpers();
  private allMatches: any[];
  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private getHomeMatches(teamId: number) {
    const homeMatches = this.allMatches.filter((matches) => matches.homeTeam === teamId);
    return homeMatches;
  }

  async getAllMatches() {
    const allMatches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return allMatches;
  }

  async getAll() {
    this.allMatches = await this.getAllMatches();
    const leaderboardsHome = this.allMatches.map((team: any) => {
      const homeMatches = this.getHomeMatches(team.homeTeam);
      return {
        name: team.teamHome.teamName,
        totalPoints: LeaderboardsHelpers.countGamePoints(homeMatches),
        totalGames: LeaderboardsHelpers.countTotalGames(homeMatches),
        totalVictories: LeaderboardsHelpers.countVictories(homeMatches),
        totalLosses: LeaderboardsHelpers.countLoses(homeMatches),
        totalDraws: LeaderboardsHelpers.countDraws(homeMatches),
        goalsFavor: LeaderboardsHelpers.countTotalGoalsFavor(homeMatches),
        goalsOwn: LeaderboardsHelpers.countTotalGoalsOwn(homeMatches),
        goalsBalance: LeaderboardsHelpers.countTotalGoalsBalance(homeMatches),
        efficiency: LeaderboardsHelpers.getEfficiency(homeMatches),
      };
    });
    const teamsSorted = LeaderboardsHelpers.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardHomeService;
