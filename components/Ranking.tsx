import Image from 'next/image';
import React, { useState } from 'react';
import arrowImage from '../public/images/arrow.png';
import doubleArrowImage from '../public/images/doubleArrow.png';
import tripleArrowImage from '../public/images/tripleArrow.png';
import arrowActiveImage from '../public/images/arrowActive.png';
import doubleArrowActiveImage from '../public/images/doubleArrowActive.png';
import tripleArrowActiveImage from '../public/images/tripleArrowActive.png';

export default function Ranking({ handleArrowClick, originalValue }: any) {
  const [currentlyActive, setCurrentlyActive] = useState<string>('');

  function handleClickOnUnactive(e: any, arrowValue: number) {
    const clientSideNewValue = originalValue + arrowValue;
    const serverSideNewValue =
      getCanceledPreviousValue(arrowValue) + arrowValue;
    handleArrowClick(clientSideNewValue, serverSideNewValue);
    setCurrentlyActive(e.target.id);
  }

  function handleClickOnActive(e: any, arrowValue: number) {
    const clientSideNewValue = originalValue;
    const serverSideNewValue = getCanceledPreviousValue(arrowValue);
    handleArrowClick(clientSideNewValue, serverSideNewValue);
    e.target.id === currentlyActive && setCurrentlyActive('');
  }

  function getCanceledPreviousValue(arrowValue: number) {
    if (arrowValue > 0) {
      return Math.abs(arrowValue);
    } else {
      return -Math.abs(arrowValue);
    }
  }

  const tripleArrow = {
    up: (
      <Image
        onClick={(e: any) => {
          const arrowValue = 3;
          currentlyActive === 'tripleArrowUp'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
          currentlyActive === 'tripleArrowDown'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
          currentlyActive === 'doubleArrowUp'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
          currentlyActive === 'doubleArrowDown'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
          const arrowValue = 2;
          currentlyActive === 'arrowUp'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
          const arrowValue = -2;
          currentlyActive === 'arrowDown'
            ? handleClickOnActive(e, arrowValue)
            : handleClickOnUnactive(e, arrowValue);
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
