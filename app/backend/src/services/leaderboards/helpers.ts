import { Match } from '../../types/matches';

export default class LeaderboardsHelpers {
  static countTotalGames(matches: Match[]) {
    const totalGames = matches.length;
    return totalGames;
  }

  static countGamePoints(matches: Match[], awayTeam = false) {
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

  static countTotalGoalsFavor(matches: Match[], awayTeam = false) {
    if (awayTeam) {
      const totalGoalsFavor = matches
        .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
      return totalGoalsFavor;
    }
    const totalGoalsFavor = matches
      .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);

    return totalGoalsFavor;
  }

  static countTotalGoalsOwn(matches: Match[], awayTeam = false) {
    if (awayTeam) {
      const totalGoalsFavor = matches
        .reduce((acc: number, curr: any) => acc + curr.homeTeamGoals, 0);
      return totalGoalsFavor;
    }
    const totalGoalsFavor = matches
      .reduce((acc: number, curr: any) => acc + curr.awayTeamGoals, 0);
    return totalGoalsFavor;
  }

  static countTotalGoalsBalance(matches: Match[], awayTeam = false) {
    let homeGoals; let awayGoals; let
      balanceGoals;
    if (awayTeam) {
      homeGoals = this.countTotalGoalsFavor(matches, awayTeam);
      awayGoals = this.countTotalGoalsOwn(matches, awayTeam);
      balanceGoals = homeGoals - awayGoals;
      return balanceGoals;
    }
    homeGoals = this.countTotalGoalsFavor(matches);
    awayGoals = this.countTotalGoalsOwn(matches);
    balanceGoals = homeGoals - awayGoals;
    return balanceGoals;
  }

  static countVictories(matches: Match[], awayTeam = false) {
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

  static countLoses(matches: Match[], awayTeam = false) {
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

  static countDraws(matches: Match[]) {
    const totalDraws = matches
      .reduce((
        acc: number,
        curr: any,
      ) => ((curr.homeTeamGoals === curr.awayTeamGoals) ? acc + 1 : acc), 0);

    return totalDraws;
  }

  static getEfficiency(matches: Match[], awayTeam = false) {
    let totalPoints; let totalGames; let
      efficiency;
    if (awayTeam) {
      totalPoints = this.countGamePoints(matches, awayTeam);
      totalGames = this.countTotalGames(matches);
      efficiency = (totalPoints / (totalGames * 3)) * 100;
      return Number(efficiency.toFixed(2));
    }
    totalPoints = this.countGamePoints(matches);
    totalGames = this.countTotalGames(matches);
    efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  static sortTeams(teams: any) {
    const teamsSorted = teams
      .filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.name === v.name)) === i);
    return teamsSorted.sort((a: any, b: any) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
  }
}
