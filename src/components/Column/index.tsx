import style from "./style.module.css";

import clsx from "clsx";

import {
  TbQuestionMark as BooleanTypeIcon,
  TbNumber as NumberTypeIcon,
  TbTxt as StringTypeIcon,
  TbVariable as ExpressonTypeIcon
} from "react-icons/tb";

import Column from "../../types/Column";
import Tag from "../../types/Tag";

import DataType from "../../types/DataType";
import isAbsent from "../../utility/isAbsent";

type Props = {
  data: Column;
};

function getTagColor(tag?: Tag) {
  switch (tag) {
    case Tag.Red:
      return style.tagRed;
    case Tag.Yellow:
      return style.tagYellow;
    case Tag.Green:
      return style.tagGreen;
    case Tag.Blue:
      return style.tagBlue;
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
  data: { type, value, tag, selected, reference }
}: Props) {
  const hasType = !isAbsent(type);
  const hasContent = hasType || value;

  return (
    <td className={clsx(style.td, getTagColor(tag))}>
      {selected && <div className={style.selected} />}

      <div className={style.column}>
        {reference && <div className={style.reference}>${reference}</div>}
        {hasContent && (
          <div className={clsx(style.content)}>
            {hasType && (
              <div className={style.typeIcon}>{getTypeIcon(type!)}</div>
            )}
            {value && <span>{value}</span>}
          </div>
        )}
      </div>
    </td>
  );
}
