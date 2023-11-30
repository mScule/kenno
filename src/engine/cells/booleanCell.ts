import BooleanCell from "../../types/cells/BooleanCell";
import GenericCell from "../../types/cells/CoreCell";
import Type from "../../types/Type";

export function createBooleanCell(value: boolean): BooleanCell {
  return { type: Type.Boolean, value };
}

export function isBooleanCell(cell: GenericCell<unknown>): boolean {
  return cell.type === Type.Boolean;
}
