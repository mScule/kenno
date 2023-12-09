import EvaluationResultType from "./EvaluationResultType";

type EvaluationResult = {
  type: EvaluationResultType;
  value: string | number | boolean | EvaluationResult[];
};

export default EvaluationResult;
