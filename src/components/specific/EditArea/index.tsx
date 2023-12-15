import style from "./style.module.css";

import { useState } from "react";

import {
  TbTrash as RemoveIcon,
  TbChevronsRight as ExecuteIcon,
  TbCell as CellIcon,
  TbTableRow as RowIcon,
  TbTableColumn as ColumnIcon
} from "react-icons/tb";

import Button from "../../resuable/Button";
import Card from "../../resuable/Card";
import Select from "../../resuable/Select";
import Stack from "../../resuable/Stack";

import CellType from "../../../types/CellType";
import Direction from "../../../types/Direction";

import useAppSelector from "../../../hooks/useAppSelector";

export default function EditArea() {
  const [example, setExample] = useState<CellType | null>(CellType.Boolean);
  const [type] = useState<"cell" | "column" | "row">("row");

  const edit = useAppSelector(state => state.controls.edit);

  return edit && (
    <div className={style.wrapper}>
      <Card>
        <div className={style.panel}>
          <Stack
            direction={Direction.Column}
            style={{ justifyContent: "space-between", gap: "1rem" }}>
            <h3
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem"
              }}>
              {type === "cell" ? (
                <>
                  <CellIcon /> Cell
                </>
              ) : type === "row" ? (
                <>
                  <RowIcon /> Row
                </>
              ) : (
                <>
                  <ColumnIcon /> Column
                </>
              )}
            </h3>

            {type === "cell" ? (
              <>
                <Select
                  options={[
                    { name: "Null", value: null },
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
              </>
            ) : type === "column" ? (
              <>
                <input type="text" name="input" placeholder="$ref" />
                <div style={{ height: "100%" }} />
              </>
            ) : (
              <>
                <input type="text" name="input" placeholder="$ref" />
                <div style={{ height: "100%" }} />
              </>
            )}

            <Stack
              direction={Direction.Row}
              style={{
                height: "fit-content",
                justifyContent: "space-between"
              }}>
              <Button>
                Remove
                <RemoveIcon size={20} />
              </Button>
              <Button>
                Assign
                <ExecuteIcon size={20} />
              </Button>
            </Stack>
          </Stack>
        </div>
      </Card>
    </div>
  );
}
