import { RequestHandler } from 'express';

const validateEmail: RequestHandler = (req, res, next) => {
  const { email } = req.body;
  const emailReg = /^[\w_.-]+@([\w-]+\.)+\w{2,4}$/;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!emailReg.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

const validatePassword: RequestHandler = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

const validations = [validateEmail, validatePassword];
export default validations;