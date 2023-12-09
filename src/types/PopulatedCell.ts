import Type from "./CellType";

type PopulatedCell<T> = {
  type: Type;
  value: T;
};

export default PopulatedCell;
