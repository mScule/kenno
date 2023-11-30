import StringCell from "../../types/cells/StringCell";
import GenericCell from "../../types/cells/CoreCell";
import Type from "../../types/Type";

export function createStringCell(value: string): StringCell {
  return { type: Type.String, value };
}

export function isStringCell(cell: GenericCell<unknown>): boolean {
  return cell.type === Type.String;
}
