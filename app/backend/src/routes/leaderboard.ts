import { Router } from 'express';
import Matches from '../database/models/Matches';
import LeaderBoardController from '../controllers/leaderboards/leaderboard';
import LeaderBoardHomeService from '../services/leaderboards/leaderboardHome';
import LeaderBoardAwayService from '../services/leaderboards/leaderboardAway';
import LeaderBoardGeralService from '../services/leaderboards/leaderboardGeral';
import { LeaderBoardModel } from '../types/leaderBoard';

const leaderBoardRouter = Router();
const Model = Matches as LeaderBoardModel;
const ServiceHome = new LeaderBoardHomeService(Model);
const ServiceAway = new LeaderBoardAwayService(Model);
const ServiceGeral = new LeaderBoardGeralService(Model);
const ControllerHome = new LeaderBoardController(ServiceHome);
const ControllerAway = new LeaderBoardController(ServiceAway);
const ControllerGeral = new LeaderBoardController(ServiceGeral);
leaderBoardRouter.get('/leaderboard', ControllerGeral.getAll);
leaderBoardRouter.get('/leaderboard/home', ControllerHome.getAll);
leaderBoardRouter.get('/leaderboard/away', ControllerAway.getAll);

export default leaderBoardRouter;
