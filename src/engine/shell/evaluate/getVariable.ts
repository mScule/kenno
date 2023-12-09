import ShellState from "../../../types/ShellState";
import { createError } from "../../../utility/error";

export default function getVariable(state: ShellState, name: string): unknown {
  if (!state.variables[name]) {
    throw createError(`Variable ${name} doesn't exist`);
  }

  return state.variables[name] as unknown;
}
