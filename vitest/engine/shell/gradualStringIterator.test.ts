import { test, expect } from "vitest";
import read from "../../../src/engine/shell/read";

test("first char is null in empty string", () => {
  const { getCurrent } = read("");

  expect(getCurrent()).toEqual(null);
});

test("second char is empty string", () => {
  const { getCurrent, getNext } = read("");

  getNext();

  expect(getCurrent()).toEqual(null);
});

test("first char is 'H' in 'Hello'", () => {
  const { getCurrent } = read("Hello");

  expect(getCurrent()).toEqual("H");
});

test("second char is 'e' in 'Hello'", () => {
  const { getCurrent, getNext } = read("Hello");

  getNext();

  expect(getCurrent()).toEqual("e");
});

test("last char is 'o'", () => {
  const { getCurrent, getNext } = read("Hello");

  getNext(); // e
  getNext(); // l
  getNext(); // l
  getNext(); // o

  expect(getCurrent()).toEqual("o");
});

test("last char is 'o'", () => {
  const { getCurrent, getNext } = read("Hello");

  getNext(); // e
  getNext(); // l
  getNext(); // l
  getNext(); // o
  getNext(); // Should be null

  expect(getCurrent()).toEqual(null);
});
