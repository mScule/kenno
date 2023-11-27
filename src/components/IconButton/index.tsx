import { ButtonHTMLAttributes } from "react";

import "./style.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ children, ...props }: Props) {
  return (
    <button className="kenno-icon-button" {...props}>
      {children}
    </button>
  );
}
