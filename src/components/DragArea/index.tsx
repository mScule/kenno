import style from "./style.module.css";
import Parent from "../../types/Parent";

export default function DragArea({ children }: Parent) {
  return (
    <div className={style.dragArea}>
      <div className={style.draggable}>{children}</div>
    </div>
  );
}
