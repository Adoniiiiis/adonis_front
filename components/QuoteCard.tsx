import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState, useEffect } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import BookmarkHeart from './BookmarkHeart';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import { userType } from '@/Types/UserType';
import { quoteType } from '@/Types/QuoteType';
import useLang from '@/hooks/useLang';
import useContent from '@/context/ContentContext';
import { useRouter } from 'next/router';
import { BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './deleteModal';

export default function QuoteCard({ data }: quoteType) {
  const { id, quote, author, ranking, isBookmarked, userRating } = data;
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const langStrings = useLang();
  const { updateBookmark, updateRanking } = useContent();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);

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
      updateRanking(id, clientSideNewValue);
      setIsUpdating(await UpdateRankingAxios(id, user.id, serverSideNewValue));
    }
  };

  // Add or Remove a Post from Bookmarks
  const handleBookmarkClick = async () => {
    updateBookmark(id);
    setIsCurrentlyBookmarked(!isCurrentlyBookmarked);
    UpdateBookmarkAxios(id, user.id);
  };

  return (
    <div
      className={`${
        router.pathname === '/profile' ? 'w-full' : 'max-w-[800px] w-[95vw]'
      } min-h-[200px] min-w-[364px] bg-white flex mb-8 rounded-md border-gray-400 border-[1px]`}
    >
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        <div className="flex flex-col justify-between items-center">
          {currentRanking
            ? currentRanking === 'zero'
              ? 0
              : currentRanking
            : ranking}
          {router.pathname === '/profile' && (
            <BsFillTrash3Fill
              onClick={() => setIsDeleteModalOpen(true)}
              size={25}
              className="mt-[54px] cursor-pointer"
            />
          )}
          <BookmarkHeart
            isCurrentlyBookmarked={isCurrentlyBookmarked}
            handleBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          userId={user.id}
          postId={id}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      <div className="flex-col w-full mt-[50px] pb-3">
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
      <div className="m-0">
        <Ranking
          handleArrowClick={handleArrowClick}
          originalValue={ranking}
          isUpdating={isUpdating}
          userRating={userRating}
        />
      </div>
    </div>
  );
}
