import CellType from "./CellType";
import Color from "./Color";

type Cell = {
  type?: CellType;
  value?: string;
  color?: Color;
  heading?: boolean;
  selected?: boolean;
  disabled?: boolean;
  reference?: string;
  onClick?: () => void;
};

export default Cell;
