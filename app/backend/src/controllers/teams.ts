import { RequestHandler } from 'express';
import { TeamsService } from '../types/teams';

class TeamsController {
  service: TeamsService;
  constructor(TService: TeamsService) {
    this.service = TService;
  }

  getAll: RequestHandler = async (_req, res, next) => {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const team = await this.service.getById(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
export default TeamsController;
