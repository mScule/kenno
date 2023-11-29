import Referable from "./Referable";
import DataType from "./DataType";
import Tag from "./Tag";

type Column = Referable & {
  type?: DataType;
  value?: string;
  tag?: Tag;
  selected?: boolean;
};

export default Column;
