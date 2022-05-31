import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { LoginInfos, LoginModel } from '../types/login';
import { createToken, validadeToken } from './token';

class LoginService {
  loginModel: LoginModel;
  private token: string;
  private isTokenValid: string | JwtPayload;
  constructor(loginModel: LoginModel) {
    this.loginModel = loginModel;
  }

  async singIn(email: string, password: string) {
    const loginInfos: LoginInfos = { email };
    const userResult = await this.loginModel.findOne({ where: { email }, raw: true });

    if (!userResult) return { errorStatus: 401, message: 'Incorrect email or password' };
    const validatePassword = await bcrypt.compare(password, userResult?.password);
    if (!validatePassword) return { errorStatus: 401, message: 'Incorrect email or password' };
    this.createToken(loginInfos);
    return { user: { ...userResult }, token: this.token };
  }

  createToken(data: LoginInfos) {
    this.token = createToken(data);
  }

  validateToken(token: string) {
    this.isTokenValid = validadeToken(token);
    return this.isTokenValid;
  }
}
export default LoginService;
