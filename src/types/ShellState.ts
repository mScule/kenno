import Core from "./Core";
import ShellFunction from "./ShellFunction";

type ShellState = {
  core: Core;
  functions: Record<string, ShellFunction<unknown>>;
  variables: Record<string, unknown>;
};

export default ShellState;
