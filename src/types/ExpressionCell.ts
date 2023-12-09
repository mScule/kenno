import GenericCell from "./CoreCell";
import Type from "./CellType";

type ExpressionCell = GenericCell<string> & { type: Type.Expression };

export default ExpressionCell;
