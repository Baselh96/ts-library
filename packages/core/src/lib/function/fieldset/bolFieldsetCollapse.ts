import { bolc__Fieldset } from '../../class/bolc__Fieldset';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * This function takes a fieldset name as a parameter and collapses the specified fieldset
 */
export function bolFieldsetCollapse(bolSettings: bolc__Settings, fname: string): void {
  // Create a new instance of bolc__Fieldset with the provided fieldset name and InitForm.bolSettings
  const fieldset = new bolc__Fieldset(bolSettings, fname);

  // Check if the fieldset instance exists
  if (!fieldset) return;

  // Call the Collapse method of the fieldset instance to collapse the fieldset
  fieldset.Collapse();
}
