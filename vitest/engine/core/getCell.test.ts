import { test, expect } from "vitest";

import { isEmptyCell } from "../../../src/engine/cells/emptyCell";
import {
  createNumberCell,
  isNumberCell
} from "../../../src/engine/cells/numberCell";

import { createCore, setCell, getCell } from "../../../src/engine/core";

test("get cell that's empty", () => {
  const core = createCore(10, 10);

  expect(isEmptyCell(getCell(core, { row: 9, column: 9 }))).toEqual(true);
  expect(isEmptyCell(getCell(core, { row: 0, column: 9 }))).toEqual(true);
  expect(isEmptyCell(getCell(core, { row: 9, column: 0 }))).toEqual(true);
  expect(isEmptyCell(getCell(core, { row: 0, column: 0 }))).toEqual(true);
});

test("get cell that's a number", () => {
  const core = createCore(10, 10);

  setCell(core, { row: 9, column: 9 }, createNumberCell(10));

  expect(isNumberCell(getCell(core, { row: 9, column: 9 }))).toEqual(true);
  expect(isEmptyCell(getCell(core, { row: 0, column: 0 }))).toEqual(true);
});

test("get cell outside the core", () => {
  const core = createCore(10, 10);

  expect(() => getCell(core, { row: 0, column: 10 })).toThrowError();
});
