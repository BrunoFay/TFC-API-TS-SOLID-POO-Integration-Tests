import { Router } from 'express';
import MatchesService from '../services/matches';
import Matches from '../database/models/Matches';
import MatchesController from '../controllers/matches';
import { MatchesModel } from '../types/matches';
import TokenValidate from '../middlewares/tokenValidate';
import MatchesValidate from '../middlewares/matchesValidate';

const Model = Matches as MatchesModel;
const Service = new MatchesService(Model);
const Controller = new MatchesController(Service);
const matchsRouter = Router();
const MiddlewareToken = new TokenValidate();
const MiddlewareMatches = new MatchesValidate();
matchsRouter.get('/matches', Controller.getAll);
matchsRouter.patch('/matches/:id/finish', MiddlewareToken.tokenValidate, Controller.updateProgress);
matchsRouter.patch('/matches/:id', MiddlewareToken.tokenValidate, Controller.updateGoals);
matchsRouter.post(
  '/matches',
  MiddlewareToken.tokenValidate,
  MiddlewareMatches.validateIfTeamsAreDifferents,
  MiddlewareMatches.validateIfTeamsExistsInDb,

  Controller.create,
);

export default matchsRouter;
