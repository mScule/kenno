import style from "./style.module.css";
import Parent from "../../types/Parent";

export default function DragArea({ children }: Parent) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.dragArea}>
          <div className={style.draggable}>{children}</div>
        </div>
      </div>
    </div>
  );
}
