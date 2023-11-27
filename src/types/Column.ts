import DataType from "./DataType";
import Tag from "./Tag";

type Column = {
  type?: DataType;
  content?: string;
  tag?: Tag;
};

export default Column;
