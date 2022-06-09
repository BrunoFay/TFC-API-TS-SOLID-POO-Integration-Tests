import { Router } from 'express';
import leaderboardRoutes from './leaderboard';
import loginRoutes from './login';
import matchesRoutes from './matches';
import teamsRoutes from './teams';

const routes = Router();

routes.use(loginRoutes);
routes.use(teamsRoutes);
routes.use(matchesRoutes);
routes.use(leaderboardRoutes);

export default routes;