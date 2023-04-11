import Navbar from '@/components/Navbar';
import React, { FC, useEffect } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const DefaultLayout: FC<TypeProps> = ({ children }) => {
  // Activating darkmode if already chosen before
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('theme') &&
        localStorage.getItem('theme') === 'dark' &&
        document.getElementsByTagName('html')[0].classList.add('dark');
    }
  }, []);

  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <div className="w-full bg-zinc-300 dark:bg-gray-900">{children}</div>
    </div>
  );
};

export default DefaultLayout;
