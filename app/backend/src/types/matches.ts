export type MatchesService = {
getAll:()=>Promise<Match[]>;

};
export type MatchesModel = {
  findAll:(op:any)=>Promise<Match[]>;
};

export type Match = {
    id:number;
    homeTeam:number;
    awayTeam:number;
    homeScore:number;
    awayScore:number;
    inProgress:boolean;
}