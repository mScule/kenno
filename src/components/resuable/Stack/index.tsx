import style from "./style.module.css";

import { HTMLAttributes } from "react";
import clsx from "clsx";

import Direction from "../../../types/Direction";

type Props = HTMLAttributes<HTMLDivElement> & {
  direction: Direction | { desktop: Direction; mobile: Direction };
};

export default function Stack({ direction, children, ...rest }: Props) {
  const hasSeparateDirectionForMobile = typeof direction === "object";

  const directions = hasSeparateDirectionForMobile
    ? [
        direction.desktop === Direction.Column && style.column,
        direction.mobile === Direction.Column && style.mobileColumn,

        direction.desktop === Direction.Row && style.row,
        direction.mobile === Direction.Row && style.mobileRow
      ]
    : [
        direction === Direction.Column && style.column,
        direction === Direction.Column && style.mobileColumn,

        direction === Direction.Row && style.row,
        direction === Direction.Row && style.mobileRow
      ];

  return (
    <div {...rest} className={clsx(style.stack, ...directions)}>
      {children}
    </div>
  );
}
