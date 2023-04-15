import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState, useEffect } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import BookmarkHeart from './BookmarkHeart';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import { userType } from '@/Types/UserType';
import { videoType } from '@/Types/VideoType';
import useLang from '@/hooks/useLang';
import useBookmark from '@/context/BookmarkContext';
export default function VideoCard({ videoUrl, videoData }: videoType) {
  const { id, author, ranking, isBookmarked, userRating } = videoData;
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);
  const [isBookmarkUpdating, setIsBookmarkUpdating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const langStrings = useLang();
  const { addToBookmarks } = useBookmark();

  // Updating client and server side values for the ranking
  const handleArrowClick = async (
    clientSideNewValue: any,
    serverSideNewValue: number
  ) => {
    if (!isUpdating && user.id) {
      setIsUpdating(true);
      clientSideNewValue != 0
        ? setCurrentRanking(clientSideNewValue)
        : setCurrentRanking('zero');

      setIsUpdating(await UpdateRankingAxios(id, user.id, serverSideNewValue));
    }
  };

  // Add or Remove a Post from Bookmarks
  const handleBookmarkClick = async () => {
    const newBookmark = [];
    newBookmark.push(videoData);
    addToBookmarks(newBookmark);
    setIsCurrentlyBookmarked(!isCurrentlyBookmarked);
    UpdateBookmarkAxios(id, user.id);
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[245px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        <div className="flex flex-col justify-between items-center">
          {currentRanking
            ? currentRanking === 'zero'
              ? 0
              : currentRanking
            : ranking}
          <BookmarkHeart
            isCurrentlyBookmarked={isCurrentlyBookmarked}
            handleBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative">
          <iframe width="275" height="175px" src={videoUrl}></iframe>
        </div>
        <div className="flex-col mt-[13px] ml-[15px] md:-mt-[160px] md:ml-[300px]">
          <div className="flex -mt-[7px]">
            <p className="text-gray-500 text-[0.8em]">
              {langStrings && langStrings.youtuber}:
            </p>
            <p className="text-[0.8em] ml-[5px]">{author}</p>
          </div>
          <div className="flex mt-[2px]">
            <p className="text-gray-500 text-[0.8em]">
              {langStrings && langStrings.category}:
            </p>
            <p className="text-[0.8em] ml-[5px]">Développement personnel</p>
          </div>
        </div>
      </div>
      <Ranking
        handleArrowClick={handleArrowClick}
        originalValue={ranking}
        isUpdating={isUpdating}
        userRating={userRating}
      />
    </div>
  );
}
