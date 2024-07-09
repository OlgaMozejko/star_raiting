import { Dispatch, SetStateAction } from "react";

export default interface StarRatingProps {
  interactive: boolean;
  setRating?: Dispatch<SetStateAction<number>>;

  disabled?: boolean;

  rating?: number;

  size?: "small" | "medium" | "large";
  color?: string;
  emptyColor?: string;

  animateIn?: boolean;
  animationDuration?: number;
}
