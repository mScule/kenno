import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import getChildren from "../getChildren";

import evaluate from "..";

export default function expression(state: ShellState, input: ASTNode): EvaluationResult {
  const [conditionNode, truthyNode, falsyNode] = getChildren(input);

  const condition = evaluate(state, conditionNode);
  const truthy = evaluate(state, truthyNode);
  const falsy = evaluate(state, falsyNode);

  demandType(condition, EvaluationResultType.Boolean);

  return condition.value ? truthy : falsy;
}
