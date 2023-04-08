export type rankingType = {
  originalValue: number;
  handleArrowClick: (a: number, b: number) => void;
  isUpdating: boolean;
  userRating: number | null;
};
