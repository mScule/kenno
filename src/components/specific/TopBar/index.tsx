import { TbGridPattern as Icon } from "react-icons/tb";

import ResetButton from "../ResetButton";
import SpaceCounter from "../SpaceCounter";

import style from "./style.module.css";

export default function TopBar() {
  return (
    <nav className={style.topBar}>
      <div className={style.logo}>
        <span>K</span>
        <Icon size={16} />
      </div>

      <div className={style.options}>
        <ResetButton />
        <SpaceCounter />
      </div>
    </nav>
  );
}
