import { Router } from 'express';
import MatchesService from '../services/matches';
import Matches from '../database/models/Matches';
import MatchesController from '../controllers/matches';
import { MatchesModel } from '../types/matches';
import tokenValidate from '../middlewares/tokenValidate';

const Model = Matches as MatchesModel;
const Service = new MatchesService(Model);
const Controller = new MatchesController(Service);
const matchsRouter = Router();
matchsRouter.get('/matches', Controller.getAll);
matchsRouter.post('/matches', tokenValidate, Controller.create);

export default matchsRouter;
