import GradualIterator from "../../types/GradualIterator";
import Token from "../../types/Token";
import TokenType from "../../types/TokenType";

function tokenComparator(
  { getCurrent }: GradualIterator<Token>,
  comparator: (current: Token) => boolean
) {
  const current = getCurrent();

  if (!current) {
    return false;
  }

  return comparator(current);
}

export const isType = (iterator: GradualIterator<Token>, match: TokenType) =>
  tokenComparator(iterator, ({ type }) => type === match);

export const isSomeType = (
  iterator: GradualIterator<Token>,
  matches: TokenType[]
) => tokenComparator(iterator, ({ type }) => matches.includes(type));

export const isSymbol = (iterator: GradualIterator<Token>, match: string) =>
  tokenComparator(
    iterator,
    ({ type, value }) => type === TokenType.Symbol && value === match
  );

export const isSomeSymbol = (
  iterator: GradualIterator<Token>,
  matches: string[]
) =>
  tokenComparator(
    iterator,
    ({ type, value }) => type === TokenType.Symbol && matches.includes(value)
  );

export const isToken = (iterator: GradualIterator<Token>, token: Token) =>
  tokenComparator(
    iterator,
    ({ type, value }) => type === token.type && value === token.value
  );

export const isOrOperator = (iterator: GradualIterator<Token>) =>
  isSymbol(iterator, "||");

export const isAndOperator = (iterator: GradualIterator<Token>) =>
  isSymbol(iterator, "&&");

export const isEqualityOperator = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["==", "!="]);

export const isRelationalOperator = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["<", ">", "<=", ">="]);

export const isAdditiveOperator = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["+", "-"]);

export const isMulticlativeOperator = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["*", "/", "&"]);

export const isUnaryOperator = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["+", "-", "!"]);

export const isReference = (iterator: GradualIterator<Token>) =>
  isSymbol(iterator, "$");

export const isRange = (iterator: GradualIterator<Token>) =>
  isSomeSymbol(iterator, ["<-", "->"]);

export const isNull = (iterator: GradualIterator<Token>) =>
  isToken(iterator, { type: TokenType.Null, value: "null" });
