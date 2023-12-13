import clsx from "clsx";
import style from "./style.module.css";

import { useState, ReactNode } from "react";

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export default function Switch({ left, right }: Props) {
  const [selection, setSelection] = useState(false);

  return (
    <button className={style.switch} onClick={() => setSelection(!selection)}>
      <div className={clsx(style.option, !selection && style.selected)}>
        {left}
      </div>
      <div className={clsx(style.option, selection && style.selected)}>
        {right}
      </div>
    </button>
  );
}
