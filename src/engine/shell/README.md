# Engine Shell

A small language for executing commands and for making queries and expressions to the core.

## Features

### Table pointers

### Single cell selection

Example below selects cell at 3nd column in 6th row

```
$(5:2)
```

### Multi cell selection to column array

Selection outputs column array containing values from columns 0, 2 and 3 in 11th row

```
$(10: 0, 2, 3)
```

It can be used for both sides

```
$(10, 49: 3, 2)
```

### Range selection

Selection can be made also dynamically with range selections

- Selection `x -> y` selects from x to y
- Selection `x <- y` selects from y to x

```
$(0->100:0<-39)
```

Selections can be part of multi cell selections

```
$(0, 10->20:3, 4, 10->14)
```

### Using variables to store table pointers

Variables can store any part of the table pointer

```
$name = 3
$age  = 4

$(0: $name, $age)
```

## EBNF:ish representation of the syntax

### Literal definitions

| Identifier | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| `ID`       | Can contain numbers alphabets and underscores. Cannot start with a number  |
| `STRING`   | Has C style escape characters. Is encapsulated with "`"`" characters       |
| `BOOLEAN`  | "`true`" or "`false`". No numbers allowed                                  |
| `NUMBER`   | A number value that can have a fractional part that's separated with "`.`" |

```ebnf
     literal = array | STRING | BOOLEAN | NUMBER | "null";
       array = "[" list "]";
       range = expression (("<-" | "->") expression)?;
        list = range ("," range)*;
     pointer = "(" list ":" list ")";
   reference = "$" (ID | pointer);
     command = ID "(" list ")";
     primary = "(" expression ")"
             | command
             | reference
             | literal;
       unary = primary | (("+" | "-" | "!")? unary);
multiclative = unary (("*" | "/" | "%") unary)*;
    additive = multiclative (("+" | "-") multiclative)*;
  relational = additive (("<" | ">" | "<=" | ">=") additive)*;
    equality = relational (("==" | "!=") relational)*;
         and = equality (("&&") equality)*;
          or = and (("||") and)*;
  expression = or ("?" expression ":" expression)?;
```
