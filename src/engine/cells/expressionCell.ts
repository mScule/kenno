import ExpressionCell from "../../types/cells/ExpressionCell";
import GenericCell from "../../types/cells/CoreCell";
import Type from "../../types/Type";

export function createExpressionCell(value: string): ExpressionCell {
  return { type: Type.Expression, value };
}

export function isExpressionCell(cell: GenericCell<unknown>): boolean {
  return cell.type === Type.Expression;
}
