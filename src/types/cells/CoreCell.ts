import PopulatedCell from "./PopulatedCell";
import EmptyCell from "./EmptyCell";

type CoreCell<T> = PopulatedCell<T> | EmptyCell;

export default CoreCell;
