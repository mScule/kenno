import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";

import evaluateType from "../createEvaluationType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";

import evaluate from "..";
import extractValue from "../extractValue";

import { createError } from "../../../../utility/error";

export default function functionCall(
  state: ShellState,
  input: ASTNode
): EvaluationResult {
  const name = getTokenValue(input);

  if (!state.functions[name]) {
    throw createError(`Function ${name} doesn't exist`);
  }

  const [parametersNode] = getChildren(input);
  const parameters = evaluate(state, parametersNode);

  const extracted = extractValue(parameters);

  return evaluateType(
    state.functions[name](
      state.core,
      Array.isArray(extracted) ? extracted : [extracted]
    )
  );
}
