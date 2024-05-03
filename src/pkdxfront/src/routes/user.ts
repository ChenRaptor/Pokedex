import { fetchApi } from "."

const prefix = "users"

interface User {
  token: string,
  user: {
    login: string,
    isAdmin: boolean
  }
}
interface AuthRequest {
  login: string,
  password: string
}

async function registerUser(authentication: AuthRequest) : Promise<User | {error: string}> {
  return await fetchApi('POST',`${prefix}/register`, {body: authentication}) as unknown as User | {error: string}
}

async function loginUser(authentication: AuthRequest) : Promise<User | {error: string}> {
  return await fetchApi('POST',`${prefix}/login`, {body: authentication}) as unknown as User | {error: string}
}

export { registerUser, loginUser }