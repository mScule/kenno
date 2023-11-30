import range from "../../utility/array/range";

import Core from "../../types/Core";
import CoreRow from "../../types/CoreRow";
import Pointer from "../../types/Pointer";

import { createEmptyCell } from "../cells/emptyCell";
import { createError } from "../../utility/error";
import CoreCell from "../../types/cells/CoreCell";

function requireRow(core: Core, index: number) {
  if (!(index >= 0 && index < core.rows - 1)) {
    throw createError(`Cannot remove row ${index}. It doesn't exist`);
  }
}

function requireColumn(core: Core, index: number) {
  if (!(index >= 0 && index < core.columns - 1)) {
    throw createError(`Cannot remove column ${index}. It doesn't exist`);
  }
}

export function createCore(rows: number, columns: number): Core {
  if (!(rows >= 0 && columns >= 0)) {
    throw createError(`Core has to contain atleast one row with one column`);
  }

  const core: Core = {
    rows,
    columns,
    data: []
  };

  for (const _ of range(rows)) {
    const row: CoreRow = [];

    for (const _ of range(columns)) {
      row.push(createEmptyCell());
    }

    core.data.push(row);
  }

  return core;
}

export function addColumn(core: Core) {
  core.columns++;

  for (const row of core.data) {
    row.push(createEmptyCell());
  }
}

export function addRow(core: Core) {
  core.rows++;

  const columns: CoreRow = [];

  for (const _ of range(core.columns)) {
    columns.push(createEmptyCell());
  }

  core.data.push(columns);
}

export function removeColumn(core: Core, index: number) {
  requireColumn(core, index);

  core.columns--;

  for (const row of core.data) {
    row.splice(index, 1);
  }
}

export function removeRow(core: Core, index: number) {
  requireRow(core, index);

  core.rows--;

  core.data.splice(index, 1);
}

export function removeLastColumn(core: Core) {
  removeColumn(core, core.columns - 1);
}

export function removeLastRow(core: Core) {
  removeRow(core, core.rows - 1);
}

export function getCell(core: Core, {row, column}: Pointer): CoreCell<unknown> {
    requireRow(core, row);
    requireColumn(core, column);

    return core.data[row][column];
}

export function setCell(core: Core, {row, column}: Pointer, cell: CoreCell<unknown>) {
    requireRow(core, row);
    requireColumn(core, row);

    core.data[row][column] = cell;
}
