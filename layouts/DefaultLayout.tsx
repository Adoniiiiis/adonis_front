import Navbar from '@/components/Navbar';
import React, { FC } from 'react';

type TypeProps = {
  children: JSX.Element;
};

const DefaultLayout: FC<TypeProps> = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
