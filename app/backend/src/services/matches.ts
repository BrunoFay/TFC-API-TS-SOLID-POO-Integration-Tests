import { MatchesModel } from '../types/matches';

class MatchesService {
  matchesModel: MatchesModel;
  constructor(MatchesModel:MatchesModel) {
    this.matchesModel = MatchesModel;
  }
}
export default MatchesService;
