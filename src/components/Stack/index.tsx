import style from "./style.module.css";

import Direction from "../../types/Direction";
import Parent from "../../types/Parent";
import clsx from "clsx";

type Props = Parent & {
  direction: Direction;
};

export default function Stack({ direction, children }: Props) {
  return (
    <div
      className={clsx(
        style.stack,
        direction === Direction.Column && style.column,
        direction === Direction.Row && style.row
      )}>
      {children}
    </div>
  );
}
