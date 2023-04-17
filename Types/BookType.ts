export type bookType = {
  data: {
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
