import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";

import getChildren from "../getChildren";

import evaluate from "..";

export default function array(state: ShellState, input: ASTNode): EvaluationResult {
  const [listNode] = getChildren(input);
  return evaluate(state, listNode);
}
