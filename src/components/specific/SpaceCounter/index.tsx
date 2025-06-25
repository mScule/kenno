import style from "./style.module.css";

import { useEffect, useState } from "react";
import { TbDatabase as SpaceIcon } from "react-icons/tb";

import useAppSelector from "../../../hooks/useAppSelector";

import getUsedSpace from "../../../utility/url-store/getUsedSpace";
import { MAX_SPACE } from "../../../utility/url-store/constants";
import clsx from "clsx";

export default function SpaceCounter() {
  const spreadsheet = useAppSelector(state => state.spreadsheet);
  const [usedSpace, setUsedSpace] = useState(0);

  useEffect(() => {
    setUsedSpace(getUsedSpace());
  }, [spreadsheet]);

  return (
    <div className={style.wrapper}>
      <span className={clsx(style.font, style.value)}>{usedSpace}</span>
      <span className={style.font}>/</span>
      <span className={clsx(style.font, style.value)}>{MAX_SPACE}</span>
      <SpaceIcon size={16} />
    </div>
  );
}
