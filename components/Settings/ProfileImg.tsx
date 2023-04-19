import Image from 'next/image';
import React from 'react';
import blank_profile_img from './../../public/images/blank_profile_img.webp';

export default function ProfileImg({ profileImg, newProfileImg }: any) {
  if (newProfileImg) {
    return (
      <Image
        width={120}
        height={120}
        loader={() => newProfileImg}
        src={newProfileImg}
        className="rounded-full w-[120px] h-[120px] object-cover"
        alt="user profile image"
      />
    );
  } else if (!newProfileImg && profileImg) {
    return (
      <Image
        width={120}
        height={120}
        loader={() => profileImg}
        src={profileImg}
        className="rounded-full w-[120px] h-[120px] object-cover"
        alt="user profile image"
      />
    );
  } else {
    console.log('omg');
    return (
      <Image
        width={120}
        height={120}
        src={blank_profile_img}
        className="rounded-full w-[120px] h-[120px] object-cover"
        alt="user profile image"
      />
    );
  }
}
