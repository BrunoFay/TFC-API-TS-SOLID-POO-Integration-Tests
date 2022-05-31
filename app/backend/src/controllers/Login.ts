import { RequestHandler } from 'express';
import { LoginService } from '../types/login';

class LoginController {
  service: LoginService;
  constructor(LService: LoginService) {
    this.service = LService;
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const isValidUser = await this.service.singIn(email, password);
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
      const isValidToken = this.service.validateToken(token);
      if (!isValidToken) {
        res.status(400).json('Invalid token');
      }
      const { email } = isValidToken as { email: string };
      console.log(email);
      const userRole = await this.service.getRole(email);

      res.status(200).json(userRole);
    } catch (error) {
      next(error);
    }
  };
}
export default LoginController;
