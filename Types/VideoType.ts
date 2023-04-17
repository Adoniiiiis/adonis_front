export type videoType = {
  videoUrl: string;
  data: {
    id: number;
    author: string;
    ranking: number;
    isBookmarked: boolean;
    userRating: number | null;
  };
};
