'use server'

import { cookies } from 'next/headers'

async function setTokenInCookies(token: string) {
  cookies().set('token', token)
}

const deleteTokenInCookies = async () => {
  cookies().delete('token')
}

async function getTokenInCookies() {
  return cookies().get('token')
}

export { setTokenInCookies, deleteTokenInCookies, getTokenInCookies }