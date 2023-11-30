import { test, expect } from "vitest";
import { createCore, removeColumn } from "../../../src/engine/core";

test("Remove 1 column from core with 5 columns and 5 rows", () => {
  const core = createCore(5, 5);

  expect(core.rows).toEqual(5);
  expect(core.columns).toEqual(5);
  expect(core.data).toEqual([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ]);

  removeColumn(core, 0);

  expect(core.rows).toEqual(5);
  expect(core.columns).toEqual(4);
  expect(core.data).toEqual([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]);
});

test("Remove 1 column from core with 0 rows and 5 columns", () => {
  const core = createCore(0, 5);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(5);
  expect(core.data).toEqual([]);

  removeColumn(core, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(4);
  expect(core.data).toEqual([]);
});

test("Remove 1 column from core with 0 rows and 0 columns", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([]);

  expect(() => removeColumn(core, 0)).toThrowError();
});
