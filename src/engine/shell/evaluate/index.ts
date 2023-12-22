import ASTNode from "../../../types/ASTNode";
import ASTNodeType from "../../../types/ASTNodeType";
import ShellState from "../../../types/ShellState";
import EvaluationResult from "../../../types/EvaluationResult";

import literal from "./evaluators/literal";
import array from "./evaluators/array";
import range from "./evaluators/range";
import list from "./evaluators/list";
import pointer from "./evaluators/pointer";
import reference from "./evaluators/reference";
import functionCall from "./evaluators/functionCall";
import unary from "./evaluators/unary";
import multiclative from "./evaluators/multiclative";
import additive from "./evaluators/additive";
import relational from "./evaluators/relational";
import equality from "./evaluators/equality";
import and from "./evaluators/and";
import or from "./evaluators/or";
import expression from "./evaluators/expression";

import { createError } from "../../../utility/error";

export default function evaluate(
  state: ShellState,
  input: ASTNode
): EvaluationResult {
  switch (input.type) {
    case ASTNodeType.Literal:
      return literal(state, input);
    case ASTNodeType.Array:
      return array(state, input);
    case ASTNodeType.Range:
      return range(state, input);
    case ASTNodeType.List:
      return list(state, input);
    case ASTNodeType.Pointer:
      return pointer(state, input);
    case ASTNodeType.Reference:
      return reference(state, input);
    case ASTNodeType.FunctionCall:
      return functionCall(state, input);
    case ASTNodeType.Unary:
      return unary(state, input);
    case ASTNodeType.Multiclative:
      return multiclative(state, input);
    case ASTNodeType.Additive:
      return additive(state, input);
    case ASTNodeType.Relational:
      return relational(state, input);
    case ASTNodeType.Equality:
      return equality(state, input);
    case ASTNodeType.And:
      return and(state, input);
    case ASTNodeType.Or:
      return or(state, input);
    case ASTNodeType.Expression:
      return expression(state, input);

    default:
      throw createError(`Node type ${input.type} is unsupported`);
  }
}
