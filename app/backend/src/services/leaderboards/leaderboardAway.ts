import { LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';
import LeaderboardsHelpers from './helpers';

class LeaderBoardAwayService {
  private matchModel: LeaderBoardModel;
  private helpers = new LeaderboardsHelpers();
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

  async getAllMatches() {
    const allMatches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return allMatches;
  }

  async getAll() {
    const matches = await this.getAllMatches();
    const leaderboardsAway = await Promise.all(matches.map(async (team: any) => {
      const awayMatches = await this.getHomeMatches(team.homeTeam);
      return {
        name: team.teamHome.teamName,
        totalPoints: await LeaderboardsHelpers.countGamePoints(awayMatches, true),
        totalGames: await LeaderboardsHelpers.countTotalGames(awayMatches),
        totalVictories: await LeaderboardsHelpers.countVictories(awayMatches, true),
        totalLosses: await LeaderboardsHelpers.countLoses(awayMatches, true),
        totalDraws: await LeaderboardsHelpers.countDraws(awayMatches),
        goalsFavor: await LeaderboardsHelpers.countTotalGoalsFavor(awayMatches, true),
        goalsOwn: await LeaderboardsHelpers.countTotalGoalsOwn(awayMatches, true),
        goalsBalance: await LeaderboardsHelpers.countTotalGoalsBalance(awayMatches, true),
        efficiency: await LeaderboardsHelpers.getEfficiency(awayMatches, true),
      };
    }));
    const teamsSorted = LeaderboardsHelpers.sortTeams(leaderboardsAway);

    return teamsSorted;
  }
}
export default LeaderBoardAwayService;
