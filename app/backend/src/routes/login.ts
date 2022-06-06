import { Router } from 'express';
import Users from '../database/models/Users';
import LoginService from '../services/login';
import LoginController from '../controllers/Login';
import LoginMiddleware from '../middlewares/LoginValidate';
import { LoginModel } from '../types/login';

const LoginRouter = Router();
const Model = Users as LoginModel;
const Service = new LoginService(Model);
const Controller = new LoginController(Service);
const Middleware = new LoginMiddleware();

LoginRouter.post(
  '/login',
  Middleware.validateEmail,
  Middleware.validatePassword,
  Controller.login,
);
LoginRouter.get('/login/validate', Controller.loginValidate);

export default LoginRouter;
