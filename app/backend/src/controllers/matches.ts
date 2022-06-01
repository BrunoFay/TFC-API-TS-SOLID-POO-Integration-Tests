import { RequestHandler } from 'express';
import { MatchesService } from '../types/matches';

class matchesController {
  matchesService:MatchesService;
  constructor(matchesService:MatchesService) {
    this.matchesService = matchesService;
  }
  getAll:RequestHandler = async (_req, res, next) => {
    try {
      const matches = await this.matchesService.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

export default matchesController;
