import ASTNode from "../../../types/ASTNode";
import ASTNodeType from "../../../types/ASTNodeType";
import EvaluationResult from "../../../types/EvaluationResult";
import EvaluationResultType from "../../../types/EvaluationResultType";
import ShellState from "../../../types/ShellState";
import TokenType from "../../../types/TokenType";

import { createError } from "../../../utility/error";
import { isExpressionCell } from "../../cells/expressionCell";
import { getCell } from "../../core";

import parse from "../parse";
import tokenize from "../tokenize";
import read from "../read";

import getTokenValue from "./getTokenValue";
import getChildren from "./getChildren";
import getVariable from "./getVariable";
import evaluateType from "./evaluateType";
import demandType from "./demandType";
import demandSomeType from "./demandSomeType";
import extractValue from "./extractValue";

function literal(_: ShellState, input: ASTNode): EvaluationResult {
  const { type, value } = input.token!;

  switch (type) {
    case TokenType.Null:
      return evaluateType(null);
    case TokenType.Boolean:
      return evaluateType(value === "true" ? true : false);
    case TokenType.String:
      return evaluateType(value);
    case TokenType.Number:
      return evaluateType(Number(value));
    default:
      throw createError(`${type} should not be treated as literal`, {
        internal: true
      });
  }
}

function array(state: ShellState, input: ASTNode): EvaluationResult {
  const [listNode] = getChildren(input);
  return evaluate(state, listNode);
}

function range(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [fromNode, toNode] = getChildren(input);

  const from = evaluate(state, fromNode);
  const to = evaluate(state, toNode);

  demandType(from, EvaluationResultType.Number);
  demandType(to, EvaluationResultType.Number);

  if (from.value > to.value) {
    throw createError(
      `range operator needs left side value to be always smaller than the right side value`
    );
  }

  const range: EvaluationResult[] = [];

  switch (operator) {
    case "->":
      for (let i = from.value as number; i <= (to.value as number); i++) {
        range.push({ type: EvaluationResultType.Number, value: i });
      }
      break;
    case "<-":
      for (let i = to.value as number; i >= (from.value as number); i--) {
        range.push({ type: EvaluationResultType.Number, value: i });
      }
      break;
    default:
      throw createError(
        `Operator ${operator} shouldn't be evaluated as range`,
        { internal: true }
      );
  }

  return { type: EvaluationResultType.Array, value: range };
}

function list(state: ShellState, input: ASTNode): EvaluationResult {
  const children = getChildren(input).map(childNode =>
    evaluate(state, childNode)
  );

  return { type: EvaluationResultType.Array, value: children };
}

function pointer(state: ShellState, input: ASTNode): EvaluationResult {
  const [rowNode, columnNode] = getChildren(input);

  const rows = evaluate(state, rowNode);
  const columns = evaluate(state, columnNode);

  if (
    rows.type === EvaluationResultType.Array &&
    columns.type === EvaluationResultType.Array
  ) {
    const result: EvaluationResult[] = [];

    for (const row of rows.value as EvaluationResult[]) {
      demandType(row, EvaluationResultType.Number);

      for (const column of columns.value as EvaluationResult[]) {
        demandType(column, EvaluationResultType.Number);

        result.push(
          evaluateType(
            getCell(state.core, {
              row: row.value as number,
              column: column.value as number
            })?.value
          )
        );
      }
    }
    return { type: EvaluationResultType.Array, value: result };
  } else if (rows.type === EvaluationResultType.Array) {
    const result: EvaluationResult[] = [];

    demandType(columns, EvaluationResultType.Number);

    for (const row of rows.value as EvaluationResult[]) {
      demandType(row, EvaluationResultType.Number);
      result.push(
        evaluateType(
          getCell(state.core, {
            row: row.value as number,
            column: columns.value as number
          })?.value
        )
      );
    }
    return { type: EvaluationResultType.Array, value: result };
  } else if (columns.type === EvaluationResultType.Array) {
    const result: EvaluationResult[] = [];

    demandType(rows, EvaluationResultType.Number);

    for (const column of columns.value as EvaluationResult[]) {
      demandType(column, EvaluationResultType.Number);

      result.push(
        evaluateType(
          getCell(state.core, {
            row: rows.value as number,
            column: column.value as number
          })?.value
        )
      );
    }

    return { type: EvaluationResultType.Array, value: result };
  }

  demandType(rows, EvaluationResultType.Number);
  demandType(columns, EvaluationResultType.Number);

  const cell = getCell(state.core, {
    row: rows.value as number,
    column: columns.value as number
  })!;

  if (isExpressionCell(cell)) {
    return evaluate(
      state,
      parse(tokenize(read(cell.value as unknown as string)))
    );
  }

  return evaluateType(cell.value);
}

function reference(state: ShellState, input: ASTNode): EvaluationResult {
  if (input.token) {
    const name = getTokenValue(input);
    const value = getVariable(state, name);

    return evaluateType(value);
  } else {
    const [pointerNode] = getChildren(input);
    return pointer(state, pointerNode);
  }
}

function functionCall(state: ShellState, input: ASTNode): EvaluationResult {
  const name = getTokenValue(input);
  const parameters = getChildren(input).map(child =>
    extractValue(evaluate(state, child))
  );

  if (!state.functions[name]) {
    throw createError(`Function ${name} doesn't exist`);
  }

  return evaluateType(state.functions[name](state.core, parameters));
}

