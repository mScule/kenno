import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";

import evaluate from "..";

export default function or(state: ShellState, input: ASTNode): EvaluationResult {
  const children = getChildren(input).map(childNode => {
    const child = evaluate(state, childNode);

    demandType(child, EvaluationResultType.Boolean);

    return child;
  });

  for (const child of children) {
    if (child.value) {
      return { type: EvaluationResultType.Boolean, value: true };
    }
  }

  return { type: EvaluationResultType.Boolean, value: false };
}
