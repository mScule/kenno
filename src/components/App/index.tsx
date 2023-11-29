import style from "./style.module.css";

import Grid from "../Grid";
import Card from "../Card";

import DataType from "../../types/DataType";
import Tag from "../../types/Tag";

export default function App() {
  return (
    <>
      <Card>
        <h1>Kenno</h1>
      </Card>

      <Grid
        data={{
          rows: [
            {
              columns: [
                { content: "Hello there", type: DataType.String },
                { content: "False", type: DataType.Boolean, reference: "very_long_ref_name_la_lalalala" },
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
                  type: DataType.Expression,
                  selected: true,
                  reference: "Beer"
                }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, tag: Tag.Blue },
                { content: "Mike", type: DataType.String },
                {
                  content:
                    "Mike is mike foo bar baz ipsum dolor ruudim beerum.",
                  type: DataType.Expression,
                  tag: Tag.Red,
                  reference: "very_long_ref_name"
                },
                {
                  content:
                    "This has multiple\n Lines. Hello oijsdfoijepifjpoij oij oiejwf woiefowjiei w owiejfow woiejf oiw eofijw owoeifwoe woeijfwo  woeijfj woieijfoiewjfoijweoif jfoiwefoijweofij wefoijwjiweofj ",
                  type: DataType.String,
                  tag: Tag.Yellow,
                  selected: true,
                }
              ]
            },
            {
              columns: [
                {
                  content: "Mike",
                  type: DataType.String,
                  tag: Tag.Blue,
                  selected: true
                },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "Mike", type: DataType.String, selected: true },
                { content: "Mike", type: DataType.String },
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "Mike is mike", type: DataType.Expression }
              ]
            },
            {
              columns: [
                { content: "20", type: DataType.Number, tag: Tag.Green },
                { content: "20", type: DataType.Number },
                { content: "20", type: DataType.Number, reference: "Mike" },
                { content: "20", type: DataType.Number, tag: Tag.Yellow }
              ]
            }
          ]
        }}
      />
    </>
  );
}
