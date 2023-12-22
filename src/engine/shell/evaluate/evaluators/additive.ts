import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandSomeType from "../demandSomeType";
import demandType from "../demandType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function additive(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  switch (operator) {
    case "+":
      demandSomeType(left, [
        EvaluationResultType.Number,
        EvaluationResultType.String
      ]);
      demandSomeType(right, [
        EvaluationResultType.Number,
        EvaluationResultType.String
      ]);

      if (
        left.type === EvaluationResultType.String ||
        right.type === EvaluationResultType.String
      ) {
        return {
          type: EvaluationResultType.String,
          value: String(left.value) + String(right.value)
        };
      }
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) + Number(right.value)
      };
    case "-":
      demandType(left, EvaluationResultType.Number);
      demandType(right, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) - Number(right.value)
      };
    default:
      throw createError(`Unknown operator ${operator} for relational`, {
        internal: true
      });
  }
}
