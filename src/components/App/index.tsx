import style from "./style.module.css";

import Grid from "../Grid";
import Card from "../Card";

import DataType from "../../types/DataType";
import Tag from "../../types/Tag";

export default function App() {
  return (
    <>
      <Card>
        <h1>Kenno</h1>
      </Card>

      <Grid
        data={{
          rows: [
            {
              columns: [{ type: DataType.Number, value: "10", reference: "num1" }, { type: DataType.Number, value: "25", reference: "num2" }, { type: DataType.Expression, value: "35", reference: "sum", tag: Tag.Blue }]
            },
          ]
        }}
      />
    </>
  );
}
