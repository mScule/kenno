import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";

function stringifyEvaluationResult(result: EvaluationResult): string {
  switch (result.type) {
    case EvaluationResultType.Null:
      return "null";
    case EvaluationResultType.Boolean:
      return `boolean(${result.value})`;
    case EvaluationResultType.Number:
      return `number(${result.value})`;
    case EvaluationResultType.String:
      return `string(${result.value})`;
    case EvaluationResultType.Array:
      return stringifyResult(result.value);
  }
}

function stringifyEvaluationResults(results: EvaluationResult[]): string {
  let output = "";

  const isArray = results.length > 0;

  if (isArray) {
    output += "[";
  }

  const stringifiedResults = [];

  for (const result of results) {
    stringifiedResults.push(stringifyEvaluationResult(result));
  }

  output += stringifiedResults.join(", ");

  if (isArray) {
    output += "]";
  }

  return output;
}

export default function stringifyResult(
  result: string | number | boolean | EvaluationResult[]
): string {
  switch (typeof result) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
    case "undefined":
      return String(result);
    case "object":
      return stringifyEvaluationResults(result);
    default:
      return "??";
  }
}
