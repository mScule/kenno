import BooleanCell from "../../types/BooleanCell";
import CoreCell from "../../types/CoreCell";
import Type from "../../types/CellType";

export function createBooleanCell(value: boolean): BooleanCell {
  return { type: Type.Boolean, value };
}

export function isBooleanCell(cell: CoreCell<unknown>): boolean {
  if (!cell) return false;

  return cell.type === Type.Boolean;
}
