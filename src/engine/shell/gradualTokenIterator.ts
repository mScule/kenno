import GradualIterator from "../../types/GradualIterator";
import Token from "../../types/Token";
import TokenType from "../../types/TokenType";

import { createError } from "../../utility/error";

function isBlank(char: string) {
  return char.match(/\s|\n|\t|\r/);
}

function isLetter(char: string) {
  return char.match(/[a-z]|[A-Z]/);
}

function isDigit(char: string) {
  return char.match(/[0-9]/);
}

function skipBlanks({ getCurrent, getNext }: GradualIterator<string>) {
  while (true) {
    let current = getCurrent();

    if (!(current && isBlank(current))) {
      break;
    }

    getNext();
  }
}

function buildStringToken({
  getCurrent,
  getNext
}: GradualIterator<string>): Token {
  let value = "";

  while (true) {
    getNext();
    const current = getCurrent();

    if (current === null) {
      throw createError(
        "String literal is not correctly enclosed within double quotes"
      );
    }

    if (current === '"') {
      getNext();
      break;
    }

    if (current === "\\") {
      getNext();

      const current = getCurrent();

      switch (current) {
        case "t":
          value += "\t";
          continue;

        case "n":
          value += "\n";
          continue;

        case "r":
          value += "\r";
          continue;

        case '"':
          value += '"';
          continue;

        case "\\":
          value += "\\";
          continue;

        default:
          throw createError(
            `String literal contains unsupported escape sequence \\${current}`
          );
      }
    }

    value += current;
  }

  return { type: TokenType.String, value };
}

function buildNumberToken({
  getCurrent,
  getNext
}: GradualIterator<string>): Token {
  let value = "";
  let current = getCurrent();

  while (current && isDigit(current)) {
    value += current;

    getNext();
    current = getCurrent();

    if (current === ".") {
      value += current;
      getNext();
      current = getCurrent();

      if (!(current && isDigit(current))) {
        throw createError(
          'Numeric literal does not have digits after fractional part "."'
        );
      }

      while (current && isDigit(current)) {
        value += current;
        getNext();
        current = getCurrent();
      }
    }
  }

  return { type: TokenType.Number, value };
}

function buildKeywordToken({
  getCurrent,
  getNext
}: GradualIterator<string>): Token {
  let value = "";
  let current = getCurrent();

  while (
    current !== null &&
    (isLetter(current) || isDigit(current) || current === "_")
  ) {
    value += current;
    getNext();
    current = getCurrent();
  }

  switch (value) {
    case "true":
    case "false":
      return { type: TokenType.Boolean, value };
    case "null":
      return { type: TokenType.Null, value };
    default:
      return { type: TokenType.Id, value };
  }
}

function buildSymbolToken({
  getCurrent,
  getNext
}: GradualIterator<string>): Token {
  const current = getCurrent();
  let value = "";

  const unknownSymbolicLiteral = createError(
    `Symbolic literal ${current} is not supported`
  );

  switch (current) {
    case "[":
    case "]":
    case "(":
    case ")":
    case ",":
    case "$":
    case "?":
    case ":":
    case "+":
    case "*":
    case "/":
    case "%":
      value = current;
      getNext();
      break;

    case "!":
      value = current;
      getNext();

      if (getCurrent() === "=") {
        value += getCurrent();
        getNext();
      }
      break;

    case "=":
      value = current;
      getNext();

      if (getCurrent() === "=") {
        value += getCurrent();
        getNext();
      }
      break;

    case "<":
      value = current;
      getNext();

      if (getCurrent() === "-" || getCurrent() === "=") {
        value += getCurrent();
        getNext();
      }
      break;

    case "-":
      value = current;
      getNext();

      if (getCurrent() === ">") {
        value += getCurrent();
        getNext();
      }
      break;

    case ">":
      value = current;
      getNext();

      if (getCurrent() === "=") {
        value += getCurrent();
        getNext();
      }
      break;

    case "&":
      value = current;
      getNext();

      if (getCurrent() === "&") {
        value += getCurrent();
        getNext();
        break;
      } else {
        throw unknownSymbolicLiteral;
      }

    case "|":
      value = current;
      getNext();

      if (getCurrent() === "|") {
        value += getCurrent();
        getNext();
        break;
      } else {
        throw unknownSymbolicLiteral;
      }

    default:
      throw unknownSymbolicLiteral;
  }

  return { type: TokenType.Symbol, value };
}

export default function gradualTokenIterator(
  iterator: GradualIterator<string>
): GradualIterator<Token> {
  let token: Token | null = null;

  function getCurrent() {
    return token;
  }

  function getNext() {
    skipBlanks(iterator);

    const current = iterator.getCurrent();

    if (current === null) {
      return (token = null);
    }

    if (current === '"') {
      return (token = buildStringToken(iterator));
    }

    if (isDigit(current)) {
      return (token = buildNumberToken(iterator));
    }

    if (isLetter(current) || current === "_") {
      return (token = buildKeywordToken(iterator));
    }

    token = buildSymbolToken(iterator);
  }

  getNext();

  return { getCurrent, getNext };
}
