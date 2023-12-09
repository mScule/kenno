export function createError(message: string, options?: {
  internal?: boolean
}) {
  const internal = options?.internal ? " INTERNAL ERROR" : "";
  return new Error(`Error${internal}: ${message}`);
}
