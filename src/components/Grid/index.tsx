import Grid from "../../types/Grid";
import first from "../../utility/array/first";
import range from "../../utility/array/range";

import Column from "../Column";

import "./style.css";

type Props = {
  data: Grid;
};

export default function Grid({ data }: Props) {
  return (
    <div className="kenno-grid">
      <table>
        <thead>
          <tr>
            <td className="heading">{":"}</td>
            {range(first(data.rows).columns.length).map(i => (
              <td key={i} className="heading">
                {i}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              <td className="heading">{i}</td>
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
