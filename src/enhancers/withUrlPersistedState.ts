import { UnknownAction, Reducer } from "redux";

import get from "../../utility/url-store/get";
import set from "../../utility/url-store/set";

const withURLPersistedState =
  <S>(key: string, baseReducer: Reducer<S>): Reducer<S> =>
  (state: S | undefined, action: UnknownAction): S => {
    // Try get state
    if (!state) {
      const decoded = get<S>(key);

      if (decoded) {
        return baseReducer(decoded, action);
      }
    }

    const newState = baseReducer(state, action);

    // Update state
    set(key, newState);

    return newState;
  };

export default withURLPersistedState;
