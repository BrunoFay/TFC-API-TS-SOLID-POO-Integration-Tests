import { RequestHandler } from "express";

class LoginController {
    public login: RequestHandler = (req, res, next) => {
        res.status(200).send("Login");
    };
}
export default LoginController