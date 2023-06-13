import { bolc__Fieldset } from '../../class/bolc__Fieldset';
import { InitForm } from '../../class/initForm';

/**
 * This function takes a fieldset name as a parameter and expands the specified fieldset
 */
export function bolFieldsetExpand(fname: string): void {
  // Create a new instance of bolc__Fieldset with the provided fieldset name and InitForm.bolSettings
  const fieldset = new bolc__Fieldset(InitForm.bolSettings, fname);

  // Check if the fieldset instance exists
  if (!fieldset) return;

  // Call the Expand method of the fieldset instance to expand the fieldset
  fieldset.Expand();
}
