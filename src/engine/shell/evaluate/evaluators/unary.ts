import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function unary(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [valueNode] = getChildren(input);

  const value = evaluate(state, valueNode);

  switch (operator) {
    case "!":
      demandType(value, EvaluationResultType.Boolean);
      return {
        type: EvaluationResultType.Boolean,
        value: !(value.value as boolean)
      };
    case "+":
      demandType(value, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: +(value.value as number)
      };
    case "-":
      demandType(value, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: -(value.value as number)
      };
    default:
      throw createError("Unsupported unary operator", { internal: true });
  }
}
