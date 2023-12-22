import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function equality(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  switch (operator) {
    case "==":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value === right.value
      };
    case "!=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value !== right.value
      };
    default:
      throw createError(`Unknown operator ${operator} for equality`, {
        internal: true
      });
  }
}
