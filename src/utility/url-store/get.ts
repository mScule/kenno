import { createError } from "../error";

/**
 * @param key Query parameter key that is used for the persisted state
 */
export default function get<S>(key: string): S | null {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get(key);

  if (encoded) {
    try {
      const decoded = JSON.parse(atob(encoded));
      return decoded as S;
    } catch (error) {
      console.warn(createError("Persisted URL state is corrupted"), error);
    }
  }

  return null;
}
