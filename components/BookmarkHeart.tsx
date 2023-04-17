import { BsHeart, BsHeartFill } from 'react-icons/bs';

type bookmarkHeart = {
  isCurrentlyBookmarked: boolean;
  handleBookmarkClick: () => void;
};

export default function BookmarkHeart({
  isCurrentlyBookmarked,
  handleBookmarkClick,
}: bookmarkHeart) {
  return isCurrentlyBookmarked ? (
    <BsHeartFill
      onClick={() => handleBookmarkClick()}
      size={22}
      className="mb-[15px] cursor-pointer"
    />
  ) : (
    <BsHeart
      onClick={() => handleBookmarkClick()}
      size={22}
      className="mb-[15px] cursor-pointer"
    />
  );
}
