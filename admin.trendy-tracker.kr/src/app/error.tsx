'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset: _,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter();
  useEffect(() => {
    if (error.message.includes('Forbidden')) {
      router.push('/login');
    }
  }, [error, router]);

  return (
    <>
      <br/>
      오류가 발생했습니다.
      <br/>
      <code>
      {error.message}
      </code>
    </>
  );
}
