import gradualStringIterator from "../../engine/shell/gradualStringIterator";
import gradualTokenIterator from "../../engine/shell/gradualTokenIterator";
import parser from "../../engine/shell/parser";
import style from "./style.module.css";

export default function App() {
  console.log(parser(gradualTokenIterator(gradualStringIterator("10 + 10 * 10"))))
  return (
    <>
      <h1>Engine</h1>
    </>
  );
}
