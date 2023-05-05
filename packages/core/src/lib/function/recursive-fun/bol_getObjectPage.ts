/**
 * Given an object, returns the corresponding page div element
 * @param obj The object to find the page for
 * @returns The page div element or an empty string if obj is null
 */
export function bol_getObjectPage(
  obj: HTMLElement | null
): string | HTMLElement {
  // If obj is null, return an empty string
  if (obj == null) return '';

  // If obj is a div with an id starting with "page", return obj
  // If obj is not a div with an id starting with "page", recursively check its parent node
  return obj.tagName == 'DIV' && obj.id.substring(0, 4) == 'page'
    ? obj
    : bol_getObjectPage(obj.parentNode as HTMLElement);
}
