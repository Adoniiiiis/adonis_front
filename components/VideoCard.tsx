import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState } from 'react';
import Ranking from './Ranking';

export default function VideoCard({ videoUrl, videoData }: any) {
  const category = 'video';
  const { id, youtuber, ranking } = videoData;
  const [currentRanking, setCurrentRanking] = useState<number>(ranking);
  const originalValue = ranking;
  const [isUpdating, setIsUpdating] = useState(false);

  // Updating client and server side values for the ranking
  const handleArrowClick = async (
    clientSideNewValue: number,
    serverSideNewValue: number
  ) => {
    if (!isUpdating) {
      setIsUpdating(true);
      setCurrentRanking(clientSideNewValue);
      setIsUpdating(await UpdateRankingAxios(id, category, serverSideNewValue));
    }
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[245px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        {currentRanking}
      </div>
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative">
          <iframe width="275" height="175px" src={videoUrl}></iframe>
        </div>
        <div className="flex-col mt-[13px] ml-[15px] md:-mt-[160px] md:ml-[300px]">
          <div className="flex -mt-[7px]">
            <p className="text-gray-500 text-[0.8em]">Youtuber:</p>
            <p className="text-[0.8em] ml-[5px]">{youtuber}</p>
          </div>
          <div className="flex mt-[2px]">
            <p className="text-gray-500 text-[0.8em]">Genre:</p>
            <p className="text-[0.8em] ml-[5px]">Développement personnel</p>
          </div>
        </div>
      </div>
      <Ranking
        handleArrowClick={handleArrowClick}
        originalValue={originalValue}
        isUpdating={isUpdating}
      />
    </div>
  );
}
