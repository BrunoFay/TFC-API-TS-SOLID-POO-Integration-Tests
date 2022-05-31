import { MatchesService } from '../types/matches';

class matchesController {
  matchesService:MatchesService;
  constructor(matchesService:MatchesService) {
    this.matchesService = matchesService;
  }
}

export default matchesController;
