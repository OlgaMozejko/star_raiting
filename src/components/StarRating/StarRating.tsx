import { FunctionComponent, useState, useRef, useEffect } from "react";
import StarRatingProps from "./StarRating.interface";
import style from "./StarRaiting.module.scss";
import { motion, useInView } from "framer-motion";
import combineClasses from "../../helpers/combineClasses";
import FilledStar from "./components/FilledStar";
import EmptyStar from "./components/EmptyStar";

/**
 *
 * @prop interactive - defines if the element is interactive and sets rating or only displays it
 * * type: boolean
 * * if true - use can select rating
 * * if false - only displays rating
 *
 * @prop setRating (optional) - needed if the element is interactive
 * * type: setState(number)
 *
 * @prop rating (optional) - sets rating
 * * defaults to 0
 * * from 0 to 5 - step by 0.5
 * * type: number
 *
 * @prop disabled (optional) - disables the rating element
 * * defaults to false
 * * type: boolean
 *
 * @prop size (optional) - sets size of the stars
 * * defaults to medium
 * * type: "small" | "medium" | "large"
 *
 * @prop color (optional) - sets color of the filled stars
 * * defaults to yellow #fcba03
 * * type: string - HEX color
 *
 * @prop emptyColor (optional) - sets color of the empty stars border
 * * defaults to lightgrey #d1d0cd
 * * type: string - HEX color
 *
 * @prop animateIn (optional) - enables animation of the star rating
 * * defaults to false
 * * type: boolean
 *
 * @prop animationDuration (optional) - sets the time of the animation
 * * defaults to 0.4 second
 * * set in seconds
 * * type: number
 *
 */

const StarRating: FunctionComponent<StarRatingProps> = (props) => {
  const {
    interactive,
    setRating,
    rating,
    disabled,
    size,
    color,
    emptyColor,
    animateIn,
    animationDuration,
  } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(rating ?? 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || disabled) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const hoverValue = ((e.clientX - left) / width) * 5;
    setHoverRating(roundToHalf(hoverValue));
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || disabled) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const newRating = ((e.clientX - left) / width) * 5;
    const roundedRating = roundToHalf(newRating);
    setCurrentRating(roundedRating);
    if (setRating) {
      setRating(newRating);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!interactive || disabled) return;
      const roundedRating = index + 1;
      setCurrentRating(roundedRating);
      if (setRating) {
        setRating(roundedRating);
      }
    }
  };

  const roundToHalf = (value: number) => {
    return Math.ceil(value * 2) / 2;
  };

  const displayRating = hoverRating ?? currentRating;

  const baseColor = emptyColor ?? "#d1d0cd";
  const fillColor = disabled ? baseColor : color ? color : "#fcba03";
  const sizeClass = size ? style[size] : style.medium;

  const interactiveClass = interactive && !disabled ? style.is_interactive : "";
  const disabledClass = disabled ? style.is_disabled : "";

  const [triggerReset, setTriggerReset] = useState(false);

  useEffect(() => {
    if (animateIn) {
      setTriggerReset((prev) => !prev);
    }
  }, [animateIn]);

  return (
    <div
      ref={ref}
      aria-label={
        !interactive && !disabled
          ? `${currentRating} stars rating out of 5`
          : undefined
      }
      className={combineClasses(
        style.wrapper,
        sizeClass,
        interactiveClass,
        disabledClass
      )}
      onMouseMove={(e) => {
        handleMouseMove(e);
      }}
      onClick={(e) => {
        handleClick(e);
      }}
      onMouseLeave={handleMouseLeave}
      tabIndex={!interactive && !disabled ? 0 : -1}
    >
      <div className={style.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={style.star}
            tabIndex={interactive && !disabled ? 0 : -1}
            role={interactive && !disabled ? "button" : undefined}
            aria-label={
              interactive && !disabled ? `Rate ${index + 1} stars` : undefined
            }
            onKeyUp={(e) => handleKeyPress(e, index)}
          >
            <EmptyStar color={baseColor} />
          </div>
        ))}
        <motion.div
          key={`${triggerReset}-${displayRating}`}
          aria-hidden
          className={style.rating}
          initial={{
            width: animateIn ? "0%" : `${(displayRating / 5) * 100}%`,
          }}
          animate={
            animateIn
              ? isInView
                ? { width: `${(displayRating / 5) * 100}%` }
                : { width: "0%" }
              : { width: `${(displayRating / 5) * 100}%` }
          }
          transition={{
            duration: animationDuration ?? 0.4,
            type: "spring",
            ease: "easeIn",
          }}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={style.star}>
              <FilledStar color={fillColor} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StarRating;
