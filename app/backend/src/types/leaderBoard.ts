import { Match } from './matches';

export type LeaderBoardService = {
  getAll: () => Promise<LeaderBoard[]>
};
export type LeaderBoardModel = {
  findAll: (op:any) => Promise<Match[]>
};
export type LeaderBoard = {
  name: string,
  totalPoints: number,
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number,
  goalsOwn: number
  goalsBalance: number,
  efficiency: number
};
