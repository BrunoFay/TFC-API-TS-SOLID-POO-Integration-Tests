import { MatchesModel } from '../types/matches';
import Teams from '../database/models/Teams'

class MatchesService {
  matchesModel: MatchesModel;
  constructor(MatchesModel: MatchesModel) {
    this.matchesModel = MatchesModel;
  }
  async getAll() {
    return await this.matchesModel
      .findAll({ include: [{ model: Teams, as: 'teamHome' }, { model: Teams, as: 'teamAway' }] })

  }
}
export default MatchesService;
