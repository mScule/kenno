import EmptyCell from "../../types/EmptyCell";
import CoreCell from "../../types/CoreCell";

export function createEmptyCell(): EmptyCell {
  return null;
}

export function isEmptyCell(cell: CoreCell<unknown>): boolean {
  return cell === null;
}
