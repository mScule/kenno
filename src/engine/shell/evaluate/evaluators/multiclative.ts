import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function multiclative(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  demandType(left, EvaluationResultType.Number);
  demandType(right, EvaluationResultType.Number);

  switch (operator) {
    case "*":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) * Number(right.value)
      };
    case "/":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) / Number(right.value)
      };
    case "%":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) % Number(right.value)
      };
    default:
      throw createError(`Unknown operator ${operator} for multiclative`, {
        internal: true
      });
  }
}
