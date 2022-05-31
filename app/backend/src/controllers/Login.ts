import { RequestHandler } from 'express';
import { LoginService } from '../types/login';

class LoginController {
  loginService: LoginService;
  constructor(LoginService: LoginService) {
    this.loginService = LoginService;
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const isValidUser = await this.loginService.singIn(email, password);
      if (isValidUser.errorStatus) {
        res.status(isValidUser.errorStatus).json(isValidUser.message);
      }
      res.status(200).json(isValidUser);
    } catch (error) {
      next(error);
    }
  };

  loginValidate: RequestHandler = async (req, res, next) => {
    try {
      const token: string = req.headers.authorization!;
      const isValidToken = this.loginService.validateToken(token);
      if (!isValidToken) {
        res.status(400).json('Invalid token');
      }
      console.log(isValidToken);

      res.status(200).json(isValidToken);
    } catch (error) {
      next(error);
    }
  };
}
export default LoginController;
