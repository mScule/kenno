import { test, expect } from "vitest";
import read from "../../../src/engine/shell/read";
import tokenize from "../../../src/engine/shell/tokenize";
import TokenType from "../../../src/types/TokenType";

function initTokenizer(input: string) {
  return tokenize(read(input));
}

// skipBlanks

test("empty input", () => {
  const { getCurrent, getNext } = initTokenizer("");

  expect(getCurrent()).toEqual(null);
  getNext();
  expect(getCurrent()).toEqual(null);
});

test("only blanks", () => {
  const { getCurrent, getNext } = initTokenizer(" \n \t\t \n   ");

  expect(getCurrent()).toEqual(null);
  getNext();
  expect(getCurrent()).toEqual(null);
});

// buildStringToken

test(`"hello"`, () => {
  const { getCurrent } = initTokenizer(`"Hello"`);

  expect(getCurrent()?.type).toEqual(TokenType.String);
  expect(getCurrent()?.value).toEqual("Hello");
});

test(`blanks and "Hello"`, () => {
  const { getCurrent } = initTokenizer(`  "Hello"`);

  expect(getCurrent()?.type).toEqual(TokenType.String);
  expect(getCurrent()?.value).toEqual("Hello");
});

test(`string escape sequences`, () => {
  const { getCurrent, getNext } = initTokenizer(`
    "Tabs\\tTabs"
    "NewLine\\nNewLine"
    "CarriageReturn\\rCarriageReturn"
    "Slash\\\\Slash"
    "Quote\\"Quote"
  `);

  expect(getCurrent()?.value).toEqual("Tabs\tTabs");
  getNext();

  expect(getCurrent()?.value).toEqual("NewLine\nNewLine");
  getNext();

  expect(getCurrent()?.value).toEqual("CarriageReturn\rCarriageReturn");
  getNext();

  expect(getCurrent()?.value).toEqual("Slash\\Slash");
  getNext();

  expect(getCurrent()?.value).toEqual('Quote"Quote');
  getNext();
});

test(`string esacpe premature ending`, () => {
  expect(() => initTokenizer(`"\\ "`)).toThrowError();
});

test(`string premature ending`, () => {
  expect(() => initTokenizer(`"Hello`)).toThrowError();
});

// buildNumberToken

test(`small integer`, () => {
  const { getCurrent } = initTokenizer("1");

  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("1");
});

test(`big integer`, () => {
  const { getCurrent } = initTokenizer("405934");

  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("405934");
});

test(`float without digits after fractional point`, () => {
  expect(() => initTokenizer("13450.")).toThrowError();
});

test(`float with digits after fractional point`, () => {
  const { getCurrent } = initTokenizer("3.14159265359");

  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("3.14159265359");
});

// buildKeywordToken

test(`one letter id`, () => {
  const { getCurrent } = initTokenizer("a");

  expect(getCurrent()?.type).toEqual(TokenType.Id);
  expect(getCurrent()?.value).toEqual("a");
});

test(`multi letter id`, () => {
  const { getCurrent } = initTokenizer("_a_hello_12");

  expect(getCurrent()?.type).toEqual(TokenType.Id);
  expect(getCurrent()?.value).toEqual("_a_hello_12");
});

test(`boolean`, () => {
  const { getCurrent, getNext } = initTokenizer("true false");

  expect(getCurrent()?.type).toEqual(TokenType.Boolean);
  expect(getCurrent()?.value).toEqual("true");

  getNext();

  expect(getCurrent()?.type).toEqual(TokenType.Boolean);
  expect(getCurrent()?.value).toEqual("false");
});

test(`null`, () => {
  const { getCurrent, getNext } = initTokenizer("mike null");

  getNext();

  expect(getCurrent()?.type).toEqual(TokenType.Null);
  expect(getCurrent()?.value).toEqual("null");
});

