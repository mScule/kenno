import { test, expect } from "vitest";

import { createCore, addRow, addColumn } from "../../../src/engine/core";
import range from "../../../src/utility/array/range";

test("add 1 column to rowless core", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([]);

  addColumn(core);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(1);
  expect(core.data).toEqual([]);
});

test("add 1 column to core with 1 row", () => {
  const core = createCore(1, 0);

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([[]]);

  addColumn(core);

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(1);
  expect(core.data).toEqual([[null]]);
});

test("add 3 column to rowless core and add row", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([]);

  for (const _ of range(3)) {
    addColumn(core);
  }

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(3);
  expect(core.data).toEqual([]);

  addRow(core)

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(3);
  expect(core.data).toEqual([[null, null, null]]);
});
