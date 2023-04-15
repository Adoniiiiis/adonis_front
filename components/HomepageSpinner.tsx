import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function HomepageSpinner() {
  return (
    <div className="flex justify-center mb-7 mt-2">
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="35"
        visible={true}
      />
    </div>
  );
}
