import { TeamsModel } from '../types/teams';

class TeamsService {
  teamsModel: TeamsModel;
  constructor(teamsModel: TeamsModel) {
    this.teamsModel = teamsModel;
  }

  async getAll() {
    return this.teamsModel.findAll();
  }

  async getById(id: number) {
    return this.teamsModel.findOne({ where: { id } });
  }
}
export default TeamsService;
