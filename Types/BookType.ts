import { StaticImageData } from 'next/image';

export type bookType = {
  bookCoverUrl: StaticImageData;
  bookData: {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    ranking: number;
    isBookmarked: boolean;
  };
};
