import Core from "./Core";

type ShellFunction<T> = (core: Core, parameters: unknown[]) => T;

export default ShellFunction;
