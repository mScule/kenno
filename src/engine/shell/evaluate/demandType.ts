import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";
import { createError } from "../../../utility/error";

export default function demandType(
  result: EvaluationResult,
  type: EvaluationResultType
) {
  if (result.type !== type) {
    throw createError(`Incorrect type ${result.type}. ${type} was needed`);
  }
}
