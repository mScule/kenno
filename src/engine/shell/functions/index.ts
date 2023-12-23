import ShellFunction from "../../../types/ShellFunction";

export default {
  STR: (_, [value]) => String(value),
  NUM: (_, [value]) => Number(value),

  SUM: (_, values) => {
    let result = 0;

    for (const value of values) {
      result += Number(value);
    }

    return result;
  },
  AVG: (_, values) => {
    console.log(values);
    let result = 0;

    for (const value of values) {
      result += Number(value);
    }

    return result / values.length;
  },
  MIN: (_, values) => Math.min(...(values as number[])),
  MAX: (_, values) => Math.max(...(values as number[])),
  COUNT: (_, values) => values.length
} as Record<string, ShellFunction<unknown>>;
