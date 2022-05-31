import { Router } from 'express';
import Users from '../database/models/Users';
import LoginService from '../services/login';
import LoginController from '../controllers/Login';
import LoginValidations from '../middlewares/Loginvalidate';
import { LoginModel } from '../types/login';

const LoginRouter = Router();
const Model = Users as LoginModel;
const Service = new LoginService(Model);
const Controller = new LoginController(Service);

LoginRouter.post('/login', LoginValidations, Controller.login);
LoginRouter.get('/login/validate', LoginValidations, Controller.loginValidate);

export default LoginRouter;
