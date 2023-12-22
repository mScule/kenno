import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import getChildren from "../getChildren";

import evaluate from "..";

export default function list(state: ShellState, input: ASTNode): EvaluationResult {
  const children = getChildren(input).map(childNode =>
    evaluate(state, childNode)
  );

  return { type: EvaluationResultType.Array, value: children };
}
