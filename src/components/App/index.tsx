import style from "./style.module.css";

import Table from "../Table";
import Card from "../Card";
import Type from "../../types/Type";
import Color from "../../types/Color";

export default function App() {
  return (
    <>
      <Card>
        <h1>Kenno</h1>
      </Card>

      <Table
        head={[
          {
            columns: [
              {value: "H", color: Color.Red, heading: true },
              {},
              {},
              {},
              {},
              {}
            ]
          }
        ]}
        body={[
          {
            columns: [
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          }
        ]}
      />
    </>
  );
}
