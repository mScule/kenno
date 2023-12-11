import style from "./style.module.css";

import Direction from "../../types/Direction";
import Card from "../Card";
import Divider from "../Divider";
import Stack from "../Stack";
import Button from "../Button";
import CellType from "../../types/CellType";
import Select from "../Select";
import { useState } from "react";

export default function EditArea() {
  const [example, setExample] = useState(CellType.Boolean);
  return (
    <div className={style.wrapper}>
      <Card>
        <div className={style.panel}>
          <Stack
            direction={Direction.Column}
            style={{ justifyContent: "start", gap: "1rem" }}>
            <h3>Cell</h3>

            <Select
              options={[
                { name: "Boolean", value: CellType.Boolean },
                { name: "Number", value: CellType.Number },
                { name: "String", value: CellType.String },
                { name: "Expression", value: CellType.Expression }
              ]}
              selected={example}
              onSelect={value => {
                setExample(value);
              }}
            />

            <input type="text" name="input" placeholder="$ref" />

            <textarea name="input" placeholder="f(x)" />
            <Stack
              direction={Direction.Row}
              style={{ height: "fit-content", justifyContent: "right" }}>
              <Button>Reset</Button>
              <Button>Assign</Button>
            </Stack>
          </Stack>
        </div>
      </Card>
    </div>
  );
}
