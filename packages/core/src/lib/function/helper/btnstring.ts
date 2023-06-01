import { bolc__Settings } from '../../class';
import { bolFieldsetCheck } from '../fieldset/bolFieldsetCheck';
import { bolFieldsetToggle } from '../fieldset/bolFieldsetToggle';
import { bolFieldsetTogglePart } from '../fieldset/bolFieldsetTogglePart';

/**
 * This method is used to create and configure a button element based on the provided type and name
 * @param btype The type of the button, which determines its configuration
 * @param bname The name to use for the button's ID
 * @returns is the created and configured button
 */
export function btnstring(
  bolSettings: bolc__Settings,
  btype: string,
  bname: string,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
): HTMLButtonElement {
  // Create a new button element
  const btn = document.createElement('button');
  btn.type = 'button';

  // Add the base CSS class to the button
  btn.classList.add('bol-fs-button');

  // Configure the button based on the provided type
  switch (btype) {
    case 'togglepart':
      editButton(
        bolSettings,
        btn,
        bolSettings.symbol_up,
        'down',
        bname,
        'fieldset_btn_togglepart'
      );
      btn.addEventListener('onclick', () =>
        bolFieldsetTogglePart(btn, bolProject_Refresh)
      );
      break;
    case 'bol-fs-down':
    case 'toggleup':
      editButton(
        bolSettings,
        btn,
        bolSettings.symbol_down,
        'up',
        bname,
        'fieldset_btn_toggle'
      );
      btn.addEventListener('onclick', () =>
        bolFieldsetToggle(btn, bolProject_Refresh)
      );
      break;
    case 'bol-fs-erase':
    case 'erase':
      editButton(
        bolSettings,
        btn,
        bolSettings.symbol_erase,
        '',
        bname,
        'fieldset_btn_check'
      );
      btn.addEventListener('onclick', () =>
        bolFieldsetCheck(btn, bolProject_Refresh)
      );
      break;
    case 'bol-fs-check':
    case 'check':
      editButton(
        bolSettings,
        btn,
        bolSettings.symbol_check,
        '',
        bname,
        'fieldset_btn_check'
      );
      btn.addEventListener('onclick', () =>
        bolFieldsetCheck(btn, bolProject_Refresh)
      );
      break;
    case 'bol-fs-toggle':
    case 'toggle':
      editButton(
        bolSettings,
        btn,
        bolSettings.symbol_up,
        'down',
        bname,
        'fieldset_btn_toggle'
      );
      btn.addEventListener('onclick', () =>
        bolFieldsetToggle(btn, bolProject_Refresh)
      );
      break;
  }
  return btn;
}

/**
 * This method is used to modify the properties of a button element
 * @param btn is the button to modify
 * @param bClass is the new CSS class of the button
 * @param value is the value to set for the button
 * @param bName is the name to use for the button's ID
 * @param msgString is the name to use for the button's ID
 */
function editButton(
  bolSettings: bolc__Settings,
  btn: HTMLButtonElement,
  bClass: string,
  value: string,
  bName: string,
  msgString: string
): void {
  // Add the specified CSS class to the button
  btn.classList.add(bClass);

  // Set the ID of the button
  btn.id = 'btnt.' + bName;

  // Set the title attribute of the button using the provided message string
  btn.title = bolSettings.GetMsgString(msgString);

  // Set the value of the button
  btn.value = value;
}
