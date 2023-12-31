import style from "./style.module.css";

interface Props {
  children: string;
}

export default function Code({ children }: Props) {
  return <code className={style.code}>{children}</code>;
}
