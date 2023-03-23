import Navbar from '@/components/Navbar';
import React, { FC } from 'react'

type TypeProps = {
  children: JSX.Element
}

const DefaultLayout: FC<TypeProps> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <Navbar />
    </>
  );
}

export default DefaultLayout;