import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Settings/Sidebar';
import React, { FC } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const SettingsLayout: FC<TypeProps> = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-300">
      <Navbar />
      <div className="flex justify-center w-screen h-screen bg-gray-300">
        <div className="flex w-[95%] h-[92%] mt-6 bg-white">
          <Sidebar />
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
