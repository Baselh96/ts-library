import { bol_LabelGet } from './bol_LabelGet';

/**
 * Updates the label of the element with the given name.
 * @param fname The name of the element.
 * @param text The new text of the label.
 */
export function bol_UpdateLabel(fname: string, text: string): void {
  const label = bol_LabelGet(fname);
  if (!label) return;

  const spanIndex = label.innerHTML.indexOf('<span');
  const newLabelHtml =
    spanIndex > 0 ? `${text}${label.innerHTML.substring(spanIndex)}` : text;
  label.innerHTML = newLabelHtml;
}
