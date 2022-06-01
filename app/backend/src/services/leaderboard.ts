import { LeaderBoardModel } from '../types/leaderBoard';
import TeamsM from '../database/models/Teams';

class LeaderBoardService {
  teamModel: { findAll: () => Promise<any> };
  matchModel: { findAll: (op: any) => Promise<any> };

  constructor(TeamModel: { findAll: () => Promise<any> }, matchModel: LeaderBoardModel) {
    this.teamModel = TeamModel;
    this.matchModel = matchModel;
  }

  async getHomeMatches(teamId: any) {
    const homeMatches = await this.matchModel.findAll({
      where: { homeTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
    });
    return homeMatches;
  }

  async getAwayMatches(teamId: any) {
    const awayMatches = await this.matchModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
      include: { model: TeamsM, as: 'teamAway', attributes: { exclude: ['id'] } },
    });
    return awayMatches;
  }

  async countTotalGames(teamId: any) {
    const home = await this.getHomeMatches(teamId);
    const away = await this.getAwayMatches(teamId);
    const totalGames = home.length + away.length;
    return totalGames;
  }

  async countTotalGoalsFavor(teamId: any) {
    const home = await this.getHomeMatches(teamId);
    const away = await this.getAwayMatches(teamId);
    const totalGoalsFavor = home
      .reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0)
      + away.reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  async getAll() {
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsM, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsM, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    const test = Promise.all(matches.map(async (team: any) => ({
      name: team.teamHome.teamName,
      totalGames: await this.countTotalGames(team.homeTeam),
      goalsFavor: await this.countTotalGoalsFavor(team.homeTeam),
    })));
    console.log(this.countTotalGames(5));

    return test;
  }
}
export default LeaderBoardService;
