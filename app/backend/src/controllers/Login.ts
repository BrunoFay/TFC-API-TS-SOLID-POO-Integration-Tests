import { RequestHandler } from "express";
import { string } from "joi";
import { LoginService } from "../types/login";

class LoginController {
    LoginService: LoginService
    constructor(LoginService: LoginService) {
        this.LoginService = LoginService
    }
    login: RequestHandler = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const isValidUser = await this.LoginService.singIn(email, password)
            if (isValidUser.errorStatus) {
                res.status(isValidUser.errorStatus).json(isValidUser.message);
            };
            res.status(200).json(isValidUser);
        } catch (error) {
            next(error)
        }
    }
    loginValidate: RequestHandler = async (req, res, next) => {
        try {
            const token: string = req.headers.authorization!;
            const isValidToken = this.LoginService.validateToken(token)
            if (!isValidToken) {
                res.status(400).json("Invalid token");
            }
            console.log(isValidToken);

            res.status(200).json(isValidToken);
        }
        catch (error) {
            next(error)
        }
    }
}
export default LoginController