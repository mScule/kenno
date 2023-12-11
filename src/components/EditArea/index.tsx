import style from "./style.module.css";

import Direction from "../../types/Direction";
import Card from "../Card";
import Divider from "../Divider";
import Stack from "../Stack";
import Button from "../Button";
import CellType from "../../types/CellType";

export default function EditArea() {
  return (
    <div className={style.wrapper}>
      <Card>
        <div className={style.panel}>
          <Stack
            direction={Direction.Column}
            style={{ justifyContent: "start", gap: "1rem" }}>
            <h3>Cell</h3>

            <select>
              <option value={CellType.Boolean}>boolean</option>
              <option value={CellType.Number}>number</option>
              <option value={CellType.String}>string</option>
              <option value={CellType.Expression}>expression</option>
            </select>
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
