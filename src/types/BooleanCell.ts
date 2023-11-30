import GenericCell from "./CoreCell";
import Type from "./Type";

type BooleanCell = GenericCell<boolean> & { type: Type.Boolean };

export default BooleanCell;
