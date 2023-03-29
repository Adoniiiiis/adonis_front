import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import arrow from '../public/images/arrow.png';
import doubleArrow from '../public/images/doubleArrow.png';
import tripleArrow from '../public/images/tripleArrow.png';
import arrowActive from '../public/images/arrowActive.png';
import doubleArrowActive from '../public/images/doubleArrowActive.png';
import tripleArrowActive from '../public/images/tripleArrowActive.png';

export default function Ranking({ handleArrowClick, originalRanking }: any) {
  const [currentlyActive, setCurrentlyActive] = useState<string>('');

  const tripleArrowDisplay = {
    up: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking + 3);
          }}
          id="tripleArrowUp"
          src={tripleArrow}
          height={26}
          width={26}
          alt="tripleArrow"
          className="mb-2 cursor-pointer"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="tripleArrowUp"
          src={tripleArrowActive}
          height={26}
          width={26}
          alt="tripleArrow"
          className="mb-2 cursor-pointer"
        />
      ),
    },
    down: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking - 3);
          }}
          id="tripleArrowDown"
          src={tripleArrow}
          height={26}
          width={26}
          alt="tripleArrow"
          className="scale-y-[-1] cursor-pointer"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="tripleArrowDown"
          src={tripleArrowActive}
          height={26}
          width={26}
          alt="tripleArrow"
          className="scale-y-[-1] cursor-pointer"
        />
      ),
    },
  };

  const doubleArrowDisplay = {
    up: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking + 2);
          }}
          id="doubleArrowUp"
          src={doubleArrow}
          height={26}
          width={26}
          alt="doubleArrow"
          className="mb-2 cursor-pointer"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="doubleArrowUp"
          src={doubleArrowActive}
          height={26}
          width={26}
          alt="doubleArrow"
          className="mb-2 cursor-pointer"
        />
      ),
    },
    down: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking - 2);
          }}
          id="doubleArrowDown"
          src={doubleArrow}
          height={26}
          width={26}
          alt="doubleArrow"
          className="scale-y-[-1] cursor-pointer mt-2"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="doubleArrowDown"
          src={doubleArrowActive}
          height={26}
          width={26}
          alt="tripleArrow"
          className="scale-y-[-1] cursor-pointer mt-2"
        />
      ),
    },
  };

  const arrowDisplay = {
    up: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking + 1);
          }}
          id="arrowUp"
          src={arrow}
          height={26}
          width={26}
          alt="arrow"
          className="mb-2 cursor-pointer"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="arrowUp"
          src={arrowActive}
          height={26}
          width={26}
          alt="arrow"
          className="mb-2 cursor-pointer"
        />
      ),
    },
    down: {
      default: (
        <Image
          onClick={(e: any) => {
            setCurrentlyActive(e.target.id);
            handleArrowClick(originalRanking - 1);
          }}
          id="arrowDown"
          src={arrow}
          height={26}
          width={26}
          alt="arrow"
          className="scale-y-[-1] cursor-pointer mt-2"
        />
      ),
      active: (
        <Image
          onClick={(e: any) => {
            handleArrowClick(originalRanking);
            e.target.id === currentlyActive && setCurrentlyActive('');
          }}
          id="arrowDown"
          src={arrowActive}
          height={26}
          width={26}
          alt="arrow"
          className="scale-y-[-1] cursor-pointer mt-2"
        />
      ),
    },
  };

  return (
    <div className="h-full min-w-[45px] flex flex-col justify-center items-center pr-1">
      {currentlyActive === 'tripleArrowUp'
        ? tripleArrowDisplay.up.active
        : tripleArrowDisplay.up.default}
      {currentlyActive === 'doubleArrowUp'
        ? doubleArrowDisplay.up.active
        : doubleArrowDisplay.up.default}
      {currentlyActive === 'arrowUp'
        ? arrowDisplay.up.active
        : arrowDisplay.up.default}

      {currentlyActive === 'arrowDown'
        ? arrowDisplay.down.active
        : arrowDisplay.down.default}
      {currentlyActive === 'doubleArrowDown'
        ? doubleArrowDisplay.down.active
        : doubleArrowDisplay.down.default}
      {currentlyActive === 'tripleArrowDown'
        ? tripleArrowDisplay.down.active
        : tripleArrowDisplay.down.default}
    </div>
  );
}
