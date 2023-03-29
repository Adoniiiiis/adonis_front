import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import Image from 'next/image';
import { useState } from 'react';
import Ranking from './Ranking';

export default function BookCard({ bookCoverUrl, bookData }: any) {
  const category = 'book';
  const { id, title, subtitle, author, ranking } = bookData;
  const [currentRanking, setCurrentRanking] = useState<number>(ranking);
  const originalValue = ranking;

  const handleArrowClick = async (
    clientSideNewValue: number,
    serverSideNewValue: number
  ) => {
    setCurrentRanking(clientSideNewValue);
    await UpdateRankingAxios(id, category, serverSideNewValue);
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[275px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        {currentRanking}
      </div>
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative min-h-[175px] w-[120px]">
          <Image layout={'fill'} src={bookCoverUrl} alt="bookCover" />
        </div>
        <div className="flex-col md:-mt-[175px] md:ml-[150px] ml-[15px] mt-[5px]">
          <h1 className="underline underline-offset-4">
            {title}: {subtitle}
          </h1>
          <p className="mt-1 text-gray-500 text-[0.8em]">{author}</p>
          <div className="flex md:w-full md:h-full md:justify-end md:items-end md:mt-[30px] md:pr-[20px] mt-1">
            <div className="flex">
              <p className="text-gray-500 text-[0.8em]">Année:</p>
              <p className="text-[0.8em] ml-[5px]">2020</p>
            </div>
            <div className="flex ml-2">
              <p className="text-gray-500 text-[0.8em]">Langue:</p>
              <p className="text-[0.8em] ml-[5px]">FR</p>
            </div>
          </div>
        </div>
      </div>
      <Ranking
        handleArrowClick={handleArrowClick}
        originalValue={originalValue}
      />
    </div>
  );
}
