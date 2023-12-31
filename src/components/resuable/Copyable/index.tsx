import style from "./style.module.css";

import { ReactNode } from "react";
import { TbClipboardCopy as CopyIcon } from "react-icons/tb";
import Button from "../Button";

interface Props {
  value: string;
  children: ReactNode;
}

export default function Copyable({ value, children }: Props) {
  function copyToClipboard() {
    navigator.clipboard.writeText(value);
  }

  return (
    <div className={style.container}>
      <div>{children}</div>
      <Button onClick={copyToClipboard}>
        <CopyIcon />
      </Button>
    </div>
  );
}
