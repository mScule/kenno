import { test, expect } from "vitest";
import { createCore, removeLastColumn } from "../../../src/engine/core";

test("remove last column from core that has 1 column", () => {
  const core = createCore(0, 1);

  expect(core.columns).toEqual(1);
  expect(() => removeLastColumn(core)).not.toThrowError();
  expect(core.columns).toEqual(0);
});

test("remove last column from core that has 42 columns", () => {
  const core = createCore(0, 42);

  expect(core.columns).toEqual(42);
  expect(() => removeLastColumn(core)).not.toThrowError();
  expect(core.columns).toEqual(41);
});

test("remove last column from core that has 0 columns", () => {
  const core = createCore(0, 0);

  expect(core.columns).toEqual(0);
  expect(() => removeLastColumn(core)).toThrowError();
});
