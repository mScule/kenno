import { createError } from "../error";

export default function set<S>(key: string, state: S) {
  try {
    const encoded = btoa(JSON.stringify(state));
    const url = new URL(window.location.href);

    url.searchParams.set(key, encoded);

    window.history.replaceState(null, "", url.toString());
  } catch (error) {
    console.warn(createError("Persisted URL state creation failed"), error);
  }
}
