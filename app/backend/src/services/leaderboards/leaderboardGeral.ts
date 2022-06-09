import { Match } from '../../types/matches';
import Teams from '../../database/models/Teams';
import { LeaderBoardModel } from '../../types/leaderBoard';
import LeaderboardsHelpers from '../../helpers/LeaderboardHelpers';

class LeaderBoardService {
  private matchModel: LeaderBoardModel;
  private helpers= new LeaderboardsHelpers()
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
      goalsBalance: LeaderboardsHelpers.countTotalGoalsBalance(team.homeTeam),
      efficiency: LeaderboardsHelpers.getEfficiency(team.homeTeam),
    }));
    const teamsSorted = LeaderboardsHelpers.sortTeams(leaderboardsHome);

    return teamsSorted;
  }
}
export default LeaderBoardService;
