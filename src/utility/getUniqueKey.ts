/**
 * Creates key that's "unique". Meant to be used in cases when react component
 * should be rerendered every time it's refreshed.
 */

export default function getUniqueKey() {
  return new Date().getTime() + "";
}
