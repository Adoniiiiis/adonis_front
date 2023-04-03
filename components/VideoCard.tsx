import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';

export default function VideoCard({ videoUrl, videoData }: any) {
  const { id, author, ranking } = videoData;
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { getUser }: any = useAuth();
  const user = getUser();

  // Updating client and server side values for the ranking
  const handleArrowClick = async (
    clientSideNewValue: number,
    serverSideNewValue: number
  ) => {
    if (!isUpdating && user.id) {
      setIsUpdating(true);
      setCurrentRanking(clientSideNewValue);
      setIsUpdating(await UpdateRankingAxios(id, user.id, serverSideNewValue));
    }
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[245px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        {currentRanking ? currentRanking : ranking}
      </div>
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative">
          <iframe width="275" height="175px" src={videoUrl}></iframe>
        </div>
        <div className="flex-col mt-[13px] ml-[15px] md:-mt-[160px] md:ml-[300px]">
          <div className="flex -mt-[7px]">
            <p className="text-gray-500 text-[0.8em]">Youtuber:</p>
            <p className="text-[0.8em] ml-[5px]">{author}</p>
          </div>
          <div className="flex mt-[2px]">
            <p className="text-gray-500 text-[0.8em]">Genre:</p>
            <p className="text-[0.8em] ml-[5px]">Développement personnel</p>
          </div>
        </div>
      </div>
      <Ranking
        handleArrowClick={handleArrowClick}
        originalValue={ranking}
        isUpdating={isUpdating}
      />
    </div>
  );
}
