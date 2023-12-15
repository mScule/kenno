import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import CellSelection from "../../types/CellSelection";

export const slice = createSlice({
  name: "controls",
  initialState: {
    edit: false,
    selection: null as CellSelection
  },
  reducers: {
    setEdit: (state, { payload }: PayloadAction<boolean>) => {
      state.edit = payload;
    },
    setSelection: (state, { payload }: PayloadAction<CellSelection>) => {
      state.selection = payload;
    }
  }
});

export const { setEdit, setSelection } = slice.actions;
export default slice.reducer;
