import Type from "./Type";
import Color from "./Color";

type Cell = {
  type?: Type;
  value?: string;
  color?: Color;
  heading?: boolean;
  selected?: boolean;
  disabled?: boolean;
  reference?: string;
};

export default Cell;
