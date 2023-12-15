import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";

import { ActionCreators } from "redux-undo";

export default function useRedo() {
  const dispatch = useAppDispatch();
  const future = useAppSelector(state => state.spreadsheet.future);

  return {
    disabled: !(future && future.length > 0),
    redo: () => dispatch(ActionCreators.redo())
  };
}
