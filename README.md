# StarRating Component

The StarRating component renders a star rating element with optional interactivity and animation. User can select ratings if the element is interactive, the componenet support multiple visual settings, such as colors and sizes.

## Props

**interactive** (boolean): Determines if the element is interactive and allows the user to set the rating.

- true: User can select the rating.
- false: Only displays the rating.

**setRating** ((rating: number) => void, optional): Callback function to set the rating value when the element is interactive.

**rating** (number, optional): Sets the initial rating.

- Defaults to 0.
- Acceptable values range from 0 to 5, in steps of 0.5.

**disabled** (boolean, optional): Disables the rating element, making it non-interactive.

- Defaults to false.

**size** ("small" | "medium" | "large", optional): Sets the size of the stars.

- Defaults to "medium".

**color** (string, optional): Sets the color of the filled stars.

- Defaults to yellow (#fcba03).

**emptyColor** (string, optional): Sets the color of the empty stars' border.

- Defaults to light grey (#d1d0cd).

**animateIn** (boolean, optional): Enables animation for the star rating.

- Defaults to false.

**animationDuration** (number, optional): Sets the duration of the animation in seconds.

- Defaults to 0.4.

## Usage

Here is an example of how to use the StarRating component in a project:

> static component:

```js
import StarRating from './StarRating';

(...)

return(
  <StarRating
        interactive={false}
        rating={3.5}
        size="large"
        color="#ff0000"
        emptyColor="#cccccc"
        animateIn={animate}
        animationDuration={0.5}
      />
)
```

> interactive component:

```js
import StarRating from './StarRating';

(...)

return(
  <StarRating
        interactive={true}
        setRating={setYourRatingState}
        size="large"
        color="#ff0000"
        emptyColor="#cccccc"
        animateIn={animate}
        animationDuration={0.5}
      />
)
```
