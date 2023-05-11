import { InitForm } from '../../class/initForm';
import { bolHide } from '../objects/bolHide';

/**
 * Sends the form data to the server. If a button ID is provided, it will hide that button before sending the data.
 * @param buttonId Optional button ID to hide before sending the form data
 */
export function bolFormSend(buttonId?: string) {
  // If a button ID is provided and is not an empty string, hide the button before sending the form data
  if (buttonId && buttonId.length !== 0) bolHide(buttonId);

  // Send the form data to the server
  InitForm.bolForm.Send();
}
