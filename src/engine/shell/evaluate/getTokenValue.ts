import ASTNode from "../../../types/ASTNode";
import { createError } from "../../../utility/error";

export default function getTokenValue(input: ASTNode) {
  if (!input.token) {
    throw createError(`cannot get token value`);
  }

  return input.token.value;
}
