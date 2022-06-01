import { MatchesModel } from '../types/matches';
import Teams from '../database/models/Teams';

class MatchesService {
  matchesModel: MatchesModel;
  constructor(matchesModel: MatchesModel) {
    this.matchesModel = matchesModel;
  }

  async getAll() {
    return this.matchesModel
      .findAll({
        include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });
  }
}
export default MatchesService;
