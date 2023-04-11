import Navbar from '@/components/Navbar';
import useDark from '@/hooks/useDark';
import React, { FC } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const DefaultLayout: FC<TypeProps> = ({ children }) => {
  // Activating darkmode if already chosen before
  useDark();

  return (
    <div className="flex flex-row min-h-screen bg-zinc-300 dark:bg-gray-900">
      <Navbar />
      <div className="w-full bg-zinc-300 dark:bg-gray-900">{children}</div>
    </div>
  );
};

export default DefaultLayout;
