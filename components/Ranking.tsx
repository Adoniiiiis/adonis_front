import Image from 'next/image';
import React, { useState } from 'react';
import arrowImage from '../public/images/arrow.png';
import doubleArrowImage from '../public/images/doubleArrow.png';
import tripleArrowImage from '../public/images/tripleArrow.png';
import arrowActiveImage from '../public/images/arrowActive.png';
import doubleArrowActiveImage from '../public/images/doubleArrowActive.png';
import tripleArrowActiveImage from '../public/images/tripleArrowActive.png';
import { rankingType } from '@/Types/RankingType';

export default function Ranking({
  handleArrowClick,
  originalValue,
  isUpdating,
  userRating,
}: rankingType) {
  const [currentlyActive, setCurrentlyActive] = useState<number | null>(
    userRating
  );

  // Clicking on an unactive arrow
  function handleClickOnUnactive(arrowValue: number) {
    const clientSideNewValue = originalValue + arrowValue;
    handleArrowClick(clientSideNewValue, arrowValue);
    setCurrentlyActive(arrowValue);
  }

  // Clicking on an active arrow
  function handleClickOnActive() {
    handleArrowClick(originalValue, 0);
    setCurrentlyActive(null);
  }

  const tripleArrow = {
    up: (
      <Image
        onClick={() => {
          const arrowValue = 3;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === 3 ? tripleArrowActiveImage : tripleArrowImage}
        height={26}
        width={26}
        alt="tripleArrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={() => {
          const arrowValue = -3;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === -3 ? tripleArrowActiveImage : tripleArrowImage}
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
        onClick={() => {
          const arrowValue = 2;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === 2 ? doubleArrowActiveImage : doubleArrowImage}
        height={26}
        width={26}
        alt="doubleArrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={() => {
          const arrowValue = -2;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === -2 ? doubleArrowActiveImage : doubleArrowImage}
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
        onClick={() => {
          const arrowValue = 1;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === 1 ? arrowActiveImage : arrowImage}
        height={26}
        width={26}
        alt="arrowUp"
        className="mb-2 cursor-pointer"
      />
    ),
    down: (
      <Image
        onClick={() => {
          const arrowValue = -1;
          if (!isUpdating) {
            currentlyActive === arrowValue
              ? handleClickOnActive()
              : handleClickOnUnactive(arrowValue);
          }
        }}
        src={currentlyActive === -1 ? arrowActiveImage : arrowImage}
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
