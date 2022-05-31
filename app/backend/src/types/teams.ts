export type TeamsService = {
  getAll: () => Promise<Teams[]>;
  getById: (id: number) => Promise<Teams | any>;

};
export type Teams = {
  id:number,
  teamName:string,
};

export type TeamsModel = {
  findAll: () => Promise<Teams[] | []>
  findOne: (options: object) => Promise<Teams | any>
};
