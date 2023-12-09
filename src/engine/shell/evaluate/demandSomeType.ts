import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";
import { createError } from "../../../utility/error";

export default function demandSomeType(
  result: EvaluationResult,
  type: EvaluationResultType[]
) {
  if (!type.includes(result.type)) {
    throw createError(`Incorrect type ${result.type}. ${type} was needed`);
  }
}
