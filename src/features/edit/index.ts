import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CellType from "../../types/CellType";

type EditSlice = {
  type: CellType | null;
  value: string | null;
};

const initialState: EditSlice = {
  type: null,
  value: null
};

export const slice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setType: (state, { payload }: PayloadAction<CellType | null>) => {
      state.type = payload;
    },
    setValue: (state, { payload }: PayloadAction<string | null>) => {
      state.value = payload;
    }
  }
});

export const { setType, setValue } = slice.actions;
export default slice.reducer;
