import { bolc__Object } from '../../class';
import { bol_getObjectPage } from '../recursive-fun/bol_getObjectPage';

/**
 * This  function takes a button element as a parameter and performs actions to clear the inputs within a fieldset.
 */
export function bolFieldsetClear(
  Button: HTMLButtonElement,
  bolProject_Clear?: (id: string, fs_id?: string) => void
) {
  // Extract the fieldset ID from the button's ID
  const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);

  // Get the element with the extracted fieldset ID
  const e = document.getElementById(fs_id);

  // Check if the element exists
  if (!e) return;

  // Create a new bolc__Object instance with the element as an HTMLInputElement
  // and call the Clear() method to clear the inputs within the fieldset
  new bolc__Object(e as HTMLInputElement).Clear();

  if (bolProject_Clear)
    bolProject_Clear(
      (bol_getObjectPage(e) as HTMLElement).id.substring(4),
      fs_id
    );
}
