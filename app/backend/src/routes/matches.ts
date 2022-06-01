import { Router } from 'express';
import MatchesService from '../services/matches';
import Matches from '../database/models/Matches';
import MatchesController from '../controllers/matches';
import { MatchesModel } from '../types/matches';
import tokenValidate from '../middlewares/tokenValidate';
import matchesValidate from '../middlewares/matchesValidate';

const Model = Matches as MatchesModel;
const Service = new MatchesService(Model);
const Controller = new MatchesController(Service);
const matchsRouter = Router();
matchsRouter.get('/matches', Controller.getAll);
matchsRouter.patch('/matches/:id/finish', tokenValidate, Controller.updateProgress);
matchsRouter.patch('/matches/:id', tokenValidate, Controller.updateGols);
matchsRouter.post('/matches', tokenValidate, matchesValidate, Controller.create);

export default matchsRouter;
