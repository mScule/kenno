import ExpressionCell from "../../types/ExpressionCell";
import CoreCell from "../../types/CoreCell";
import Type from "../../types/CellType";

export function createExpressionCell(value: string): ExpressionCell {
  return { type: Type.Expression, value };
}

export function isExpressionCell(cell: CoreCell<unknown>): boolean {
  if (!cell) return false;

  return cell.type === Type.Expression;
}
