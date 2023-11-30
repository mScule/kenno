import { test, expect } from "vitest";
import { createCore, removeLastRow } from "../../../src/engine/core";

test("remove last column from core that has 1 column", () => {
  const core = createCore(1, 0);

  expect(core.rows).toEqual(1);
  expect(() => removeLastRow(core)).not.toThrowError();
  expect(core.rows).toEqual(0);
});

test("remove last column from core that has 42 columns", () => {
  const core = createCore(42, 0);

  expect(core.rows).toEqual(42);
  expect(() => removeLastRow(core)).not.toThrowError();
  expect(core.rows).toEqual(41);
});

test("remove last column from core that has 0 rows", () => {
  const core = createCore(0, 0);

  expect(core.rows).toEqual(0);
  expect(() => removeLastRow(core)).toThrowError();
});
