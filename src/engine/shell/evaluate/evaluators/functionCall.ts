import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";

import evaluateType from "../createEvaluationType";
import extractValue from "../extractValue";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import { createError } from "../../../../utility/error";

import evaluate from "..";

export default function functionCall(state: ShellState, input: ASTNode): EvaluationResult {
  const name = getTokenValue(input);
  const parameters = getChildren(input).map(child =>
    extractValue(evaluate(state, child))
  );

  if (!state.functions[name]) {
    throw createError(`Function ${name} doesn't exist`);
  }

  return evaluateType(state.functions[name](state.core, parameters));
}
