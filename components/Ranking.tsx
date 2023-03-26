import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import Image from 'next/image';
import React from 'react';
import arrow from '../public/images/arrow.png';
import doubleArrow from '../public/images/doubleArrow.png';
import tripleArrow from '../public/images/tripleArrow.png';

export default function Ranking({ postId, category }: any) {
  const handleArrowClick = async (note: number) => {
    await UpdateRankingAxios(postId, category, note);
  };

  return (
    <div className="h-full min-w-[45px] flex flex-col justify-center items-center pr-1">
      <Image
        onClick={() => handleArrowClick(3)}
        src={tripleArrow}
        height={26}
        width={26}
        alt="tripleArrow"
        className="mb-2"
      />
      <Image
        onClick={() => handleArrowClick(2)}
        src={doubleArrow}
        height={26}
        width={26}
        alt="doubleArrow"
        className="mb-2"
      />
      <Image
        onClick={() => handleArrowClick(1)}
        src={arrow}
        height={26}
        width={26}
        alt="arrow"
        className="mb-2"
      />
      <Image
        onClick={() => handleArrowClick(-1)}
        src={arrow}
        height={26}
        width={26}
        alt="arrow"
        className="scale-y-[-1]"
      />
      <Image
        onClick={() => handleArrowClick(-2)}
        src={doubleArrow}
        height={26}
        width={26}
        alt="doubleArrow"
        className="scale-y-[-1] mt-2"
      />
      <Image
        onClick={() => handleArrowClick(-3)}
        src={tripleArrow}
        height={26}
        width={26}
        alt="tripleArrow"
        className="scale-y-[-1] mt-2"
      />
    </div>
  );
}
