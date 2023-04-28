import UpdateRankingAxios from '@/Axios/UpdateRankingAxios';
import { useState } from 'react';
import Ranking from './Ranking';
import useAuth from '@/context/AuthContext';
import BookmarkHeart from './BookmarkHeart';
import UpdateBookmarkAxios from '@/Axios/UpdateBookmarkAxios';
import { userType } from '@/Types/UserType';
import { videoType } from '@/Types/VideoType';
import useLang from '@/hooks/useLang';
import useContent from '@/context/ContentContext';
import { useRouter } from 'next/router';
import { BsFillTrash3Fill } from 'react-icons/bs';
import DeleteModal from './DeleteModal';

export default function VideoCard({ videoUrl, data }: videoType) {
  const { id, author, ranking, isBookmarked, userRating } = data;
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [isCurrentlyBookmarked, setIsCurrentlyBookmarked] =
    useState<boolean>(isBookmarked);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const langStrings = useLang();
  const { updateBookmark, updateRanking } = useContent();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
      updateRanking(id, ranking + clientSideNewValue);
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
            : ranking === 0
            ? 0
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
      <div className="md:flex flex-col w-full">
        <div className="mt-[12px] md:ml-[15px] relative">
          <iframe width="275" height="175px" src={videoUrl}></iframe>
        </div>
        <div className="flex-col mt-[13px] ml-[15px] md:-mt-[160px] md:ml-[300px]">
          <div className="flex -mt-[4px]">
            <p className="text-gray-500 text-[0.8em]">
              {langStrings && langStrings.youtuber}:
            </p>
            <p className="text-[0.8em] ml-[5px]">{author}</p>
          </div>
          <div className="flex mt-[2px]">
            <p className="text-gray-500 text-[0.8em]">
              {langStrings && langStrings.category}:
            </p>
            <p className="text-[0.8em] ml-[5px] pb-3">
              Développement personnel
            </p>
          </div>
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
