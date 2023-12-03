/**
 * Iterates through some data one by one.
 */
type GradualIterator<T> = {
    getCurrent: () => T | null,
    getNext: () => void,
}

export default GradualIterator;
