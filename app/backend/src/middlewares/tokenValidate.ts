import { RequestHandler } from 'express';
import { validadeToken } from '../helpers/token';
import { getUsers } from '../helpers/middlewareHelpers';

export default class TokenValidates {
  tokenValidate: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json('Invalid token');
      }
      const isValidToken = validadeToken(authorization);
      const { email } = isValidToken as { email: string };
      const isUser = await getUsers(email);
      if (!isUser) return res.status(401).json({ message: 'Invalid token' });
      next();
    } catch (error) {
      next(error);
    }
  };
}
