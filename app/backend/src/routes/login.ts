import { Router } from "express";
import Users from "../database/models/Users";
import LoginService from "../services/login";
import LoginController from "../controllers/Login";
import LoginValidations from '../middlewares/Loginvalidate';

const LoginRouter = Router()
const Model = Users
const Service = new LoginService(Model)
const Controller = new LoginController(Service)

LoginRouter.get('/login', LoginValidations, Controller.login)

export default LoginRouter