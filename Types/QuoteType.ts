export type quoteType = {
  data: {
    id: number;
    quote: string;
    author: string;
    ranking: number;
    isBookmarked: boolean;
    userRating: number | null;
  };
};
