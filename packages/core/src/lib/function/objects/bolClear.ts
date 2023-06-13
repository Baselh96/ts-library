import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

/**
 * Clears the specified object by its ID.
 * @param objId - The ID of the object to be cleared.
 */
export function bolClear(objId: string) {
  new bolc__Object(document.getElementById(objId) as HTMLInputsType).Clear();
}
