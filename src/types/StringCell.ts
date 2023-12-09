import GenericCell from "./CoreCell";
import Type from "./CellType";

type StringCell = GenericCell<string> & { type: Type.String };

export default StringCell;
