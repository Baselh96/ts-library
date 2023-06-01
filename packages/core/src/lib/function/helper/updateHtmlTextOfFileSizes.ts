/**
 * This will search for the HTML element with id 'bol.FileSizes
 * and its text is changed.
 * @param newValue is the new text for this HTML element.
 */
export function updateHtmlTextOfFileSizes(newValue: string): void {
  //if a field exists to output the total size of uploads => delete content
  const e = document.getElementById('bol.FileSizes');
  if (e) e.innerText = newValue;
}
