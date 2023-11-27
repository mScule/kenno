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

import "./style.css";

type Props = {
  data: Column;
};

function getTagColor(tag?: Tag) {
  switch (tag) {
    case Tag.Red:
      return "tag-red";
    case Tag.Yellow:
      return "tag-yellow";
    case Tag.Green:
      return "tag-green";
    case Tag.Blue:
      return "tag-blue";
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

export default function Column({ data: { type, content, tag } }: Props) {
  return (
    <td className={clsx(getTagColor(tag))}>
      <div className="kenno-column">
        <div className="kenno-type-icon">
          {!isAbsent(type) && getTypeIcon(type!)}
        </div>
        <span>{content && content}</span>
      </div>
    </td>
  );
}
