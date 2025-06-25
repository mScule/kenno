import SpaceCounter from "../SpaceCounter";
import style from "./style.module.css";

import { TbGridPattern as Icon } from "react-icons/tb";

export default function TopBar() {
  return (
    <nav className={style.topBar}>
      <div className={style.logo}>
        <span>K</span>
        <Icon size={16} />
      </div>

      <div className={style.options}>
        <SpaceCounter />
      </div>
    </nav>
  );
}
