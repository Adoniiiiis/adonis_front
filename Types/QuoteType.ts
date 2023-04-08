export type quoteType = {
  quoteData: {
    id: number;
    quote: string;
    author: string;
    ranking: number;
    isBookmarked: boolean;
    userRating: number | null;
  };
};
