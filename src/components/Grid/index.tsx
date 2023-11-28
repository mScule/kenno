import style from "./style.module.css";

import Grid from "../../types/Grid";
import first from "../../utility/array/first";
import range from "../../utility/array/range";

import Column from "../Column";

type Props = {
  data: Grid;
};

export default function Grid({ data }: Props) {
  return (
    <div className={style.grid}>
      <table>
        <thead>
          <tr>
            <td className={style.heading} />
            {range(first(data.rows).columns.length).map(i => (
              <td key={i} className={style.heading}>
                <span>{i}</span>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              <td className={style.heading}>
                <span>{i}</span>
              </td>
              {row.columns.map((column, i) => (
                <Column key={i} data={column} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
