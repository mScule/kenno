import ShellFunction from "../../../types/ShellFunction";

export default {
  LOG: (_, [...parameters]) => console.log("Kenno:", ...parameters),
  STR: (_, [value]) => String(value),
  NUM: (_, [value]) => Number(value),
  SUM: (_, values) => {
    let sum = 0;

    const add = (value: unknown) => {
      if(Array.isArray(value)) {
        for (const v of value) {
          add(v)
        }
      } else {
        sum += Number(value);
      }
    }

    add(values);

    return sum;
  },
  AVG: (_, []) => {}
} as Record<string, ShellFunction<unknown>>;
