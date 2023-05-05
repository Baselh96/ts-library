/**
 * this method tries to return the text of the legend-HTML-ELement belonging to the FIELDSET element in which the passed element is.
 * @param obj is an HTML-ELement for which the text of legend-HTML-ELement is returned.
 * @returns is the text of legend-HTML-ELement
 */
export function bol_getFieldsetLegend(obj: any): string {
  //if the obj is undefind or null, return the empty string
  if (!obj) return '';

  if (obj && (obj.type == 'radio' || obj.type == 'radiobutton'))
    obj = document.getElementsByName(obj.name)[0];

  // If obj is a fieldset, get the first legend element within it and return its inner text.
  if (obj.tagName == 'FIELDSET') {
    var lgd = (obj as HTMLElement).querySelector('legend');
    return lgd?.innerText || '';
  } else {
    return bol_getFieldsetLegend(obj.parentNode);
  }
}
