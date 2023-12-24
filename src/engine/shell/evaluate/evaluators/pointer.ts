import ASTNode from "../../../../types/ASTNode";
import ShellState from "../../../../types/ShellState";
import EvaluationResult from "../../../../types/EvaluationResult";
import EvaluationResultType from "../../../../types/EvaluationResultType";

import demandType from "../demandType";
import evaluateType from "../createEvaluationType";
import getChildren from "../getChildren";

import read from "../../read";
import tokenize from "../../tokenize";
import parse from "../../parse";

import { getCell } from "../../../core";
import { isExpressionCell } from "../../../cells/expressionCell";
import { isNumberCell } from "../../../cells/numberCell";
import { isBooleanCell } from "../../../cells/booleanCell";
import { isStringCell } from "../../../cells/stringCell.ts";

import createEvaluationResult from "../createEvaluationType";
import evaluate from "..";

import parseBoolean from "../../../../utility/parse/parseBoolean";
import { createError } from "../../../../utility/error";

export default function pointer(
  state: ShellState,
  input: ASTNode
): EvaluationResult {
  const [rowSelectionNode, columnSelectionNode] = getChildren(input);

  const rowSelection = evaluate(state, rowSelectionNode);
  const columnSelection = evaluate(state, columnSelectionNode);

  const multipleRowsSelected = rowSelection.type === EvaluationResultType.Array;
  const multipleColumnsSelected = columnSelection.type === EvaluationResultType.Array;

  function getPointedCell(row: EvaluationResult, column: EvaluationResult) {
    demandType(row, EvaluationResultType.Number);
    demandType(column, EvaluationResultType.Number);

    const cell = getCell(state.core, {
      row: row.value as number,
      column: column.value as number
    })!;

    switch (true) {
      case isBooleanCell(cell):
        return evaluateType(parseBoolean(String(cell.value)));
      case isNumberCell(cell):
        return evaluateType(Number(cell.value));
      case isStringCell(cell):
        return evaluateType(String(cell.value));
      case isExpressionCell(cell):
         return evaluate(state, parse(tokenize(read(String(cell.value)))));
      default:
        throw createError(
          `Cell $(${row.value}:${column.value}) is null. Null values cannot be used in expressions`
        );
    }
  }

  if (multipleRowsSelected && multipleColumnsSelected) {
    const value: EvaluationResult[] = [];

    for (const row of rowSelection.value as EvaluationResult[]) {
      for (const column of columnSelection.value as EvaluationResult[]) {
        value.push(getPointedCell(row, column));
      }
    }

    return createEvaluationResult(value);
  } else if (multipleRowsSelected) {
    const value: EvaluationResult[] = [];
  
    for (const row of rowSelection.value as EvaluationResult[]) {
      value.push(getPointedCell(row, columnSelection));
    }

    return createEvaluationResult(value);
  } else if (multipleColumnsSelected) {
    
    const value: EvaluationResult[] = [];

    for (const column of columnSelection.value as EvaluationResult[]) {
      value.push(getPointedCell(rowSelection, column));
    }

    return createEvaluationResult(value);
  } else {
    return getPointedCell(rowSelection, columnSelection);
  }
}
