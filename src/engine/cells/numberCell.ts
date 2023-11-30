import NumberCell from "../../types/NumberCell";
import CoreCell from "../../types/CoreCell";
import Type from "../../types/Type";

export function createNumberCell(value: number): NumberCell {
  return { type: Type.Number, value };
}

export function isNumberCell(cell: CoreCell<unknown>): boolean {
  if (!cell) return false;

  return cell.type === Type.Number;
}
