import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { NextResponse } from 'next/server';

export default function ProtectRoute({ children }: any) {
  const [cookies, setCookie] = useCookies(['tokens']);
  const router = useRouter();

  useEffect(() => {
    function checkIfAllowed() {
      if (!cookies['tokens']) {
        router.push('/login');
      } else {
      }
    }
    checkIfAllowed();
  }, []);

  return children;
}
