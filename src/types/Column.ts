import Referable from "./Referable";
import DataType from "./DataType";
import Tag from "./Tag";

type Column = Referable & {
  type?: DataType;
  content?: string;
  tag?: Tag;
  selected?: boolean;
};

export default Column;
