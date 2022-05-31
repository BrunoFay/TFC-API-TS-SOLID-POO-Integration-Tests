import { RequestHandler } from "express";
import { LoginService } from "../types/login";

class LoginController {
    LoginService: LoginService
    constructor(LoginService: LoginService) {
        this.LoginService = LoginService
    }
    login: RequestHandler = async (req, res, next) => {
        const { email, password } = req.body;
        const isValidUser= await this.LoginService.singIn(email, password)
        if (isValidUser.errorStatus) {
            res.status(isValidUser.errorStatus).json(isValidUser.message);
        };
        res.status(200).json(isValidUser);

    }
}
export default LoginController