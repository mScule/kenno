import ASTNode from "../../../types/ASTNode";
import { createError } from "../../../utility/error";

export default function getChildren(input: ASTNode) {
  if (!input.children) {
    throw createError(`cannot get token children`);
  }

  return input.children;
}
