import EditArea from "../EditArea";
import TableArea from "../TableArea";
import TableControls from "../TableControls";
import TopBar from "../TopBar";

import Stack from "../../resuable/Stack";

import Direction from "../../../types/Direction.ts";

export default function App() {
  return (
    <Stack direction={Direction.Column} style={{ paddingBottom: "0.5rem" }}>
      <TopBar />
      <TableControls />

      <Stack
        direction={{ desktop: Direction.Row, mobile: Direction.Column }}
        style={{ padding: "0 0.5rem 0 0.5rem" }}>
        <TableArea />
        <EditArea />
      </Stack>
    </Stack>
  );
}
