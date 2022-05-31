import { RequestHandler } from "express";
import { LoginService } from "../types/login";

class LoginController {
    LoginService: LoginService
    constructor(LoginService: LoginService) {
        this.LoginService = LoginService
    }
    public login: RequestHandler = (req, res, next) => {
        const { email, password } = req.body;
        this.LoginService.singIn(email, password)
        res.status(200).send("Login");
    };
}
export default LoginController