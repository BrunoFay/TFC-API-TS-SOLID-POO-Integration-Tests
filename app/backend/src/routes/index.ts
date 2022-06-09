import { Router } from 'express';
import leaderboardRoutes from './leaderboard';
import loginRoutes from './login';
import matchesRoutes from './matches';
import teamsRoutes from './teams';

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/teams', teamsRoutes);
routes.use('/matches', matchesRoutes);
routes.use('/leaderboard', leaderboardRoutes);

export default routes;