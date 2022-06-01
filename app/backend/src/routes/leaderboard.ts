import { Router } from 'express';
import Matches from '../database/models/Matches';
import LeaderBoardController from '../controllers/leaderboard';
import LeaderBoardService from '../services/leaderboard';
import { LeaderBoardModel } from '../types/leaderBoard';
import Teams from '../database/models/Teams';

const leaderBoardRouter = Router();
const Model1 = Teams as { findAll: () => Promise<any> };
const Model2 = Matches as LeaderBoardModel;
const Service = new LeaderBoardService(Model1, Model2);
const Controller = new LeaderBoardController(Service);
leaderBoardRouter.get('/leaderboard/home', Controller.getAll);

export default leaderBoardRouter;
