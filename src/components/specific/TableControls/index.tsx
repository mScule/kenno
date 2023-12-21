import style from "./style.module.css";

import Switch from "../../resuable/Switch";
import Button from "../../resuable/Button";

import {
  TbLock as PreviewIcon,
  TbLockOpen as EditIcon,
  TbArrowLeft as UndoIcon,
  TbArrowRight as RedoIcon
} from "react-icons/tb";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useUndo from "../../../hooks/useUndo";
import useRedo from "../../../hooks/useRedo";

import { setEdit } from "../../../features/controls";
import { setSelection } from "../../../features/controls";

import Stack from "../../resuable/Stack";
import Direction from "../../../types/Direction";

export default function TableControls() {
  const dispatch = useAppDispatch();

  const { undo, disabled: isUndoDisabled } = useUndo();
  const { redo, disabled: isRedoDisabled } = useRedo();
  const { edit } = useAppSelector(state => state.controls);

  function handleChange() {
    dispatch(setSelection(null));
    dispatch(setEdit(!edit));
  }

  return (
    <div className={style.wrapper}>
      <div className={style.controls}>
        <Switch
          left={<PreviewIcon size={16} />}
          right={<EditIcon size={16} />}
          selection={edit}
          onChange={handleChange}
        />

        <div>
          <Stack direction={Direction.Row}>
            <Button disabled={isUndoDisabled} onClick={undo}>
              <UndoIcon size={20} />
            </Button>
            <Button disabled={isRedoDisabled} onClick={redo}>
              <RedoIcon size={20} />
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
