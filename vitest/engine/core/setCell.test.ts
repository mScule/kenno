import { test, expect } from "vitest";

import { isEmptyCell } from "../../../src/engine/cells/emptyCell";
import {
  createNumberCell,
  isNumberCell
} from "../../../src/engine/cells/numberCell";

import { createCore, setCell, getCell } from "../../../src/engine/core";
import Pointer from "../../../src/types/Pointer";
import NumberCell from "../../../src/types/NumberCell";
import { createStringCell } from "../../../src/engine/cells/stringCell.ts";
import StringCell from "../../../src/types/StringCell";

test("set cell that's empty", () => {
  const core = createCore(1, 1);
  const cell: Pointer = { row: 0, column: 0 };

  expect(isNumberCell(getCell(core, cell))).toBeFalsy();
  expect(isEmptyCell(getCell(core, cell))).toBeTruthy();

  setCell(core, cell, createNumberCell(10));

  expect(isNumberCell(getCell(core, cell))).toBeTruthy();
  expect(isEmptyCell(getCell(core, cell))).toBeFalsy();

  expect(getCell<NumberCell>(core, cell)!.value).toEqual(10);
});

test("set cell that's already set", () => {
  const core = createCore(1, 1);
  const cell: Pointer = { row: 0, column: 0 };

  expect(isEmptyCell(getCell(core, cell))).toBeTruthy();

  setCell(core, cell, createStringCell("Hello there"));
  expect(getCell<StringCell>(core, cell)!.value).toEqual("Hello there");

  setCell(core, cell, createNumberCell(10));
  expect(getCell<NumberCell>(core, cell)!.value).toEqual(10);
});

test("set cell thats the only column", () => {
  const core = createCore(2, 1);
  const cell: Pointer = { row: 1, column: 0 };

  expect(isEmptyCell(getCell(core, cell))).toBeTruthy();

  setCell(core, cell, createStringCell("Hello there"));
  expect(getCell<StringCell>(core, cell)!.value).toEqual("Hello there");

  setCell(core, cell, createNumberCell(10));
  expect(getCell<NumberCell>(core, cell)!.value).toEqual(10);
});

test("try set value that's outside the core", () => {
  const core = createCore(0, 0);

  expect(() =>
    setCell(core, { row: 0, column: 0 }, createNumberCell(10))
  ).toThrowError();
});
