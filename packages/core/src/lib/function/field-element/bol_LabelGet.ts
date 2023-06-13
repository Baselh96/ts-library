/**
 * Returns the HTML element according to the passed name.
 * @param fname The name or ID of the HTML element.
 * @returns The found HTML element or undefined if no HTML element was found.
 */
export function bol_LabelGet(fname: string): HTMLElement | undefined {
  if (fname.length === 0) return undefined;

  const element = document.querySelector(`label[for="${fname}"]`) as HTMLElement;

  return element ? element : undefined;
}
