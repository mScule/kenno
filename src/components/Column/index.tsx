import style from "./style.module.css";

import clsx from "clsx";

import {
  TbQuestionMark as BooleanTypeIcon,
  TbNumber as NumberTypeIcon,
  TbTxt as StringTypeIcon,
  TbVariable as ExpressonTypeIcon
} from "react-icons/tb";

import Column from "../../types/Column";
import Color from "../../types/Color";

import DataType from "../../types/Type";

type Props = {
  data: Column;
};

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

export default function Column({
  data: { type, value, color, selected, reference }
}: Props) {
  const hasType = type !== null && type !== undefined;
  const hasContent = hasType || value;

  return (
    <td className={clsx(style.td, getColor(color))}>
      {selected && <div className={style.selected} />}

      <div className={style.column}>
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
    </td>
  );
}
