import { test, expect } from "vitest";

import { createCore, removeRow } from "../../../src/engine/core";

test("Remove 1 row from core that has 1 row", () => {
  const core = createCore(1, 0);

  expect(core.rows).toEqual(1);

  removeRow(core, 0);

  expect(core.rows).toEqual(0);
  expect(core.data).toEqual([]);

  expect(() => removeRow(core, 0)).toThrowError();
});

test("Remove row from index 42 from core that has only 2 rows", () => {
  const core = createCore(2, 0);

  expect(() => removeRow(core, 42)).toThrowError();
});

test("Remove row from index 42 from core that has 42 rows", () => {
  const core = createCore(42, 0);

  expect(() => removeRow(core, 42)).toThrowError();
});

test("Remove row from index 42 from core that has 43 rows", () => {
  const core = createCore(43, 0);

  expect(() => removeRow(core, 42)).not.toThrowError();

  expect(core.rows).toEqual(42);
});
