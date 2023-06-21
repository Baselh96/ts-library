import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * this method hides the HTML_element with the passed objId.
 * @param objId is the id for the element to be hidden.
 */
export function bolHide(bolSettings: bolc__Settings, objId: string) {
  const ele = document.getElementById(objId);
  if (ele) new bolc__Object(bolSettings, ele as HTMLInputsType).visible = false;
}
