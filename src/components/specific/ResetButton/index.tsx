import { TbTrash as TrashIcon } from "react-icons/tb";
import Button from "../../resuable/Button";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { reset } from "../../../features/spreadsheet";

export default function ResetButton() {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(reset())}>
      <TrashIcon size="16px" />
    </Button>
  );
}
