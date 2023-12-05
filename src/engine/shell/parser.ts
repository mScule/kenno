import ASTNode from "../../types/ASTNode";
import ASTNodeType from "../../types/ASTNodeType";
import GradualIterator from "../../types/GradualIterator";
import Token from "../../types/Token";
import TokenType from "../../types/TokenType";

import {
  isAdditiveOperator,
  isAndOperator,
  isEqualityOperator,
  isMulticlativeOperator,
  isOrOperator,
  isRange,
  isRelationalOperator,
  isSymbol,
  isType,
  isUnaryOperator
} from "./tokenComparators";

import {
  advanceWithSomeType,
  advanceWithSymbol,
  advanceWithType
} from "./tokenAdvancers";

/**
 * literal = array | BOOLEAN | NUMBER | STRING | "null"
 */
function literal(iterator: GradualIterator<Token>): ASTNode {
  if (isSymbol(iterator, "[")) {
    return { type: ASTNodeType.Literal, children: [array(iterator)] };
  }

  const token = advanceWithSomeType(iterator, [
    TokenType.Boolean,
    TokenType.Number,
    TokenType.String,
    TokenType.Null
  ]);

  return { type: ASTNodeType.Literal, token };
}

/**
 * array = "[" list "]"
 */
function array(iterator: GradualIterator<Token>): ASTNode {
  advanceWithSymbol(iterator, "[");
  const items = list(iterator);
  advanceWithSymbol(iterator, "]");

  return { type: ASTNodeType.Array, children: [items] };
}

/**
 * range = expression (("<-" | "->") expression)?
 */
function range(iterator: GradualIterator<Token>): ASTNode {
  const left = expression(iterator);

  if (!isRange(iterator)) {
    return left;
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Range,
    token,
    children: [left, expression(iterator)]
  };
}

/**
 * list = range ("," range)*
 */
function list(iterator: GradualIterator<Token>): ASTNode {
  const first = range(iterator);

  if (!isSymbol(iterator, ",")) {
    return first;
  }

  iterator.getNext();

  return { type: ASTNodeType.List, children: [first, list(iterator)] };
}

/**
 * pointer = "(" list ":" list ")"
 */
function pointer(iterator: GradualIterator<Token>): ASTNode {
  advanceWithSymbol(iterator, "(");
  const row = list(iterator);
  advanceWithSymbol(iterator, ":");
  const column = list(iterator);
  advanceWithSymbol(iterator, ")");

  return {
    type: ASTNodeType.Pointer,
    children: [row, column]
  };
}

/**
 * command = ID "(" list ")"
 */
function command(iterator: GradualIterator<Token>): ASTNode {
  const token = advanceWithType(iterator, TokenType.Id);

  advanceWithSymbol(iterator, "(");
  const parameters = list(iterator);
  advanceWithSymbol(iterator, ")");

  return {
    type: ASTNodeType.Command,
    token,
    children: [parameters]
  };
}

/**
 * reference = "$" (ID | pointer);
 */
function reference(iterator: GradualIterator<Token>): ASTNode {
  advanceWithSymbol(iterator, "$");

  if (isType(iterator, TokenType.Id)) {
    const token = advanceWithType(iterator, TokenType.Id);
    return { type: ASTNodeType.Reference, token };
  }

  return {
    type: ASTNodeType.Reference,
    children: [pointer(iterator)]
  };
}

/**
 * primary = "(" expression ")"
 *         | command
 *         | reference
 *         | literal
 */
function primary(iterator: GradualIterator<Token>): ASTNode {
  switch (true) {
    case isSymbol(iterator, "("):
      iterator.getNext();
      const node = expression(iterator);
      advanceWithSymbol(iterator, ")");
      return node;

    case isType(iterator, TokenType.Id):
      return command(iterator);

    case isSymbol(iterator, "$"):
      return reference(iterator);

    default:
      return literal(iterator);
  }
}

/**
 * unary = primary | (("*" | "-" | "!")? unary)
 */
function unary(iterator: GradualIterator<Token>): ASTNode {
  if (!isUnaryOperator(iterator)) {
    return primary(iterator);
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Unary,
    token,
    children: [unary(iterator)]
  };
}

/**
 * multiclative = unary (("*" | "/" | "%") unary)*
 */
function multiclative(iterator: GradualIterator<Token>): ASTNode {
  const first = unary(iterator);

  if (!isMulticlativeOperator(iterator)) {
    return first;
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Multiclative,
    token,
    children: [first, multiclative(iterator)]
  };
}

/**
 * additive = multiclative (("+" | "-"") multiclative)*
 */
function additive(iterator: GradualIterator<Token>): ASTNode {
  const first = multiclative(iterator);

  if (!isAdditiveOperator(iterator)) {
    return first;
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Additive,
    token,
    children: [first, additive(iterator)]
  };
}

/**
 * relational = additive(("<" | ">" | "<=" | ">=") additive)*
 */
function relational(iterator: GradualIterator<Token>): ASTNode {
  const first = additive(iterator);

  if (!isRelationalOperator(iterator)) {
    return first;
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Relational,
    token,
    children: [first, relational(iterator)]
  };
}

/**
 * equality = relational (("==" | "!=") relational)*
 */
function equality(iterator: GradualIterator<Token>): ASTNode {
  const first = relational(iterator);

  if (!isEqualityOperator(iterator)) {
    return first;
  }

  const token = iterator.getCurrent()!;
  iterator.getNext();

  return {
    type: ASTNodeType.Equality,
    token,
    children: [first, equality(iterator)]
  };
}

/**
 * and = equality (("&&") equality)*;
 */
function and(iterator: GradualIterator<Token>): ASTNode {
  const first = equality(iterator);

  if (!isAndOperator(iterator)) {
    return first;
  }

  iterator.getNext();

  return { type: ASTNodeType.And, children: [first, and(iterator)] };
}

/**
 * or = and (("||") and)*;
 */
function or(iterator: GradualIterator<Token>): ASTNode {
  const first = and(iterator);

  if (!isOrOperator(iterator)) {
    return first;
  }

  iterator.getNext();

  return { type: ASTNodeType.Or, children: [first, or(iterator)] };
}

/**
 * expression = or ("?" expression ":" expression)?
 */
function expression(iterator: GradualIterator<Token>): ASTNode {
  const condition = or(iterator);

  if (!isSymbol(iterator, "?")) {
    return condition;
  }

  iterator.getNext();

  const truthy = expression(iterator);
  advanceWithSymbol(iterator, ":");
  const falsy = expression(iterator);

  return {
    type: ASTNodeType.Expression,
    children: [condition, truthy, falsy]
  };
}

export default function parser(iterator: GradualIterator<Token>): ASTNode {
  return expression(iterator);
}
