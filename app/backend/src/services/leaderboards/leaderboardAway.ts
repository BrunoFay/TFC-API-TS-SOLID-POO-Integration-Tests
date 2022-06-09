import { LeaderBoardModel } from '../../types/leaderBoard';
import TeamsM from '../../database/models/Teams';
import LeaderboardsHelpers from '../../helpers/LeaderboardHelpers';
import { Match } from '../../types/matches';

class LeaderBoardAwayService {
  private matchModel: LeaderBoardModel;
  private helpers = new LeaderboardsHelpers();
  private allMatches: Match[];
  constructor(matchModel: LeaderBoardModel) {
    this.matchModel = matchModel;
  }

  private getAwayMatches(teamId: number) {
    const awayMatches = this.allMatches.filter((matches) => matches.awayTeam === teamId);
    return awayMatches;
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
    const leaderboardsAway = this.allMatches.map((team: any) => {
      const awayMatches = this.getAwayMatches(team.homeTeam);
      return {
        name: team.teamHome.teamName,
        totalPoints: LeaderboardsHelpers.countGamePoints(awayMatches, true),
        totalGames: LeaderboardsHelpers.countTotalGames(awayMatches),
        totalVictories: LeaderboardsHelpers.countVictories(awayMatches, true),
        totalLosses: LeaderboardsHelpers.countLoses(awayMatches, true),
        totalDraws: LeaderboardsHelpers.countDraws(awayMatches),
        goalsFavor: LeaderboardsHelpers.countTotalGoalsFavor(awayMatches, true),
        goalsOwn: LeaderboardsHelpers.countTotalGoalsOwn(awayMatches, true),
        goalsBalance: LeaderboardsHelpers.countTotalGoalsBalance(awayMatches, true),
        efficiency: LeaderboardsHelpers.getEfficiency(awayMatches, true),
      };
    });
    const teamsSorted = LeaderboardsHelpers.sortTeams(leaderboardsAway);

    return teamsSorted;
  }
}
export default LeaderBoardAwayService;
