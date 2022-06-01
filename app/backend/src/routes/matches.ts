import { Router } from 'express';
import MatchesService from '../services/matches';
import Matches from '../database/models/Matches';
import MatchesController from '../controllers/matches';
import { MatchesModel } from '../types/matches';

const Model = Matches as MatchesModel;
const Service = new MatchesService(Model);
const Controller = new MatchesController(Service);
const matchsRouter = Router();
matchsRouter.get('/matches', Controller.getAll);

export default matchsRouter