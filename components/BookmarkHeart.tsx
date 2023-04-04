import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function BookmarkHeart({
  isCurrentlyBookmarked,
  handleBookmarkClick,
}: any) {
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
