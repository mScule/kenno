import style from "./style.module.css";

import Grid from "../Grid";
import Card from "../Card";

import Type from "../../types/Type";
import Color from "../../types/Color";

export default function App() {
  return (
    <>
      <Card>
        <h1>Kenno</h1>
      </Card>

      <Grid
        rows={[
          {
            columns: [
              { type: Type.Number, value: "10", reference: "num1" },
              {
                type: Type.Number,
                value: "25",
                reference: "num2",
              },
              {
                type: Type.Expression,
                value: "35",
                reference: "sum",
                color: Color.Blue
              }
            ]
          }
        ]}
      />
    </>
  );
}
