import { Router } from 'express';
import MatchesService from '../services/matches';
import Matches from '../database/models/Matches';
import MatchesController from '../controllers/matches';

const Model = Matches;
const Service = new MatchesService(Model);
const Controller = new MatchesController(Service);
const matchsRouter = Router();
matchsRouter.get('/');
