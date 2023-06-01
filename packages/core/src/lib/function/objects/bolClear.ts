import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

/**
 * Clears the specified object by its ID.
 * @param objId - The ID of the object to be cleared.
 */
export function bolClear(objId: string) {
  // Find the element in the document with the specified objId
  const ele = document.getElementById(objId);

  // If an element is found, create a new instance of the bolc__Object class and call its Clear method
  if (ele) {
    new bolc__Object(ele as HTMLInputsType).Clear();
  }
}
