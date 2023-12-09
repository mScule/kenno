import ShellResult from "../../types/ShellResult";
import ShellResultType from "../../types/ShellResultType";
import ShellState from "../../types/ShellState";

import read from "./read";
import tokenize from "./tokenize";
import parse from "./parse";
import evaluate from "./evaluate";

import { createError } from "../../utility/error";

export default function shell(state: ShellState, input: string): ShellResult {
  try {
    return {
      type: ShellResultType.Success,
      value: String(evaluate(state, parse(tokenize(read(input)))).value)
    };
  } catch (error) {
    if ((error as Error).message === "Maximum call stack size exceeded") {
      const { message } = createError("Circular reference between cells");

      return { type: ShellResultType.Failure, value: message };
    }
    return {
      type: ShellResultType.Failure,
      value: (error as Error).message
    };
  }
}
