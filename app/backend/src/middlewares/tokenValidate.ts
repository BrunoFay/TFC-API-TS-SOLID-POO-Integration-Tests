import { RequestHandler } from 'express';
import { validadeToken } from '../services/token';
import { getUsers } from '../services/middlewareHelpers';

const tokenValidate: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json('Invalid token');
    }
    const isValidToken = validadeToken(authorization);
    const { email } = isValidToken as { email: string };
    const isUser = await getUsers(email);
    if (!isUser) return res.status(401).json('Invalid token');
    next();
  } catch (error) {
    next(error);
  }
};
export default tokenValidate;
