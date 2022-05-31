export type LoginService = {
  singIn: (email: string, password: string) => Promise<void>;
}

export type LoginInfos = {
  where: {
    email: string,
    password?: string
  }
}
export type LoginModel = {
  findOne: (options: LoginInfos) => Promise<any>

}