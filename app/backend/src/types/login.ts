import { JwtPayload } from 'jsonwebtoken';
import { User } from './user';

export type LoginService = {
  singIn: (email: string, password: string) => Promise<LoginRequestResponse>;
  validateToken: (token: string) => string | JwtPayload;
  getUserByEmail: (email: string) => Promise<User>;
  getRole: (email: string) => Promise<string>;
};

export type LoginInfos = {
  email: string,
  password?: string
};

export type LoginModel = {
  findOne: (options: {
    where: { email: string },
    raw: boolean
  }) => Promise<User | undefined>
};

export type LoginRequestResponse = {
  user?: User,
  token?: string,
  errorStatus?: number,
  message?: string
};
