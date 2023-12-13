import BottomBar from "../BottomBar";
import EditArea from "../EditArea";
import TableArea from "../TableArea";
import TableControls from "../TableControls";
import TopBar from "../TopBar";

import Stack from "../../resuable/Stack";

import Direction from "../../../types/Direction.ts";

export default function App() {
  return (
    <Stack direction={Direction.Column}>
      <TopBar />
      <TableControls />

      <Stack direction={Direction.Row} style={{ padding: "0 0.5rem 0 0.5rem" }}>
        <TableArea />
        <EditArea />
      </Stack>
      <BottomBar />
    </Stack>
  );
}
