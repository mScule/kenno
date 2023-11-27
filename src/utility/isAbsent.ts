export default function isAbsent<T>(value: T | undefined | null) {
  if (value === undefined || value === null) {
    return true;
  }
  return false;
}
