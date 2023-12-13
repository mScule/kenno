import { createSlice } from "@reduxjs/toolkit";

import {
  createCore,
  addColumn as addCoreColumn,
  addRow as addCoreRow,
  removeLastColumn as removeLastCoreColumn,
  removeLastRow as removeLastCoreRow
} from "../../engine/core";

export const slice = createSlice({
  name: "spreadsheet",
  initialState: {
    core: createCore(0, 0)
  },
  reducers: {
    addRow: state => addCoreRow(state.core),
    addColumn: state => addCoreColumn(state.core),
    removeRow: state => removeLastCoreRow(state.core),
    removeColumn: state => removeLastCoreColumn(state.core)
  }
});

export const { addRow, addColumn, removeRow, removeColumn } = slice.actions;
export default slice.reducer;
