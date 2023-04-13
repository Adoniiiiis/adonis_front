import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import BookmarkHeart from './BookmarkHeart';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BOOKMARKS, EDIT_BOOKMARK } from '@/Redux/Reducers/BookmarksSlice';
import { userType } from '@/Types/UserType';
import { bookType } from '@/Types/BookType';
import useLang from '@/hooks/useLang';
import Image from 'next/image';

export default function BookCard({ bookData }: bookType) {
  const {
    id,
    title,
    subtitle,
    author,
    book_cover,
    ranking,
    isBookmarked,
    userRating,
  } = bookData;
  const [currentRanking, setCurrentRanking] = useState<number | null>(ranking);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isBookmarkUpdating, setIsBookmarkUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const dispatch = useDispatch();
  const bookmarkRedux = useSelector((state: any) => state.bookmarks.bookmarks);
  const langStrings = useLang();

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
      bookmarkRedux != null || undefined
        ? dispatch(EDIT_BOOKMARK(id))
        : dispatch(ADD_BOOKMARKS(bookData));
      setIsCurrentlyBookmarked(!isCurrentlyBookmarked);
      setIsBookmarkUpdating(await UpdateBookmarkAxios(id, user.id));
    }
  };

  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[275px] bg-white flex mb-8 rounded-md border-gray-400 dark:border-gray-700 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-[15px] rounded-l-md">
        <div className="flex flex-col justify-between items-center">
          {currentRanking}
          <BookmarkHeart
            isCurrentlyBookmarked={isCurrentlyBookmarked}
            handleBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] ml-[15px] relative min-h-[175px] w-[120px]">
          {book_cover && (
            <Image
              layout={'fill'}
              loader={() => book_cover}
              src={book_cover}
              alt="bookCover"
            />
          )}
        </div>
        <div className="flex-col md:-mt-[175px] md:ml-[150px] ml-[15px] mt-[5px]">
          <h1 className="underline underline-offset-4">
            {title}: {subtitle}
          </h1>
          <p className="mt-1 text-gray-500 text-[0.8em]">{author}</p>
          <div className="flex md:w-full md:h-full md:justify-end md:items-end md:mt-[30px] md:pr-[20px] mt-1">
            <div className="flex">
              <p className="text-gray-500 text-[0.8em]">
                {langStrings && langStrings.year}:
              </p>
              <p className="text-[0.8em] ml-[5px]">2020</p>
            </div>
            <div className="flex ml-2">
              <p className="text-gray-500 text-[0.8em]">
                {langStrings && langStrings.language}:
              </p>
              <p className="text-[0.8em] ml-[5px]">FR</p>
            </div>
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
