/*
  Find label associated with the passed element via 'for' attribute.
  
  Return != null: Label element
  Return == null: No label found
*/
export function getLabelOfElement(element: HTMLElement): HTMLLabelElement | null {
  const id = element.id;
  const labels = document.getElementsByTagName('label');

  for (let i = 0; i < labels.length; i++)
    if (labels[i].htmlFor == id) return labels[i];

  return null;
}
