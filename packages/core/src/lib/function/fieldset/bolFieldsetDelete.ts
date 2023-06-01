import { bol_getObjectPage } from '../recursive-fun/bol_getObjectPage';

export function bolFieldsetDelete(
  Button: HTMLButtonElement,
  bolProject_Clear?: (id: string, fs_id?: string) => void
): void {
  // Extract the fieldset ID from the button's ID
  const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);

  // Get the element with the extracted fieldset ID
  const e = document.getElementById(fs_id);

  // Check if the element exists
  if (!e) return;

  e.parentNode?.removeChild(e);

  if (bolProject_Clear)
    bolProject_Clear(
      (bol_getObjectPage(e) as HTMLElement).id.substring(4),
      fs_id
    );
}
