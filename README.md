# Kenno - Spreadsheet for the web

## Features

- Simple language for calculations
- Simple UI that's easily tweakable
- Make REST api calls

## Commands

| Command    | Description      |
| ---------- | ---------------- |
| `pnpm dev` | Start dev server |

## Ideas for the formula script

### Cell reference

#### Returns value
`$(0:2)` References third column in the first row
`$($(0:0):3)` References fourth column of row that's index is the value found at the column 0 at row 0
`$user` Reference the cell that has "user" as alias
`$user(0:4)` Reference the cell that is four columns away from the cell that has "user" as alias
`$($mike, $age)` Reference a column that has the age of "mike"

#### Returns array of values
`$(0->3:5)` References sixth column in rows 0 to 3 (Returns array)
`$(5:$(0:4)->45)` Im not explaining this, but you get the idea
`$user(0->4:0)` From "user" named alias, for rows forward

### Operators

`->` Next x values
`<-` Previous x values
`=>` Next x values and current
`<=` Previous x values and current