test(`symbols`, () => {
  const { getCurrent, getNext } = initTokenizer(`
    []
    ()
    ,
    $
    ?:
    +-*/%
    !!=
    <-->
    <<=
    >>=
    &&
    ||
  `);

  // []
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("[");
  getNext();
  expect(getCurrent()?.value).toEqual("]");
  getNext();

  // ()
  expect(getCurrent()?.value).toEqual("(");
  getNext();
  expect(getCurrent()?.value).toEqual(")");
  getNext();

  // ,
  expect(getCurrent()?.value).toEqual(",");
  getNext();

  // $
  expect(getCurrent()?.value).toEqual("$");
  getNext();

  // ?:
  expect(getCurrent()?.value).toEqual("?");
  getNext();
  expect(getCurrent()?.value).toEqual(":");
  getNext();

  // +-*/%
  expect(getCurrent()?.value).toEqual("+");
  getNext();
  expect(getCurrent()?.value).toEqual("-");
  getNext();
  expect(getCurrent()?.value).toEqual("*");
  getNext();
  expect(getCurrent()?.value).toEqual("/");
  getNext();
  expect(getCurrent()?.value).toEqual("%");
  getNext();

  //!!=
  expect(getCurrent()?.value).toEqual("!");
  getNext();
  expect(getCurrent()?.value).toEqual("!=");
  getNext();

  //<-->
  expect(getCurrent()?.value).toEqual("<-");
  getNext();
  expect(getCurrent()?.value).toEqual("->");
  getNext();

  //<<=
  expect(getCurrent()?.value).toEqual("<");
  getNext();
  expect(getCurrent()?.value).toEqual("<=");
  getNext();

  //>>=
  expect(getCurrent()?.value).toEqual(">");
  getNext();
  expect(getCurrent()?.value).toEqual(">=");
  getNext();

  //&&
  expect(getCurrent()?.value).toEqual("&&");
  getNext();

  // ||
  expect(getCurrent()?.value).toEqual("||");
  getNext();
});

test(`$(0:4)+$(10:40)/1.2`, () => {
  const { getCurrent, getNext } = initTokenizer("$(0:4)+$(10:40)/1.2");

  // $
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("$");
  getNext();

  // (
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("(");
  getNext();

  // 0
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("0");
  getNext();

  // :
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(":");
  getNext();

  // 4
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("4");
  getNext();

  // )
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(")");
  getNext();

  // +
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("+");
  getNext();

  // $
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("$");
  getNext();

  // (
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("(");
  getNext();

  // 0
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("10");
  getNext();

  // :
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(":");
  getNext();

  // 4
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("40");
  getNext();

  // )
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(")");
  getNext();

  // /
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("/");
  getNext();

  // 1.2
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("1.2");
  getNext();
});

test(`$(0:4)+$(10:40)/1.2 with blanks`, () => {
  const { getCurrent, getNext } = initTokenizer("$(0:4) + $\t(10:40) / 1.2");

  // $
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("$");
  getNext();

  // (
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("(");
  getNext();

  // 0
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("0");
  getNext();

  // :
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(":");
  getNext();

  // 4
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("4");
  getNext();

  // )
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(")");
  getNext();

  // +
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("+");
  getNext();

  // $
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("$");
  getNext();

  // (
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("(");
  getNext();

  // 0
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("10");
  getNext();

  // :
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(":");
  getNext();

  // 4
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("40");
  getNext();

  // )
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual(")");
  getNext();

  // /
  expect(getCurrent()?.type).toEqual(TokenType.Symbol);
  expect(getCurrent()?.value).toEqual("/");
  getNext();

  // 1.2
  expect(getCurrent()?.type).toEqual(TokenType.Number);
  expect(getCurrent()?.value).toEqual("1.2");
  getNext();
});

test(`&`, () => {
  expect(() => initTokenizer("&")).toThrowError();
});

test(`|`, () => {
  expect(() => initTokenizer("|")).toThrowError();
});

test(`=`, () => {
  expect(() => initTokenizer("=")).toThrowError();
});
