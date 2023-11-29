import style from "./style.module.css";

import Cell from "../Cell";
import Row from "../../types/Row";

type Props = {
  head: Row[];
  body: Row[];
};

export default function Table({ head, body }: Props) {
  return (
    <div className={style.grid}>
      <table>
        <thead>
          {head.map((row, i) => (
            <tr key={i}>
              {row.columns.map((column, i) => (
                <Cell key={i} {...column} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>
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
