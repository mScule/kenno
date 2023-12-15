import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

import { ActionCreators } from "redux-undo";

export default function useUndo() {
  const dispatch = useAppDispatch();
  const past = useAppSelector(state => state.spreadsheet.past);

  return {
    disabled: !(past && past.length > 0),
    undo: () => dispatch(ActionCreators.undo())
  };
}
