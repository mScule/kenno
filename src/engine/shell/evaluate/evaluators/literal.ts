import ASTNode from "../../../../types/ASTNode";
import TokenType from "../../../../types/TokenType";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";

import evaluateType from "../createEvaluationType";

import { createError } from "../../../../utility/error";

export default function literal(_: ShellState, input: ASTNode): EvaluationResult {
  const { type, value } = input.token!;

  switch (type) {
    case TokenType.Null:
      return evaluateType(null);
    case TokenType.Boolean:
      return evaluateType(value === "true" ? true : false);
    case TokenType.String:
      return evaluateType(value);
    case TokenType.Number:
      return evaluateType(Number(value));
    default:
      throw createError(`${type} should not be treated as literal`, {
        internal: true
      });
  }
}
