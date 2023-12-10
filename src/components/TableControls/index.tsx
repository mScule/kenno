import style from "./style.module.css";
import Switch from "../Switch";

import { TbLock as PreviewIcon, TbLockOpen as EditIcon } from "react-icons/tb";

export default function TableControls() {
  return (
    <div className={style.wrapper}>
      <div className={style.borders}>
        <div className={style.controls}>
          <h2>TableName</h2>
          <Switch left={<span>Front</span>} right={<span>Back</span>} />
          <Switch
            left={<PreviewIcon size={16} />}
            right={<EditIcon size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
