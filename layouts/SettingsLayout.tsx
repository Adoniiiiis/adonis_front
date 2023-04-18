import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Settings/Sidebar';
import useDark from '@/hooks/useDark';
import React, { FC } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const SettingsLayout: FC<TypeProps> = ({ children }) => {
  // Activating darkmode if already chosen before
  useDark();

  return (
    <div className="flex flex-row h-full dark:bg-gray-900">
      <Navbar />
      <div className="flex justify-center md:py-4 w-full h-full bg-gray-300 dark:bg-gray-900">
        <div
          className="flex max-w-[1000px] max-h-[800px] w-[95vw] md:w-[90vw] h-[95vh] rounded-md bg-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white
        "
        >
          <div className="flex flex-col w-full settings_md:flex-row settings_md:items-start">
            <div className="mb-4 h-fit">
              <Sidebar />
            </div>
            <div className="p-4 flex justify-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
