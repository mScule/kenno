import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "controls",
  initialState: {
    edit: false
  },
  reducers: {

    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    }
  }
});

export const { setEdit } = slice.actions;
export default slice.reducer;
