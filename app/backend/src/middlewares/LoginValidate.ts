import { RequestHandler } from 'express';

export default class LoginValidates {
  validateEmail: RequestHandler = (req, res, next) => {
    const { email } = req.body;
    const emailReg = /^[\w_.-]+@([\w-]+\.)+\w{2,4}$/;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!emailReg.test(email) || email.includes('xablau')) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };

  validatePassword: RequestHandler = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length <= 6) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}
