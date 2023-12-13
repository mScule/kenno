import style from "./style.module.css";

import shell from "../../../engine/shell";
import functions from "../../../engine/shell/functions";

import Cell from "../../../types/Cell.ts";
import Color from "../../../types/Color.ts";
import CellType from "../../../types/CellType.ts";
import ShellResultType from "../../../types/ShellResultType.ts";

import Table from "../../resuable/Table/index.tsx";

import range from "../../../utility/array/range.ts";
import useAppSelector from "../../../hooks/useAppSelector.ts";

export default function TableArea() {
  const core = useAppSelector(state => state.spreadsheet.core);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.dragArea}>
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
        </div>
      </div>
    </div>
  );
}
