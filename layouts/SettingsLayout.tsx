import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Settings/Sidebar';
import React, { FC, useEffect } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const SettingsLayout: FC<TypeProps> = ({ children }) => {
  // Activating darkmode if already chosen before
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('theme') &&
        localStorage.getItem('theme') === 'dark' &&
        document.getElementsByTagName('html')[0].classList.add('dark');
    }
  }, []);
  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="flex justify-center w-screen h-screen bg-gray-300 dark:bg-gray-900">
        <div className="flex w-[95%] h-[92%] mt-6 rounded-md bg-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white">
          <Sidebar />
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
