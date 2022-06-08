import { LeaderBoard } from '../../types/leaderBoard';

export default class LeaderboardsHelpers {
  static async countTotalGames(matches: LeaderBoard[]) {
    const totalGames = matches.length;
    return totalGames;
  }

  static async countGamePoints(matches: LeaderBoard[], awayTeam = false) {
    let countPoints;
    if (awayTeam) {
      countPoints = matches.reduce((acc: number, curr: any) => {
        if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
        if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
      return countPoints;
    }
    countPoints = matches.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return countPoints;
  }

  static async countTotalGoalsFavor(matches: LeaderBoard[], awayTeam = false) {
    if (awayTeam) {
      const totalGoalsFavor = matches
        .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
      return totalGoalsFavor;
    }
    const totalGoalsFavor = matches
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);

    return totalGoalsFavor;
  }

  static async countTotalGoalsOwn(matches: LeaderBoard[], awayTeam = false) {
    if (awayTeam) {
      const totalGoalsFavor = matches
        .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);
      return totalGoalsFavor;
    }
    const totalGoalsFavor = matches
      .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  static async countTotalGoalsBalance(matches: LeaderBoard[], awayTeam = false) {
    let homeGoals; let awayGoals; let
      balanceGoals;
    if (awayTeam) {
      homeGoals = await this.countTotalGoalsFavor(matches, awayTeam);
      awayGoals = await this.countTotalGoalsOwn(matches, awayTeam);
      balanceGoals = homeGoals - awayGoals;
      return balanceGoals;
    }
    homeGoals = await this.countTotalGoalsFavor(matches);
    awayGoals = await this.countTotalGoalsOwn(matches);
    balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  static async countVictories(matches: LeaderBoard[], awayTeam = false) {
    let totalVictories;
    if (awayTeam) {
      totalVictories = matches
        .reduce((
          acc: number,
          curr: any,
        ) => ((curr.homeTeamGoals < curr.awayTeamGoals) ? acc + 1 : acc), 0);
      return totalVictories;
    }
    totalVictories = matches
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals > curr.awayTeamGoals) ? acc + 1 : acc), 0);
    return totalVictories;
  }

  static async countLoses(matches: LeaderBoard[], awayTeam = false) {
    let totalLoses;
    if (awayTeam) {
      totalLoses = matches
        .reduce((
          acc: number,
          curr: any,
        ) => ((curr.awayTeamGoals < curr.homeTeamGoals) ? acc + 1 : acc), 0);
      return totalLoses;
    }
    totalLoses = matches
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.awayTeamGoals > curr.homeTeamGoals) ? acc + 1 : acc), 0);
    return totalLoses;
  }

  static async countDraws(matches: LeaderBoard[]) {
    const totalDraws = matches
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0);

    return totalDraws;
  }

  static async getEfficiency(matches: LeaderBoard[]) {
    const totalPoints = await this.countGamePoints(matches);
    const totalGames = await this.countTotalGames(matches);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  static async sortTeams(teams: any) {
    const teamsSorted = await teams
      .filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i);
    return teamsSorted.sort((a: any, b: any) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
  }
}
