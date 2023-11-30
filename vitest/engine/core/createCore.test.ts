import { test, expect } from "vitest";

import { createCore } from "../../../src/engine/core";

test("Create core with 0 rows and 0 columns", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([]);
});

test("Create core with 3 rows and 0 columns", () => {
  const core = createCore(3, 0);

  expect(core.rows).toEqual(3);
  expect(core.columns).toEqual(0);
  expect(core.data).toEqual([[], [], []]);
});

test("Create core with 0 rows and 3 columns", () => {
  const core = createCore(0, 3);

  expect(core.rows).toEqual(0);
  expect(core.columns).toEqual(3);
  expect(core.data).toEqual([]);
});

test("Create core with 1 row and 3 columns", () => {
  const core = createCore(1, 3);

  expect(core.rows).toEqual(1);
  expect(core.columns).toEqual(3);
  expect(core.data).toEqual([[null, null, null]]);
});
