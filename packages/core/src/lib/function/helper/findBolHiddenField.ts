import { bolc__Settings } from '../../class';
import { bolDebug } from '../public-usage/bolDebug';
import { createBolHiddenField } from './createBolHiddenField';

/**
 * Finds or creates the container element for hidden fields.
 * @returns The found or created container element, or null if no valid container is found.
 */
export function findBolHiddenField(bolSettings: bolc__Settings): HTMLElement | null {
  // Check if the container element for hidden fields exists
  let r = document.getElementById('bolHiddenFields');

  // If the container element doesn't exist, create it and append it to the form
  if (r == undefined) {
    let elist = document.getElementsByName('bolForm');
    if (elist == undefined || elist.length == 0)
      elist = document.getElementsByName('WaimeaForm');
    if (elist == undefined || elist.length == 0) {
      return bolDebug(bolSettings, null, '(bol_HiddenFieldCreate) No valid <form> found!');
    }

    // Create a new container element
    elist[0].appendChild(createBolHiddenField());
    r = document.getElementById('bolHiddenFields');
  }

  return r;
}
