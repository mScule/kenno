import style from "./style.module.css";

import shell from "../../../engine/shell";
import functions from "../../../engine/shell/functions";

import Cell from "../../../types/Cell.ts";
import Color from "../../../types/Color.ts";
import CellType from "../../../types/CellType.ts";
import ShellResultType from "../../../types/ShellResultType.ts";
import Direction from "../../../types/Direction.ts";

import Table from "../../resuable/Table/index.tsx";
import Stack from "../../resuable/Stack/index.tsx";
import Button from "../../resuable/Button/index.tsx";

import useAppDispatch from "../../../hooks/useAppDispatch.ts";
import useAppSelector from "../../../hooks/useAppSelector.ts";

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
            <Button
              disabled={!edit || core.rows === 1}
              onClick={() => dispatch(removeRow())}>
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
                onClick={() => dispatch(removeColumn())}>
                <RemoveIcon size={16} />
              </Button>
              <div className={style.draggable}>
                <Table
                  head={[
                    {
                      columns: [
                        { heading: true },
                        ...range(core.columns).map(
                          index =>
                            ({
                              heading: true,
                              value: index + ""
                            } as Cell)
                        )
                      ]
                    }
                  ]}
                  // @ts-ignore
                  body={core.data.map((row, index) => ({
                    columns: [
                      { heading: true, value: index + "" },
                      ...row.map(column => {
                        if (!column) {
                          return {};
                        }

                        switch (column.type) {
                          case CellType.Expression:
                            const result = shell(
                              {
                                core,
                                variables: {},
                                functions
                              },
                              column.value as string
                            );
                            return {
                              type: CellType.Expression,
                              value: result.value,
                              color:
                                result.type === ShellResultType.Failure
                                  ? Color.Red
                                  : null
                            };

                          default:
                            return {
                              type: column.type,
                              value: column.value + ""
                            };
                        }
                      })
                    ]
                  }))}
                />
              </div>
              <Button disabled={!edit} onClick={() => dispatch(addColumn())}>
                <AddIcon size={16} />
              </Button>
            </Stack>
            <Button disabled={!edit} onClick={() => dispatch(addRow())}>
              <AddIcon size={16} />
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
