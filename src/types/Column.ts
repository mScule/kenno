import Referable from "./Referable";
import Type from "./Type";
import Color from "./Color";

type Column = Referable & {
  type?: Type;
  value?: string;
  color?: Color;
  selected?: boolean;
};

export default Column;
