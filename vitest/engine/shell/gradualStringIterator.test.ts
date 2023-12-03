import { test, expect } from "vitest";
import stringIterator from "../../../src/engine/shell/gradualStringIterator";

test("first char is null in empty string", () => {
  const { getCurrent } = stringIterator("");

  expect(getCurrent()).toEqual(null);
});

test("second char is empty string", () => {
  const { getCurrent, getNext } = stringIterator("");

  getNext();

  expect(getCurrent()).toEqual(null);
});

test("first char is 'H' in 'Hello'", () => {
  const { getCurrent } = stringIterator("Hello");

  expect(getCurrent()).toEqual("H");
});

test("second char is 'e' in 'Hello'", () => {
  const { getCurrent, getNext } = stringIterator("Hello");

  getNext();

  expect(getCurrent()).toEqual("e");
});

test("last char is 'o'", () => {
  const { getCurrent, getNext } = stringIterator("Hello");

  getNext(); // e
  getNext(); // l
  getNext(); // l
  getNext(); // o

  expect(getCurrent()).toEqual("o");
});

test("last char is 'o'", () => {
  const { getCurrent, getNext } = stringIterator("Hello");

  getNext(); // e
  getNext(); // l
  getNext(); // l
  getNext(); // o
  getNext(); // Should be null

  expect(getCurrent()).toEqual(null);
});
