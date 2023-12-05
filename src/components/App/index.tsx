import gradualStringIterator from "../../engine/shell/gradualStringIterator";
import gradualTokenIterator from "../../engine/shell/gradualTokenIterator";
import parser from "../../engine/shell/parser";
import style from "./style.module.css";

export default function App() {
  console.log(
    JSON.stringify(
      parser(gradualTokenIterator(gradualStringIterator("$(10->3:4,5,$Mike,40) * 30")))
    )
  );
  return (
    <>
      <h1>Engine</h1>
    </>
  );
}
