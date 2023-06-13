/**
* This method looks at what HTMLELement the element passed as parameter is.
 * and returns the name of the element as a string.
 * @param e is a HTMLElement
 * @returns name of the htmlElement
 */
export function bol_GetObjectType(
  e?: HTMLElement | null
): string | undefined | null {
  if (!e) return undefined;
  switch (e.tagName.toLowerCase()) {
    case 'div':
      return 'container';
    case 'input':
      return (e as HTMLInputElement).type.toLowerCase();
    case 'select-one':
    case 'select':
      return 'select';
    case 'textarea':
      return 'textarea';
    case 'fieldset':
      return 'fieldset';
    default:
      return null;
  }
}
