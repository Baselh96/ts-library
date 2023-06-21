import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * Clears the specified object by its ID.
 * @param objId - The ID of the object to be cleared.
 */
export function bolClear(bolSettings: bolc__Settings, objId: string) {
  new bolc__Object(bolSettings, document.getElementById(objId) as HTMLInputsType).Clear();
}
