import { createError } from "../error";

export default function parseBoolean(value: string) {
  switch (value.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
  }

  throw createError(`Value ${value} cannot be parsed to boolean`);
}
