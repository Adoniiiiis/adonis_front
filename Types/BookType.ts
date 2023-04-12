import { StaticImageData } from 'next/image';

export type bookType = {
  bookData: {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    book_cover: string;
    ranking: number;
    isBookmarked: boolean;
    userRating: number | null;
  };
};
