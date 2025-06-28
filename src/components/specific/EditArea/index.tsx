import style from "./style.module.css";

import {
  TbChevronsRight as ExecuteIcon,
  TbCell as CellIcon
} from "react-icons/tb";

import Button from "../../resuable/Button";
import Card from "../../resuable/Card";
import Select from "../../resuable/Select";
import Stack from "../../resuable/Stack";
import Copyable from "../../resuable/Copyable";
import Code from "../../resuable/Code";

import CellType from "../../../types/CellType";
import Direction from "../../../types/Direction";
import Pointer from "../../../types/Pointer";

import { useEffect } from "react";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";

import { getCell } from "../../../engine/core";
import { setCell } from "../../../features/spreadsheet";
import { setType, setValue } from "../../../features/edit";

export default function EditArea() {
  const dispatch = useAppDispatch();

  const isEdit = useAppSelector(state => state.controls.edit);
  const selection = useAppSelector(state => state.controls.selection);
  const edit = useAppSelector(state => state.edit);
  const core = useAppSelector(state => state.spreadsheet.present.core);

  useEffect(() => {
    if (!selection) {
      return;
    }

    const cell = getCell(core, selection);

    if (cell === null) {
      return;
    }

    dispatch(setType(cell && cell.type ? cell.type : null));
    dispatch(setValue(cell && cell.value ? String(cell.value) : ""));
  }, [selection, core]);

  return (
    isEdit &&
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
                <h3 style={{ padding: 0 }}>Cell</h3>
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
                selected={edit.type}
                onSelect={type => dispatch(setType(type))}
              />
              <textarea
                name="input"
                placeholder="f(x)"
                spellCheck={false}
                value={String(edit.value ?? "")}
                onChange={e => dispatch(setValue(e.target.value))}
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
                          type: edit.type!,
                          value: edit.value
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
