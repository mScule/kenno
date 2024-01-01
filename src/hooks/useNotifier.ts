import { useContext } from "react";
import { NotifierContext } from "../contexts/NotifierProvider";

export default function useNotifier() {
    const { notify } = useContext(NotifierContext);
    return notify;
}
