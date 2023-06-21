import { bolc__Settings } from '../../class';
import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

/**
 * this method shows the HTML_element with the passed objId.
 * @param objId is the id for the element to be displayed.
 */
export function bolShow(bolSettings: bolc__Settings, objId: string) {
  const ele = document.getElementById(objId);
  if (ele) new bolc__Object(bolSettings, ele as HTMLInputsType).visible = true;
}
