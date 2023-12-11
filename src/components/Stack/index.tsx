import style from "./style.module.css";

import Direction from "../../types/Direction";
import clsx from "clsx";
import { HTMLAttributes } from "react";

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
