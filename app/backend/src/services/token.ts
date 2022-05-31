import { LoginInfos } from "../types/login";
import * as fs from 'fs'
import * as JWT from 'jsonwebtoken'

const createToken = (data: LoginInfos) => {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf8')
  const token = JWT.sign(data, secret, { expiresIn: '1h' })
  return token
}
const validadeToken = (token: string) => {
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf8')
  return JWT.verify(token, secret)
}
export { createToken, validadeToken }