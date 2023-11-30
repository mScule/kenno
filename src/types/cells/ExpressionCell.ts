import GenericCell from "./CoreCell";
import Type from "../Type";

type ExpressionCell = GenericCell<string> & { type: Type.Expression };

export default ExpressionCell;
