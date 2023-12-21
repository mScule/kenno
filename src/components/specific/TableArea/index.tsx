import style from "./style.module.css";

import shell from "../../../engine/shell";
import functions from "../../../engine/shell/functions";

import Cell from "../../../types/Cell.ts";
import Color from "../../../types/Color.ts";
import CellType from "../../../types/CellType.ts";
import ShellResultType from "../../../types/ShellResultType.ts";
import Direction from "../../../types/Direction.ts";
import CoreRow from "../../../types/CoreRow.ts";
import CoreCell from "../../../types/CoreCell.ts";
import Pointer from "../../../types/Pointer.ts";
import Row from "../../../types/Row.ts";

import Table from "../../resuable/Table/index.tsx";
import Stack from "../../resuable/Stack/index.tsx";
import Button from "../../resuable/Button/index.tsx";

import useAppDispatch from "../../../hooks/useAppDispatch.ts";
import useAppSelector from "../../../hooks/useAppSelector.ts";

import { setSelection } from "../../../features/controls/index.ts";

import range from "../../../utility/array/range.ts";

import {
  TbCirclePlus as AddIcon,
  TbCircleX as RemoveIcon
} from "react-icons/tb";
import {
  addRow,
  addColumn,
  removeRow,
  removeColumn
} from "../../../features/spreadsheet/index.ts";

export default function TableArea() {
  const dispatch = useAppDispatch();

  const core = useAppSelector(state => state.spreadsheet.present.core);
  const edit = useAppSelector(state => state.controls.edit);
  const selection = useAppSelector(state => state.controls.selection);

  function isCellSelected(rowIndex: number, columnIndex: number) {
    if (!selection) {
      return false;
    }

    return rowIndex === selection.row && columnIndex === selection.column;
  }

  function selectCell(row: number, column: number) {
    if (!edit) {
      return;
    }

    if (isCellSelected(row, column)) {
      dispatch(setSelection(null));
      return;
    }

    dispatch(setSelection({ row, column }));
  }

  function removeCellRow() {
    dispatch(setSelection(null));
    dispatch(removeRow());
  }

  function removeCellColumn() {
    dispatch(setSelection(null));
    dispatch(removeColumn());
  }

  function addCellRow() {
    dispatch(setSelection(null));
    dispatch(addRow());
  }

  function addCellColumn() {
    dispatch(setSelection(null));
    dispatch(addColumn());
  }

  function visualizeRowHeading(index: number) {
    return { heading: true, value: String(index), disabled: true };
  }

  function visualizeColumnHeading(index: number) {
    return { heading: true, value: String(index), disabled: true };
  }

  function visualizeCoreCell(
    cell: CoreCell<unknown>,
    { row, column }: Pointer
  ) {
    const visualized: Cell = {
      onClick: () => selectCell(row, column),
      selected: isCellSelected(row, column),
      disabled: !edit
    };

    if (!cell) {
      return visualized;
    }

    visualized.type = cell.type;

    if (cell.type === CellType.Expression) {
      const result = shell(
        {
          core,
          variables: {},
          functions
        },
        String(cell.value)
      );

      if (result.type === ShellResultType.Failure) {
        visualized.color = Color.Red;
      }

      visualized.value = result.value;
    } else {
      visualized.value = String(cell.value);
    }

    return visualized;
  }

  function visualizeCoreRow(row: CoreRow, rowIndex: number) {
    return row.map((cell, columnIndex) =>
      visualizeCoreCell(cell, { row: rowIndex, column: columnIndex })
    );
  }

  function visualizeHead(): Row[] {
    return [
      {
        columns: [
          { heading: true, disabled: true },
          ...range(core.columns).map(index => visualizeColumnHeading(index))
        ]
      }
    ];
  }

  function visualizeBody(): Row[] {
    return core.data.map((row, rowIndex) => ({
      columns: [
        visualizeRowHeading(rowIndex),
        ...visualizeCoreRow(row, rowIndex)
      ]
    }));
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.dragArea}>
          <Stack
            direction={Direction.Column}
            style={{
              width: "fit-content",
              height: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem"
            }}>
            <Button disabled={!edit || core.rows === 1} onClick={removeCellRow}>
              <RemoveIcon size={16} />
            </Button>
            <Stack
              direction={Direction.Row}
              style={{
                width: "fit-content",
                height: "fit-content",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem"
              }}>
              <Button
                disabled={!edit || core.columns === 1}
                onClick={removeCellColumn}>
                <RemoveIcon size={16} />
              </Button>
              <div className={style.draggable}>
                <Table head={visualizeHead()} body={visualizeBody()} />
              </div>
              <Button disabled={!edit} onClick={addCellColumn}>
                <AddIcon size={16} />
              </Button>
            </Stack>
            <Button disabled={!edit} onClick={addCellRow}>
              <AddIcon size={16} />
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
