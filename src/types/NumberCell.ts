import GenericCell from "./CoreCell";
import Type from "./Type";

type NumberCell = GenericCell<number> & { type: Type.Number };

export default NumberCell;
