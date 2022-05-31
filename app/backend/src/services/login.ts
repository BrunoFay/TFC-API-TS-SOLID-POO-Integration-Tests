import * as bcrypt from 'bcryptjs';
import { LoginModel, LoginInfos } from "../types/login"
import { createToken,validadeToken } from './token';

class LoginService {
  LoginModel: LoginModel
  constructor(loginModel: LoginModel) {
    this.LoginModel = loginModel
  }
  async singIn(email: string, password: string) {
    const loginInfos: LoginInfos = { email }
    const userResult = await this.LoginModel.findOne({ where: { email } })
    if (!userResult) return { errorStatus: 401, message: "Incorrect email or password" }
    const validatePassword = await bcrypt.compare(password, userResult?.password)
    if (!validatePassword) return { errorStatus: 401, message: "Incorrect email or password" }
    const token = this.createToken(loginInfos)
    return { user: { ...userResult }, token }
  }
  createToken(data: LoginInfos) {
    return createToken(data)
  }
  validateToken(token: string) {
    return validadeToken(token)
  }


}
export default LoginService