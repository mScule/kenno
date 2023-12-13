import style from "./style.module.css";

import { HTMLAttributes } from "react";
import clsx from "clsx";

import Direction from "../../../types/Direction";

type Props = HTMLAttributes<HTMLDivElement> & {
  direction: Direction;
};

export default function Stack({ direction, children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        style.stack,
        direction === Direction.Column && style.column,
        direction === Direction.Row && style.row
      )}>
      {children}
    </div>
  );
}
