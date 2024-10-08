'use server';

import { LoginData } from '@/app/login/page';
import { RegisterData } from '@/app/register/page';
import { Session } from '@/app/types';
import { JWT_EXPIRATION_TIME, SESSION_EXPIRATION_TIME } from '@/constants';
import apiClient from '@/services/apiClient';
import { AxiosError } from 'axios';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.NEXT_PUBLIC_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });
  return payload;
}

export async function login(formData: LoginData) {
  let user = {
    email: formData.email,
    password: formData.password
  };

  try {
    const res = await apiClient.post('/auth', user);
    // @ts-ignore
    const payload = res.data;

    // TODO: get token from either body or cookie
    payload.token = res.headers['x-auth-token'];

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ payload, expires });

    // Save the session in a cookie
    cookies().set('session', session, {
      sameSite: 'none',
      secure: true,
      expires
    });
    return {
      status: true,
      data: res.data
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        status: false,
        data: err.response?.data
      };
    }
  }
}

export async function signup(formData: RegisterData) {
  // Verify credentials && get the user
  let user = {
    username: formData.username,
    email: formData.email,
    password: formData.password
  };

  try {
    const res = await apiClient.post('/users', user);
    // @ts-ignore
    const payload = res.data;
    // TODO: get token from either body or cookie
    payload.token = res.headers['x-auth-token'];

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ payload, expires });
    // Save the session in a cookie
    cookies().set('session', session, { expires });
    return {
      status: true,
      data: res.data
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        status: false,
        data: err.response?.data
      };
    }
  }
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession(): Promise<Session | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  // TODO - valdiate if the cookie is legit
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + SESSION_EXPIRATION_TIME);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    expires: parsed.expires
  });
  return res;
}
