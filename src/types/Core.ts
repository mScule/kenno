import GenericCell from "./CoreCell";

/**
 * Do not modify directly. Use core functions instead.
 */
type Core = {
  rows: number;
  columns: number;
  data: GenericCell<unknown>[][];
};

export default Core;
