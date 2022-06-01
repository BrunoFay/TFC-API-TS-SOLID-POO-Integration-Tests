export type LeaderBoardService = {
  getAll: () => Promise<any>
};
export type LeaderBoardModel = {
  findAll: (op:any) => Promise<any>
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
