import { createCore, setCell } from "../../engine/core";
import { useState } from "react";
import { createNumberCell } from "../../engine/cells/numberCell";
import { createExpressionCell } from "../../engine/cells/expressionCell";

import shell from "../../engine/shell";
import functions from "../../engine/shell/functions";

import Table from "../Table";
import range from "../../utility/array/range";
import Cell from "../../types/Cell";
import Type from "../../types/CellType";
import ShellResultType from "../../types/ShellResultType";
import Color from "../../types/Color";

const variables: Record<string, unknown> = {
  first: "Mike",
  last: "Jackson",
  age: 20
};

const core = createCore(10, 10);

setCell(
  core,
  { row: 0, column: 0 },
  createExpressionCell(`"Total:" + SUM($(1->4:0))`)
);
setCell(core, { row: 1, column: 0 }, createNumberCell(1200));
setCell(core, { row: 2, column: 0 }, createNumberCell(2000));
setCell(core, { row: 3, column: 0 }, createNumberCell(50));
setCell(core, { row: 4, column: 0 }, createNumberCell(20));

export default function App() {
  const [c] = useState(core);

  return (
    <>
      <Table
        head={[
          {
            columns: [
              { heading: true },
              ...range(c.columns).map(
                index =>
                  ({
                    heading: true,
                    value: index + ""
                  } as Cell)
              )
            ]
          }
        ]}
        body={core.data.map((row, index) => ({
          columns: [
            { heading: true, value: index + "" },
            ...row.map(column => {
              if (!column) {
                return {};
              }

              switch (column.type) {
                case Type.Expression:
                  const result = shell(
                    {
                      core,
                      variables,
                      functions
                    },
                    column.value as string
                  );
                  return {
                    type: Type.Expression,
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
    </>
  );
}
