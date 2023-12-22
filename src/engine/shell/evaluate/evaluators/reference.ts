import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";

import evaluateType from "../createEvaluationType";
import getChildren from "../getChildren";
import getTokenValue from "../getTokenValue";
import getVariable from "../getVariable";

import pointer from "./pointer";

export default function reference(state: ShellState, input: ASTNode): EvaluationResult {
  if (input.token) {
    const name = getTokenValue(input);
    const value = getVariable(state, name);

    return evaluateType(value);
  } else {
    const [pointerNode] = getChildren(input);
    return pointer(state, pointerNode);
  }
}
