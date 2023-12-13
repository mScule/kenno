import clsx from "clsx";
import style from "./style.module.css";
import { useState } from "react";

type Props<T> = {
  selected: T;
  options: { name: string; value: T }[];
  onSelect: (value: T) => void;
};

export default function <T>({ options, selected, onSelect }: Props<T>) {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <div
      className={style.container}
      onClick={() => setIsSelecting(!isSelecting)}
      onMouseLeave={() => setIsSelecting(false)}>
      <button className={clsx(style.select, style.selected)}>
        <div className={style.dot} />
        {(options.find(({ value }) => value === selected) ?? options[0]).name}
      </button>
      {isSelecting && (
        <div className={style.options}>
          {options.map(({ name, value }, index) => (
            <button
              key={index}
              className={clsx(
                style.option,
                value === selected && style.selected
              )}
              onClick={() => onSelect(value)}>
              <div
                className={clsx(
                  style.dot,
                  value === selected && style.selected
                )}
              />
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
