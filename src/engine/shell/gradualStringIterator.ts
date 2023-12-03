import GradualIterator from "../../types/GradualIterator";

export default function gradualStringIterator(
  input: string
): GradualIterator<string> {
  let index = 0;
  let char: string | null = null;

  function getCurrent() {
    return char;
  }

  function getNext() {
    char = null;

    if (index < input.length) {
      char = input[index];
      index++;
    }
  }

  getNext();

  return { getCurrent, getNext };
}
