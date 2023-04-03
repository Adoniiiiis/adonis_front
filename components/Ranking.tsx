import Image from 'next/image';
import React, { useState } from 'react';
import arrowImage from '../public/images/arrow.png';
import doubleArrowImage from '../public/images/doubleArrow.png';
import tripleArrowImage from '../public/images/tripleArrow.png';
import arrowActiveImage from '../public/images/arrowActive.png';
import doubleArrowActiveImage from '../public/images/doubleArrowActive.png';
import tripleArrowActiveImage from '../public/images/tripleArrowActive.png';

export default function Ranking({
  handleArrowClick,
  originalValue,
  isUpdating,
}: any) {
  const [currentlyActive, setCurrentlyActive] = useState<string>('');

  // Clicking on an unactive arrow
  function handleClickOnUnactive(e: any, arrowValue: number) {
    const clientSideNewValue = originalValue + arrowValue;
    handleArrowClick(clientSideNewValue, arrowValue);
    setCurrentlyActive(e.target.id);
  }

  // Clicking on an active arrow
  function handleClickOnActive(e: any) {
    handleArrowClick(originalValue, 0);
    e.target.id === currentlyActive && setCurrentlyActive('');
  }

  const tripleArrow = {
    up: (
      <Image
        onClick={(e: any) => {
          const arrowValue = 3;
          if (!isUpdating) {
            currentlyActive === 'tripleArrowUp'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="tripleArrowUp"
        src={
          currentlyActive === 'tripleArrowUp'
            ? tripleArrowActiveImage
            : tripleArrowImage
        }
        height={26}
        width={26}
        alt="tripleArrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={(e: any) => {
          const arrowValue = -3;
          if (!isUpdating) {
            currentlyActive === 'tripleArrowDown'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="tripleArrowDown"
        src={
          currentlyActive === 'tripleArrowDown'
            ? tripleArrowActiveImage
            : tripleArrowImage
        }
        height={26}
        width={26}
        alt="tripleArrowDown"
        className="scale-y-[-1] cursor-pointer mt-1"
      />
    ),
  };

  const doubleArrow = {
    up: (
      <Image
        onClick={(e: any) => {
          const arrowValue = 2;
          if (!isUpdating) {
            currentlyActive === 'doubleArrowUp'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="doubleArrowUp"
        src={
          currentlyActive === 'doubleArrowUp'
            ? doubleArrowActiveImage
            : doubleArrowImage
        }
        height={26}
        width={26}
        alt="doubleArrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={(e: any) => {
          const arrowValue = -2;
          if (!isUpdating) {
            currentlyActive === 'doubleArrowDown'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="doubleArrowDown"
        src={
          currentlyActive === 'doubleArrowDown'
            ? doubleArrowActiveImage
            : doubleArrowImage
        }
        height={26}
        width={26}
        alt="doubleArrowDown"
        className="scale-y-[-1] cursor-pointer mt-1"
      />
    ),
  };

  const arrow = {
    up: (
      <Image
        onClick={(e: any) => {
          const arrowValue = 1;
          if (!isUpdating) {
            currentlyActive === 'arrowUp'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="arrowUp"
        src={currentlyActive === 'arrowUp' ? arrowActiveImage : arrowImage}
        height={26}
        width={26}
        alt="arrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={(e: any) => {
          const arrowValue = -1;
          if (!isUpdating) {
            currentlyActive === 'arrowDown'
              ? handleClickOnActive(e)
              : handleClickOnUnactive(e, arrowValue);
          }
        }}
        id="arrowDown"
        src={currentlyActive === 'arrowDown' ? arrowActiveImage : arrowImage}
        height={26}
        width={26}
        alt="arrowDown"
        className="scale-y-[-1] cursor-pointer mt-1"
      />
    ),
  };

  const arrowsDisplay = (
    <div>
      {tripleArrow.up}
      {doubleArrow.up}
      {arrow.up}
      {arrow.down}
      {doubleArrow.down}
      {tripleArrow.down}
    </div>
  );

  return (
    <div className="h-full min-w-[45px] flex flex-col justify-center items-center pr-1">
      {arrowsDisplay}
    </div>
  );
}
