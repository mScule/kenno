import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";

export default function createEvaluationResult(value: unknown): EvaluationResult {
  switch (typeof value) {
    case "boolean":
      return { type: EvaluationResultType.Boolean, value };
    case "number":
      return { type: EvaluationResultType.Number, value };
    case "string":
      return { type: EvaluationResultType.String, value };
    default:
      if (Array.isArray(value)) {
        return { type: EvaluationResultType.Array, value };
      }
      return { type: EvaluationResultType.Null, value: "null" };
  }
}
