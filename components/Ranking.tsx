import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
  const [previousArrowValue, setPreviousArrowValue] = useState<number>(0);

  console.log(isUpdating);

  // Clicking on an unactive arrow
  function handleClickOnUnactive(e: any, arrowValue: number) {
    const clientSideNewValue = originalValue + arrowValue;
    // If an arrow was already active
    if (currentlyActive != '') {
      const serverSideNewValue = oppositeOf(previousArrowValue) + arrowValue;
      handleArrowClick(clientSideNewValue, serverSideNewValue);
      // If no arrow was already active
    } else {
      const serverSideNewValue = arrowValue;
      handleArrowClick(clientSideNewValue, serverSideNewValue);
    }
    setCurrentlyActive(e.target.id);
  }

  // Clicking on an active arrow
  function handleClickOnActive(e: any, arrowValue: number) {
    handleArrowClick(originalValue, oppositeOf(arrowValue));
    e.target.id === currentlyActive && setCurrentlyActive('');
  }

  // Getting the value to cancel previous ranking update
  function oppositeOf(arrowValue: number) {
    if (arrowValue > 0) {
      return -Math.abs(arrowValue);
    } else {
      return Math.abs(arrowValue);
    }
  }

  const tripleArrow = {
    up: (
      <Image
        onClick={(e: any) => {
          const arrowValue = 3;
          if (!isUpdating) {
            setPreviousArrowValue(3);
            currentlyActive === 'tripleArrowUp'
              ? handleClickOnActive(e, arrowValue)
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
            setPreviousArrowValue(-3);
            currentlyActive === 'tripleArrowDown'
              ? handleClickOnActive(e, arrowValue)
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
            setPreviousArrowValue(2);
            currentlyActive === 'doubleArrowUp'
              ? handleClickOnActive(e, arrowValue)
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
            setPreviousArrowValue(-2);
            currentlyActive === 'doubleArrowDown'
              ? handleClickOnActive(e, arrowValue)
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
            setPreviousArrowValue(1);
            currentlyActive === 'arrowUp'
              ? handleClickOnActive(e, arrowValue)
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
            setPreviousArrowValue(-1);
            currentlyActive === 'arrowDown'
              ? handleClickOnActive(e, arrowValue)
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
