import style from "./style.module.css";

import isAbsent from "../../utility/isAbsent";
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
    default:
      return null;
  }
}

function getTypeIcon(type: DataType) {
  switch (type) {
    case DataType.Boolean:
      return <BooleanTypeIcon />;
    case DataType.Number:
      return <NumberTypeIcon />;
    case DataType.String:
      return <StringTypeIcon />;
    case DataType.Expression:
      return <ExpressonTypeIcon />;
  }
}

export default function Column({
  data: { type, content, tag, selected, reference }
}: Props) {
  return (
    <td className={clsx(getTagColor(tag), style.tableData)}>
      {reference && <div className={style.reference}>${reference}</div>}
      <div className={clsx(style.column, selected && style.selected)}>
        <div className={clsx(selected && style.selectedBorder)} />
        <div className={style.typeIcon}>
          {!isAbsent(type) && getTypeIcon(type!)}
        </div>
        <span>{content && content}</span>
      </div>
    </td>
  );
}
