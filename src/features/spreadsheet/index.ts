import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createCore,
  addColumn as addCoreColumn,
  addRow as addCoreRow,
  removeLastColumn as removeLastCoreColumn,
  removeLastRow as removeLastCoreRow,
  setCell as setCoreCell
} from "../../engine/core";
import CoreCell from "../../types/CoreCell";
import Pointer from "../../types/Pointer";

export const slice = createSlice({
  name: "spreadsheet",
  initialState: {
    core: createCore(1, 1)
  },
  reducers: {
    reset: () => ({ core: createCore(1, 1) }),
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
    },
    setCell: (
      state,
      { payload }: PayloadAction<{ pointer: Pointer; cell: CoreCell<unknown> }>
    ) => {
      setCoreCell(state.core, payload.pointer, payload.cell);
    }
  }
});

export const { reset, addRow, addColumn, removeRow, removeColumn, setCell } =
  slice.actions;
export default slice.reducer;
