import "./style.css";

import Grid from "../components/Grid";
import DataType from "../types/DataType";
import Tag from "../types/Tag";

export default function App() {
  return (
    <>
      <h1>Kenno</h1>
      <Grid
        data={{
          rows: [
            {
              columns: [
                { content: "Hello there", type: DataType.String },
                { content: "False", type: DataType.Boolean },
                { content: "20", type: DataType.Number },
                { content: "10", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number },
                {
                  content:
                    "Mike is mike foo bar baz ipsum dolor ruudim beerum.",
                  type: DataType.Expression
                }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "20", type: DataType.Number, tag: Tag.Magenta },
                { content: "20", type: DataType.Number, tag: Tag.Cyan },
                { content: "20", type: DataType.Number, tag: Tag.Yellow }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number, tag: Tag.Red },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            }
          ]
        }}
      />
    </>
  );
}
