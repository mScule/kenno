import { configureStore } from "@reduxjs/toolkit";
import spreadsheetReducer from "../features/spreadsheet";

/**
 * Do not access directly.
 * Use useAppDispatch, and useAppSelector hooks instead.
 */
export const store = configureStore({
  reducer: {
    spreadsheet: spreadsheetReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
