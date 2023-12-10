import clsx from "clsx";
import style from "./style.module.css";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  green?: boolean;
  yellow?: boolean;
  red?: boolean;
};

export default function Button({ children, green, yellow, red }: Props) {
  return (
    <button
      className={clsx(
        style.button,
        green && style.green,
        yellow && style.yellow,
        red && style.red
      )}>
      {children}
    </button>
  );
}
