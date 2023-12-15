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
    core: createCore(1, 1),
  },
  reducers: {
    addRow: state => addCoreRow(state.core),
    addColumn: state => addCoreColumn(state.core),
    removeRow: state => {
      if (state.core.rows === 1) {
        return;
      }
      removeLastCoreRow(state.core);
    },
    removeColumn: state => {
      if (state.core.columns === 1) {
        return;
      }
      removeLastCoreColumn(state.core);
    }
  }
});

export const { addRow, addColumn, removeRow, removeColumn } = slice.actions;
export default slice.reducer;
