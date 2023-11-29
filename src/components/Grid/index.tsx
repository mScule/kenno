import style from "./style.module.css";

import Grid from "../../types/Grid";
import first from "../../utility/array/first";
import range from "../../utility/array/range";

import Cell from "../Cell";

type Props = Grid;

export default function Grid({ rows }: Props) {
  return (
    <div className={style.grid}>
      <table>
        <thead>
          <tr>
            <Cell heading />
            {range(first(rows).columns.length).map(i => (
              <Cell key={i} reference="oij" heading value={String(i)} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <Cell heading value={String(i)} />
              {row.columns.map((column, i) => (
                <Cell key={i} {...column} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
