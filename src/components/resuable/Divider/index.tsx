import style from "./style.module.css";
import clsx from "clsx";
import Direction from "../../../types/Direction";

type Props = {
  direction: Direction;
};

export default function Divider({ direction }: Props) {
  return (
    <div
      className={clsx(
        style.divider,
        direction === Direction.Column && style.column,
        direction === Direction.Row && style.row
      )}></div>
  );
}
