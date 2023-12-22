import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function range(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [fromNode, toNode] = getChildren(input);

  const from = evaluate(state, fromNode);
  const to = evaluate(state, toNode);

  demandType(from, EvaluationResultType.Number);
  demandType(to, EvaluationResultType.Number);

  if (from.value > to.value) {
    throw createError(
      `range operator needs left side value to be always smaller than the right side value`
    );
  }

  const range: EvaluationResult[] = [];

  switch (operator) {
    case "->":
      for (let i = from.value as number; i <= (to.value as number); i++) {
        range.push({ type: EvaluationResultType.Number, value: i });
      }
      break;
    case "<-":
      for (let i = to.value as number; i >= (from.value as number); i--) {
        range.push({ type: EvaluationResultType.Number, value: i });
      }
      break;
    default:
      throw createError(
        `Operator ${operator} shouldn't be evaluated as range`,
        { internal: true }
      );
  }

  return { type: EvaluationResultType.Array, value: range };
}
