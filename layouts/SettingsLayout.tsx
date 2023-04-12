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
    <div className="flex flex-row h-screen dark:bg-gray-900">
      <Navbar />
      <div className="flex justify-center md:p-8 py-8 px-2 w-full h-full bg-gray-300 dark:bg-gray-900">
        <div
          className="flex max-w-[95%] max-h-full w-[900px] h-[600px] rounded-md bg-white dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white
        md:w-[700px]
        lg:w-[900px] lg:h-[700px]"
        >
          <div className="flex flex-wrap h-fit w-fit">
            <div className="mb-4">
              <Sidebar />
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
