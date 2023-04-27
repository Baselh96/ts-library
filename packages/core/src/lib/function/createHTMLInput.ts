import { ConfigString } from '../model/config-string.model';

/**
 * this method creates an HTMLInputElement and returns it.
 * @returns is an HTMLInputElement
 */
export function createHTMLInput(id: string): HTMLInputElement {
  let tempInput = document.createElement('input');
  tempInput.id = id;
  tempInput.className = 'form-control';
  tempInput.type = 'hidden';
  tempInput.value = `[ ${new ConfigString(
    'active_page_number',
    1
  ).toString()}]`;

  return tempInput;
}
