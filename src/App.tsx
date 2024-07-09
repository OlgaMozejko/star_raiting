import { useState } from "react";
import StarRating from "./components/StarRating/StarRating";
import style from "./App.module.scss";
import { ColorPicker, useColor, type IColor } from "react-color-palette";
import "react-color-palette/css";
import OptionExpander from "./components/Option/Option";

function App() {
  const [rating, setRating] = useState<number>(3.5);
  const [colorPick, setColorPick] = useColor("#fcba03");
  const [emptyColorPick, setEmptyColorPick] = useColor("#d1d0cd");
  const [bgColorPick, setBgColorPick] = useColor("#d0edf4");

  const [color, setColor] = useState("#fcba03");
  const [emptyColor, setEmptyColor] = useState("#d1d0cd");
  const [bgColor, setBgColor] = useState("#d0edf4");

  const [interactive, setInteractive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");

  const [animate, setAnimate] = useState(false);
  const [animateDur, setAnimateDur] = useState(0.4);

  const onColorPickChangeComplete = (color: IColor) => setColor(color.hex);
  const onColorEmptyPickChangeComplete = (color: IColor) =>
    setEmptyColor(color.hex);
  const onColorBgPickChangeComplete = (color: IColor) => setBgColor(color.hex);

  return (
    <section className={style.app_section}>
      <div className={style.preview}>
        <div
          className={style.preview_background}
          style={{ backgroundColor: bgColor }}
        >
          <StarRating
            interactive={interactive}
            setRating={setRating}
            disabled={disabled}
            rating={rating}
            size={size}
            color={color}
            emptyColor={emptyColor}
            animateIn={animate}
            animationDuration={animateDur}
          />
        </div>
      </div>
      <div className={style.options}>
        <OptionExpander title="Interactive">
          <input
            type="checkbox"
            checked={interactive}
            onChange={() => setInteractive((prev) => !prev)}
          />
          <label>Make it interactive</label>
        </OptionExpander>
        <OptionExpander title="Disable">
          <input
            type="checkbox"
            checked={disabled}
            onChange={() => setDisabled((prev) => !prev)}
          />
          <label>Disable it</label>
        </OptionExpander>
        <OptionExpander title="Size">
          <div className={style.input_wrapper}>
            <input
              type="radio"
              name="size"
              value="small"
              checked={size === "small"}
              onChange={() => setSize("small")}
            />
            <label>Small</label>
          </div>
          <div className={style.input_wrapper}>
            <input
              type="radio"
              name="size"
              value="medium"
              checked={size === "medium"}
              onChange={() => setSize("medium")}
            />
            <label>Medium</label>
          </div>
          <div className={style.input_wrapper}>
            <input
              type="radio"
              name="size"
              value="large"
              checked={size === "large"}
              onChange={() => setSize("large")}
            />
            <label>Large</label>
          </div>
        </OptionExpander>
        <OptionExpander title="Animation">
          <div className={style.input_wrapper}>
            <input
              type="checkbox"
              checked={animate}
              onChange={() => setAnimate((prev) => !prev)}
            />
            <label>Animate it</label>
          </div>
          <div className={style.input_wrapper}>
            <input
              type="number"
              placeholder="set animation duration"
              value={animateDur}
              onChange={(e) => setAnimateDur(Number(e.target.value))}
            />
          </div>
        </OptionExpander>
        <OptionExpander title="Color">
          <div className={style.color_wrapper}>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              color={colorPick}
              onChange={setColorPick}
              onChangeComplete={onColorPickChangeComplete}
            />
          </div>
        </OptionExpander>
        <OptionExpander title="Empty Color">
          <div className={style.color_wrapper}>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              color={emptyColorPick}
              onChange={setEmptyColorPick}
              onChangeComplete={onColorEmptyPickChangeComplete}
            />
          </div>
        </OptionExpander>
        <OptionExpander title="Change Background">
          <div className={style.color_wrapper}>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              color={bgColorPick}
              onChange={setBgColorPick}
              onChangeComplete={onColorBgPickChangeComplete}
            />
          </div>
        </OptionExpander>
        <OptionExpander title="Read About it">
          <h1>StarRating Component</h1>

          <p>
            The StarRating component renders a star rating element with optional
            interactivity and animation. Users can select ratings if the element
            is interactive. The component supports multiple visual settings,
            such as colors and sizes.
          </p>

          <h2>Props</h2>

          <p>
            <strong>interactive</strong> (boolean): Determines if the element is
            interactive and allows the user to set the rating.
          </p>
          <ul>
            <li>
              <strong>true</strong>: User can select the rating.
            </li>
            <li>
              <strong>false</strong>: Only displays the rating.
            </li>
          </ul>

          <p>
            <strong>setRating</strong> ((rating: number) &rarr; void, optional):
            Callback function to set the rating value when the element is
            interactive.
          </p>

          <p>
            <strong>rating</strong> (number, optional): Sets the initial rating.
          </p>
          <ul>
            <li>Defaults to 0.</li>
            <li>Acceptable values range from 0 to 5, in steps of 0.5.</li>
          </ul>

          <p>
            <strong>disabled</strong> (boolean, optional): Disables the rating
            element, making it non-interactive.
          </p>
          <ul>
            <li>Defaults to false.</li>
          </ul>

          <p>
            <strong>size</strong> ("small" | "medium" | "large", optional): Sets
            the size of the stars.
          </p>
          <ul>
            <li>Defaults to "medium".</li>
          </ul>

          <p>
            <strong>color</strong> (string, optional): Sets the color of the
            filled stars.
          </p>
          <ul>
            <li>Defaults to yellow (#fcba03).</li>
          </ul>

          <p>
            <strong>emptyColor</strong> (string, optional): Sets the color of
            the empty stars' border.
          </p>
          <ul>
            <li>Defaults to light grey (#d1d0cd).</li>
          </ul>

          <p>
            <strong>animateIn</strong> (boolean, optional): Enables animation
            for the star rating.
          </p>
          <ul>
            <li>Defaults to false.</li>
          </ul>

          <p>
            <strong>animationDuration</strong> (number, optional): Sets the
            duration of the animation in seconds.
          </p>
          <ul>
            <li>Defaults to 0.4.</li>
          </ul>
        </OptionExpander>
      </div>
    </section>
  );
}

export default App;
