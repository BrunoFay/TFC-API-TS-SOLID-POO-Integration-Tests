export type MatchesService = {
  getAll: () => Promise<Match[]>;
  getAllInProgress: (status: string) => Promise<Match[]>;
  create: (match: newMatch) => Promise<Match>
  updateProgress: (id: number) => Promise<void>
  updateGoals: (id: number, goalsToUpdate: RequestGoalsToUpdate) => Promise<void>

};
export type MatchesModel = {
  findAll: (op: any) => Promise<Match[]>;
  create: (match: newMatch) => Promise<Match>
  update: (status: any, id: any) => Promise<any>

};

export type RequestGoalsToUpdate = {
  homeTeamGoals: number
  awayTeamGoals: number
};

export type Match = {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
};
export type newMatch = Omit<Match, 'id'>;
