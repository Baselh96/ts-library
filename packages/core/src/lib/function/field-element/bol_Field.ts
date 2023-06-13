/**
 * Searches for an HTML element by its name or ID.
 * @param fname The name or ID of the element.
 * @returns The found HTML element or undefined if no element was found.
 */
export function bol_Field(fname: string | null): any {
  if (!fname) return undefined;

  const element =
    document.getElementById(fname) ||
    document.querySelector(`[name="${fname}"]`);
  return element ? element : undefined;
}
