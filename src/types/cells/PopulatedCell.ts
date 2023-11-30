import Type from "../Type";

type PopulatedCell<T> = {
  type: Type;
  value: T;
};

export default PopulatedCell;