function unary(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [valueNode] = getChildren(input);

  const value = evaluate(state, valueNode);

  switch (operator) {
    case "!":
      demandType(value, EvaluationResultType.Boolean);
      return {
        type: EvaluationResultType.Boolean,
        value: !(value.value as boolean)
      };
    case "+":
      demandType(value, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: +(value.value as number)
      };
    case "-":
      demandType(value, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: -(value.value as number)
      };
    default:
      throw createError("Unsupported unary operator", { internal: true });
  }
}

function multiclative(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  demandType(left, EvaluationResultType.Number);
  demandType(right, EvaluationResultType.Number);

  switch (operator) {
    case "*":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) * Number(right.value)
      };
    case "/":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) / Number(right.value)
      };
    case "%":
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) % Number(right.value)
      };
    default:
      throw createError(`Unknown operator ${operator} for multiclative`, {
        internal: true
      });
  }
}

function additive(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  switch (operator) {
    case "+":
      demandSomeType(left, [
        EvaluationResultType.Number,
        EvaluationResultType.String
      ]);
      demandSomeType(right, [
        EvaluationResultType.Number,
        EvaluationResultType.String
      ]);

      if (
        left.type === EvaluationResultType.String ||
        right.type === EvaluationResultType.String
      ) {
        return {
          type: EvaluationResultType.String,
          value: String(left.value) + String(right.value)
        };
      }
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) + Number(right.value)
      };
    case "-":
      demandType(left, EvaluationResultType.Number);
      demandType(right, EvaluationResultType.Number);
      return {
        type: EvaluationResultType.Number,
        value: Number(left.value) - Number(right.value)
      };
    default:
      throw createError(`Unknown operator ${operator} for relational`, {
        internal: true
      });
  }
}

function relational(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  demandType(left, EvaluationResultType.Number);
  demandType(right, EvaluationResultType.Number);

  switch (operator) {
    case "<":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value < right.value
      };
    case ">":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value > right.value
      };
    case "<=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value <= right.value
      };
    case ">=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value >= right.value
      };
    default:
      throw createError(`Unknown operator ${operator} for relational`, {
        internal: true
      });
  }
}

function equality(state: ShellState, input: ASTNode): EvaluationResult {
  const operator = getTokenValue(input);
  const [leftNode, rightNode] = getChildren(input);

  const left = evaluate(state, leftNode);
  const right = evaluate(state, rightNode);

  switch (operator) {
    case "==":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value === right.value
      };
    case "!=":
      return {
        type: EvaluationResultType.Boolean,
        value: left.value !== right.value
      };
    default:
      throw createError(`Unknown operator ${operator} for equality`, {
        internal: true
      });
  }
}

function and(state: ShellState, input: ASTNode): EvaluationResult {
  const children = getChildren(input).map(childNode => {
    const child = evaluate(state, childNode);

    demandType(child, EvaluationResultType.Boolean);

    return child;
  });

  for (const child of children) {
    if (!child.value) {
      return { type: EvaluationResultType.Boolean, value: false };
    }
  }

  return { type: EvaluationResultType.Boolean, value: true };
}

function or(state: ShellState, input: ASTNode): EvaluationResult {
  const children = getChildren(input).map(childNode => {
    const child = evaluate(state, childNode);

    demandType(child, EvaluationResultType.Boolean);

    return child;
  });

  for (const child of children) {
    if (child.value) {
      return { type: EvaluationResultType.Boolean, value: true };
    }
  }

  return { type: EvaluationResultType.Boolean, value: false };
}

function expression(state: ShellState, input: ASTNode): EvaluationResult {
  const [conditionNode, truthyNode, falsyNode] = getChildren(input);

  const condition = evaluate(state, conditionNode);
  const truthy = evaluate(state, truthyNode);
  const falsy = evaluate(state, falsyNode);

  demandType(condition, EvaluationResultType.Boolean);

  return condition.value ? truthy : falsy;
}

export default function evaluate(
  state: ShellState,
  input: ASTNode
): EvaluationResult {
  switch (input.type) {
    case ASTNodeType.Literal:
      return literal(state, input);
    case ASTNodeType.Array:
      return array(state, input);
    case ASTNodeType.Range:
      return range(state, input);
    case ASTNodeType.List:
      return list(state, input);
    case ASTNodeType.Pointer:
      return pointer(state, input);
    case ASTNodeType.Reference:
      return reference(state, input);
    case ASTNodeType.FunctionCall:
      return functionCall(state, input);
    case ASTNodeType.Unary:
      return unary(state, input);
    case ASTNodeType.Multiclative:
      return multiclative(state, input);
    case ASTNodeType.Additive:
      return additive(state, input);
    case ASTNodeType.Relational:
      return relational(state, input);
    case ASTNodeType.Equality:
      return equality(state, input);
    case ASTNodeType.And:
      return and(state, input);
    case ASTNodeType.Or:
      return or(state, input);
    case ASTNodeType.Expression:
      return expression(state, input);

    default:
      throw createError(`Node type ${input.type} is unsupported`);
  }
}
