import { LoginModel } from "../types/login"

class LoginService {
  LoginModel: LoginModel
  constructor(loginModel: LoginModel) {
    this.LoginModel = loginModel
  }
  async singIn(email: string, password: string) {
    return await this.LoginModel.findOne({ where: { email, password } })
  }
  
}
export default LoginService