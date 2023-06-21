import { bolc__Settings } from '../../class';
import { bolc__Fieldset } from '../../class/bolc__Fieldset';

/**
 * This function takes a fieldset name as a parameter and expands the specified fieldset
 */
export function bolFieldsetExpand(bolSettings: bolc__Settings, fname: string): void {
  // Create a new instance of bolc__Fieldset with the provided fieldset name and bolSettings
  const fieldset = new bolc__Fieldset(bolSettings, fname);

  // Check if the fieldset instance exists
  if (!fieldset) return;

  // Call the Expand method of the fieldset instance to expand the fieldset
  fieldset.Expand();
}
