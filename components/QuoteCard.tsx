import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState, useEffect } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import BookmarkHeart from './BookmarkHeart';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import { userType } from '@/Types/UserType';
import { quoteType } from '@/Types/QuoteType';
import { languageStrings } from '@/utils/languageStrings';

export default function QuoteCard({ quoteData }: quoteType) {
  const { id, quote, author, ranking, isBookmarked, userRating } = quoteData;
  const [currentRanking, setCurrentRanking] = useState<number | null>(null);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);
  const [isBookmarkUpdating, setIsBookmarkUpdating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

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

  // Add or Remove a Post from Bookmarks
  const handleBookmarkClick = async () => {
    if (!isBookmarkUpdating && user.id) {
      setIsCurrentlyBookmarked(!isCurrentlyBookmarked);
      setIsBookmarkUpdating(await UpdateBookmarkAxios(id, user.id));
    }
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[275px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        <div className="flex flex-col justify-between items-center">
          {currentRanking ? currentRanking : ranking}
          <BookmarkHeart
            isCurrentlyBookmarked={isCurrentlyBookmarked}
            handleBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
      <div className="flex-col w-full mt-[50px]">
        <h1 className="italic flex justify-center mb-3 text-[1.050em] pl-5 pr-5">
          {quote}
        </h1>
        <div className="flex justify-center items-center mb-2">
          <p className="text-gray-500 text-[0.8em]">
            {langStrings && langStrings.author}:
          </p>
          <p className="text-[0.8em] ml-[5px]">{author}</p>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-500 text-[0.8em]">
            {langStrings && langStrings.book}:
          </p>
          <p className="text-[0.8em] ml-[5px]">Pas de livre omg</p>
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
