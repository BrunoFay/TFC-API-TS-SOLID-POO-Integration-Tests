import { Router } from "express";
import LoginController  from "../controllers/Login";
const LoginRouter = Router()
const Controller = new LoginController()
LoginRouter.get('/login',Controller.login)

export default LoginRouter