import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";

export default function evaluateType(value: unknown): EvaluationResult {
  switch (typeof value) {
    case "boolean":
      return { type: EvaluationResultType.Boolean, value };
    case "number":
      return { type: EvaluationResultType.Number, value };
    case "string":
      return { type: EvaluationResultType.String, value };
    default:
      return { type: EvaluationResultType.Null, value: "null" };
  }
}
