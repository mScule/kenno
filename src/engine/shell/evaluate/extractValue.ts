import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";

export default function extractValue({
  type,
  value
}: EvaluationResult): unknown {
  if (type === EvaluationResultType.Array) {
    return (value as EvaluationResult[]).map(value => extractValue(value));
  }
  return value;
}
