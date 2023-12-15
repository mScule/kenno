import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import controlsReducer from "../features/controls";
import spreadsheetReducer from "../features/spreadsheet";

/**
 * Do not access directly.
 * Use useAppDispatch, and useAppSelector hooks instead.
 */
export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    spreadsheet: undoable(spreadsheetReducer)
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
