export type videoType = {
  videoUrl: string;
  videoData: {
    id: number;
    author: string;
    ranking: number;
    isBookmarked: boolean;
    userRating: number | null;
  };
};
