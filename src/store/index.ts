import { configureStore } from "@reduxjs/toolkit";

import withUndoable from "redux-undo";
import withURLPersistedState from "./enhancers/withUrlPersistedState";

import controlsReducer from "../features/controls";
import spreadsheetReducer from "../features/spreadsheet";

const KEY = "s";

/**
 * Do not access directly.
 * Use useAppDispatch, and useAppSelector hooks instead.
 */
export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    spreadsheet: withUndoable(withURLPersistedState(KEY, spreadsheetReducer))
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
