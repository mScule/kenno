import style from "./style.module.css";

import clsx from "clsx";

import {
  TbQuestionMark as BooleanTypeIcon,
  TbNumber as NumberTypeIcon,
  TbTxt as StringTypeIcon,
  TbVariable as ExpressonTypeIcon
} from "react-icons/tb";

import Cell from "../../../types/Cell";
import Color from "../../../types/Color";
import DataType from "../../../types/CellType";

type Props = Cell;

function getColor(color?: Color) {
  switch (color) {
    case Color.Red:
      return style.red;
    case Color.Yellow:
      return style.yellow;
    case Color.Green:
      return style.green;
    case Color.Blue:
      return style.blue;
    default:
      return null;
  }
}

function getTypeIcon(type: DataType) {
  switch (type) {
    case DataType.Boolean:
      return <BooleanTypeIcon alt="Boolean" title="Boolean" />;
    case DataType.Number:
      return <NumberTypeIcon alt="Number" title="Number" />;
    case DataType.String:
      return <StringTypeIcon alt="String" title="String" />;
    case DataType.Expression:
      return <ExpressonTypeIcon alt="Expression" title="Expression" />;
  }
}

export default function Cell({
  type,
  value,
  color,
  heading,
  selected,
  disabled,
  reference,
  onClick
}: Props) {
  const Tag = heading ? "th" : "td";
  const hasType = type !== null && type !== undefined;
  const hasContent = hasType || value;

  return (
    <Tag
      className={clsx(
        style.cell,
        heading && style.heading,
        disabled ? style.disabled : getColor(color)
      )}
      onClick={onClick}>
      {selected && <div className={style.selected} />}

      <div className={style.wrapper}>
        {reference && <div className={style.reference}>${reference}</div>}
        {hasContent && (
          <div className={clsx(style.content)}>
            {hasType && (
              <div className={style.typeIcon}>{getTypeIcon(type)}</div>
            )}
            {value && <span>{value}</span>}
          </div>
        )}
      </div>
    </Tag>
  );
}
