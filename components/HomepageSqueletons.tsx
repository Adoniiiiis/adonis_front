import { Skeleton } from '@mui/material';
import React from 'react';

export default function HomepageSqueletons() {
  // Displaying Squeletons while Data is Loading
  function getSqueletonDisplay() {
    let squeletonDisplay = [];
    for (let i = 0; i < 5; i++) {
      squeletonDisplay.push(
        <div key={i} className="mb-8 -mt-5">
          <Skeleton
            sx={{ bgcolor: 'gray' }}
            variant="rectangular"
            width={800}
            height={200}
            className="rounded-lg"
            animation="pulse"
          />
        </div>
      );
    }
    return squeletonDisplay;
  }
  return <>{getSqueletonDisplay()}</>;
}
