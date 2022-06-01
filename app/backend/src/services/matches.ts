import { MatchesModel, newMatch, RequestGoalsToUpdate } from '../types/matches';
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

  async getAllInProgress(status: string) {
    const transformStatusToBoolean = (status === 'true');
    return this.matchesModel
      .findAll({
        where: { inProgress: transformStatusToBoolean },
        include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });
  }

  async create(match: newMatch) {
    return this.matchesModel.create(match);
  }

  async updateProgress(id: number) {
    this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async updateGoals(id: number, golsToUpdate: RequestGoalsToUpdate) {
    this.matchesModel.update(
      {
        homeTeamGoals: golsToUpdate.homeTeamGoals,
        awayTeamGoals: golsToUpdate.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}
export default MatchesService;
