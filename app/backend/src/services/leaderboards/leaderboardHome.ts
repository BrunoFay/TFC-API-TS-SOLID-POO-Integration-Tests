import { LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';
import LeaderboardsHelpers from './helpers';
/* referencia para remover duplicados https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
referencia sort compare https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
*/
class LeaderBoardHomeService {
  private matchModel: LeaderBoardModel;
  private helpers = new LeaderboardsHelpers();
  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private async getHomeMatches(teamId: number) {
    const homeMatches = await this.matchModel.findAll({
      where: { homeTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
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
    const matches = await this.getAllMatches();
    const leaderboardsHome = await Promise.all(matches.map(async (team: any) => {
      const homeMatches = await this.getHomeMatches(team.homeTeam);
      return {
        name: team.teamHome.teamName,
        totalPoints: await LeaderboardsHelpers.countGamePoints(homeMatches),
        totalGames: await LeaderboardsHelpers.countTotalGames(homeMatches),
        totalVictories: await LeaderboardsHelpers.countVictories(homeMatches),
        totalLosses: await LeaderboardsHelpers.countLoses(homeMatches),
        totalDraws: await LeaderboardsHelpers.countDraws(homeMatches),
        goalsFavor: await LeaderboardsHelpers.countTotalGoalsFavor(homeMatches),
        goalsOwn: await LeaderboardsHelpers.countTotalGoalsOwn(homeMatches),
        goalsBalance: await LeaderboardsHelpers.countTotalGoalsBalance(homeMatches),
        efficiency: await LeaderboardsHelpers.getEfficiency(homeMatches),
      };
    }));
    const teamsSorted = LeaderboardsHelpers.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardHomeService;
