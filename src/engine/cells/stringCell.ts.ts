import StringCell from "../../types/StringCell";
import CoreCell from "../../types/CoreCell";
import Type from "../../types/Type";

export function createStringCell(value: string): StringCell {
  return { type: Type.String, value };
}

export function isStringCell(cell: CoreCell<unknown>): boolean {
  if (!cell) return false;

  return cell.type === Type.String;
}
