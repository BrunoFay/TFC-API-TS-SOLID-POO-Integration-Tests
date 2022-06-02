import { Router } from 'express';
import Matches from '../database/models/Matches';
import LeaderBoardController from '../controllers/leaderboard';
import LeaderBoardService from '../services/leaderboard';
import { LeaderBoardModel } from '../types/leaderBoard';

const leaderBoardRouter = Router();
const Model = Matches as LeaderBoardModel;
const Service = new LeaderBoardService(Model);
const Controller = new LeaderBoardController(Service);
leaderBoardRouter.get('/leaderboard/home', Controller.getAll);

export default leaderBoardRouter;
