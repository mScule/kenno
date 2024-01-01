import style from "./style.module.css";

import { ReactNode } from "react";
import { TbClipboardCopy as CopyIcon } from "react-icons/tb";
import Button from "../Button";
import useNotifier from "../../../hooks/useNotifier";
import Severity from "../../../types/Severity";

interface Props {
  value: string;
  children: ReactNode;
}

export default function Copyable({ value, children }: Props) {
  const notify = useNotifier();

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    notify({ severity: Severity.Success, message: `${value} copied to clipboard` });
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
