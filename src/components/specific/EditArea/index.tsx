import style from "./style.module.css";

import {
  TbChevronsRight as ExecuteIcon,
  TbCell as CellIcon
} from "react-icons/tb";

import Button from "../../resuable/Button";
import Card from "../../resuable/Card";
import Select from "../../resuable/Select";
import Stack from "../../resuable/Stack";

import CellType from "../../../types/CellType";
import Direction from "../../../types/Direction";

import { useEffect, useState } from "react";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { getCell } from "../../../engine/core";
import { setCell } from "../../../features/spreadsheet";
import Pointer from "../../../types/Pointer";
import Copyable from "../../resuable/Copyable";
import Code from "../../resuable/Code";

export default function EditArea() {
  const dispatch = useAppDispatch();

  const edit = useAppSelector(state => state.controls.edit);
  const selection = useAppSelector(state => state.controls.selection);
  const core = useAppSelector(state => state.spreadsheet.present.core);

  const [type, setType] = useState<CellType | null>(null);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (!selection) {
      return;
    }

    const cell = getCell(core, selection);

    setType(cell && cell.type ? cell.type : null);
    setValue(cell && cell.value ? String(cell.value) : "");
  }, [selection, core]);

  return (
    edit &&
    selection && (
      <div className={style.wrapper}>
        <Card>
          <div className={style.panel}>
            <Stack
              direction={Direction.Column}
              style={{ justifyContent: "space-between", gap: "1rem" }}>
              <header
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem"
                }}>
                <CellIcon />
                <h3 style={{padding: 0}}>Cell</h3>
                <Copyable value={`$(${selection.row}:${selection.column})`}>
                  <Code>{`$(${selection.row}:${selection.column})`}</Code>
                </Copyable>
              </header>

              <Select
                options={[
                  { name: "Null", value: null },
                  { name: "Boolean", value: CellType.Boolean },
                  { name: "Number", value: CellType.Number },
                  { name: "String", value: CellType.String },
                  { name: "Expression", value: CellType.Expression }
                ]}
                selected={type}
                onSelect={type => setType(type)}
              />
              <textarea
                name="input"
                placeholder="f(x)"
                spellCheck={false}
                value={value ? String(value) : ""}
                onChange={e => setValue(e.target.value)}
              />

              <Stack
                direction={Direction.Row}
                style={{
                  height: "fit-content",
                  justifyContent: "right"
                }}>
                <Button
                  onClick={() => {
                    dispatch(
                      setCell({
                        pointer: selection as Pointer,
                        cell: {
                          type: type!,
                          value
                        }
                      })
                    );
                  }}>
                  <ExecuteIcon size={20} />
                </Button>
              </Stack>
            </Stack>
          </div>
        </Card>
      </div>
    )
  );
}
