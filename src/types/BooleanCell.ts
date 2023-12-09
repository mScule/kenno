import GenericCell from "./CoreCell";
import Type from "./CellType";

type BooleanCell = GenericCell<boolean> & { type: Type.Boolean };

export default BooleanCell;
