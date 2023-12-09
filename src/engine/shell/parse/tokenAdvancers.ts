import GradualIterator from "../../../types/GradualIterator";
import Token from "../../../types/Token";
import TokenType from "../../../types/TokenType";

import { createError } from "../../../utility/error";

function requireType(iterator: GradualIterator<Token>, type: TokenType) {
  const currentType = iterator.getCurrent()?.type;

  if (!(currentType === type)) {
    throw createError(
      `Token type is incorrect. ${type} was needed. ${currentType} was given`
    );
  }
}

function requireSomeType(
  iterator: GradualIterator<Token>,
  matches: TokenType[]
) {
  const currentType = iterator.getCurrent()?.type;

  if (!(currentType && matches.includes(currentType))) {
    throw createError(
      `Token type is incorrect. Some of ${matches.toString()} was expected. ${currentType} was given`
    );
  }
}

function requireValue(iterator: GradualIterator<Token>, value: string) {
  const currentValue = iterator.getCurrent()?.value;

  if (!(currentValue === value)) {
    throw createError(
      `Token value is incorrect. ${value} was needed. ${currentValue} was given`
    );
  }
}

function requireToken(
  iterator: GradualIterator<Token>,
  { type, value }: Token
) {
  requireType(iterator, type);
  requireValue(iterator, value);
}

export function advanceWithType(
  iterator: GradualIterator<Token>,
  type: TokenType
): Token {
  const current = iterator.getCurrent();
  requireType(iterator, type);
  iterator.getNext();
  return current!;
}

export function advanceWithSomeType(
  iterator: GradualIterator<Token>,
  matches: TokenType[]
): Token {
  const current = iterator.getCurrent();
  requireSomeType(iterator, matches);
  iterator.getNext();
  return current!;
}

export function advanceWithValue(
  iterator: GradualIterator<Token>,
  value: string
): Token {
  const current = iterator.getCurrent();
  requireValue(iterator, value);
  iterator.getNext();
  return current!;
}

export function advanceWithToken(
  iterator: GradualIterator<Token>,
  token: Token
): Token {
  const current = iterator.getCurrent();
  requireToken(iterator, token);
  iterator.getNext();
  return current!;
}

export function advanceWithSymbol(
  iterator: GradualIterator<Token>,
  match: string
): Token {
  const current = iterator.getCurrent();
  requireToken(iterator, { type: TokenType.Symbol, value: match });
  iterator.getNext();
  return current!;
}
