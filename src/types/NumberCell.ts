import GenericCell from "./CoreCell";
import Type from "./CellType";

type NumberCell = GenericCell<number> & { type: Type.Number };

export default NumberCell;
