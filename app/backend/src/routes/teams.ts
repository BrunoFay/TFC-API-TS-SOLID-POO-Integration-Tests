import { Router } from 'express';
import Teams from '../database/models/Teams';
import { TeamsModel } from '../types/teams';
import TeamsService from '../services/teams';
import TeamsController from '../controllers/teams';

const TeamsRouter = Router();
const Model = Teams as TeamsModel;
const Service = new TeamsService(Model);
const Controller = new TeamsController(Service);

TeamsRouter.get('/teams', Controller.getAll);
TeamsRouter.get('/teams/:id', Controller.getById);

export default TeamsRouter;
