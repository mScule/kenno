import NumberCell from "../../types/cells/NumberCell";
import GenericCell from "../../types/cells/CoreCell";
import Type from "../../types/Type";

export function createNumberCell(value: number): NumberCell {
  return { type: Type.Number, value };
}

export function isNumberCell(cell: GenericCell<unknown>): boolean {
  return cell.type === Type.Number;
}
