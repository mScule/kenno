import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function relational(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  demandType(left, EvaluationResultType.Number);
  demandType(right, EvaluationResultType.Number);

  switch (operator) {
    case "<":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value < right.value
      };
    case ">":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value > right.value
      };
    case "<=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value <= right.value
      };
    case ">=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value >= right.value
      };
    default:
      throw createError(`Unknown operator ${operator} for relational`, {
        internal: true
      });
  }
}
