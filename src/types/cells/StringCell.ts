import GenericCell from "./CoreCell";
import Type from "../Type";

type StringCell = GenericCell<string> & { type: Type.String };

export default StringCell;
