import { test, expect } from "vitest";

import { createCore, addRow } from "../../../src/engine/core";

test("add 1 row to empty core", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([]);

  addRow(core);

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([[]]);
});

test("add 1 row to core with 1 row", () => {
  const core = createCore(1, 0);

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([[]]);

  addRow(core);

  expect(core.rows).toEqual(2);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([[], []]);
});
