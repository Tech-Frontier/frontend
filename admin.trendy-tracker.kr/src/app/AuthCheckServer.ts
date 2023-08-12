import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { request } from '@/utils/request/common';

export async function AuthCheckServer() {
  const pathname = headers().get('x-invoke-path');

  if (pathname !== '/login') {
    try {
      await request({ pathname: '/auth/health' });
    } catch {
      redirect('/login');
    }
  }

  return null;
}
