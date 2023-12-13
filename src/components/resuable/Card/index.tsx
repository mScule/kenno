import style from "./style.module.css";
import Parent from "../../../types/Parent";

export default function Card({ children }: Parent) {
  return <div className={style.card}>{children}</div>;
}
