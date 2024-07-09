import { FunctionComponent, useState, ReactNode } from "react";
import style from "./Option.module.scss";
import { motion } from "framer-motion";
import combineClasses from "../../helpers/combineClasses";

export interface OptionProps {
  title?: string;
  children?: ReactNode;
}

const OptionExpander: FunctionComponent<OptionProps> = (props) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={style.option}>
      <div
        className={style.title_wrapper}
        onClick={() => {
          setExpand((prev) => !prev);
        }}
      >
        <div
          className={combineClasses(
            style.expand_icon,
            expand ? style.expanded : ""
          )}
          dangerouslySetInnerHTML={{ __html: "&#8628" }}
        ></div>
        {props.title && <span className={style.title}>{props.title}</span>}
      </div>
      <motion.div
        className={style.option_content}
        initial={{ height: 0 }}
        animate={{ height: expand ? "auto" : 0 }}
        transition={{ duration: 0.4 }}
      >
        {props.children && (
          <div className={style.option_inner}>{props.children}</div>
        )}
      </motion.div>
    </div>
  );
};

export default OptionExpander;
