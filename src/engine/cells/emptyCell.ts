import EmptyCell from "../../types/cells/EmptyCell";
import CoreCell from "../../types/cells/CoreCell";

export function createEmptyCell(): EmptyCell {
  return null;
}

export function isEmptyCell(cell: CoreCell<unknown>): boolean {
  return cell === null;
}
