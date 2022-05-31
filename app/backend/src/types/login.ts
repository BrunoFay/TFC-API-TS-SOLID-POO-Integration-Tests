import { JwtPayload } from "jsonwebtoken";
import { User } from "./user";

export type LoginService = {
  singIn: (email: string, password: string) => Promise<LoginRequestResponse>;
  validateToken:( token: string) => string|JwtPayload;
}

export type LoginInfos = {
  email: string,
  password?: string
}
export type SequelizeOptionsById = {
  where: {
    email: string,
    password?: string
  }
}
export type LoginModel = {
  findOne: (options: SequelizeOptionsById) => Promise<User>

}


export type LoginRequestResponse = {
  user?: User,
  token?: string,
  errorStatus?: number,
  message?: string
}
