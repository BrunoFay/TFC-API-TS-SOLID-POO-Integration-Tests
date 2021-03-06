import { RequestHandler } from 'express';
import { MatchesService } from '../types/matches';

class matchesController {
  private matchesService: MatchesService;
  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;

      if (inProgress === 'true' || inProgress === 'false') {
        const matchesInProgress = await this.matchesService.getAllInProgress(inProgress);
        return res.status(200).json(matchesInProgress);
      }
      const matches = await this.matchesService.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (req, res, next) => {
    try {
      const newMatch = await this.matchesService.create(req.body);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };

  updateProgress: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.matchesService.updateProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateGoals: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.matchesService.updateGoals(Number(id), req.body);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default matchesController;
