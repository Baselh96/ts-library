import { bolc__Settings } from '../../class';
import { bolc__Fieldset } from '../../class/bolc__Fieldset';
import { bol_getObjectPage } from '../recursive-fun/bol_getObjectPage';

export function bolFieldsetToggle(
  bolSettings: bolc__Settings,
  Button: HTMLButtonElement,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
) {
  // Extract the fieldset ID from the button's ID
  const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);

  // Create a new instance of bolc__Fieldset with the provided fieldset ID and bolSettings
  const fieldset = new bolc__Fieldset(bolSettings, fs_id);

  // Call the Toggle method of the fieldset instance and pass the button as an argument
  fieldset.Toggle(Button);

  const e = document.getElementById(fs_id + '.inner');

  if (bolProject_Refresh)
    bolProject_Refresh((bol_getObjectPage(e) as HTMLElement).id.substring(4));
}
