import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

/**
 * this method hides the HTML_element with the passed objId.
 * @param objId is the id for the element to be hidden.
 */
export function bolHide(objId: string) {
  const ele = document.getElementById(objId);
  if (ele) new bolc__Object(ele as HTMLInputsType).visible = false;
}
