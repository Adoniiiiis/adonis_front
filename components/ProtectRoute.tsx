import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { NextResponse } from 'next/server';

export default function ProtectRoute({ children, router }: any) {
  const [cookies, setCookie] = useCookies(['tokens']);

  if (cookies['tokens']) {
    return children;
  } else {
    return NextResponse.redirect('/login');
  }
}
