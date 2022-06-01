export type MatchesService = {
  getAll: () => Promise<Match[]>;
  getAllInProgress: (status: string) => Promise<Match[]>;
  create: (match: newMatch) => Promise<Match>
  updateProgress: (id: number) => Promise<any>

};
export type MatchesModel = {
  findAll: (op: any) => Promise<Match[]>;
  create: (match: newMatch) => Promise<Match>
  update: (status: any, id: any) => Promise<any>

};

export type Match = {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeScore: number;
  awayScore: number;
  inProgress: boolean;
};
export type newMatch = Omit<Match, 'id'>;
