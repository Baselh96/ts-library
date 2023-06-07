import { bolClear } from './bolClear';
import { bolHide } from './bolHide';
import { bolShow } from './bolShow';
import { getField } from '../other-functions/getField';

export function bolHideClear(
  oname1: string,
  oname2?: string,
  val2Show?: string
) {
  if (oname2 == undefined) {
    bolHide(oname1);
    bolClear(oname1);
    return;
  }
  let e: any = document.getElementById(oname1);
  if (e == undefined) {
    e = getField(oname1);
    if (e == undefined) return;
  } else {
    if (
      (e.tagName.toLowerCase() == 'div' ||
        e.tagName.toLowerCase() == 'fieldset') &&
      oname2 == undefined
    ) {
      bolHide(oname1);
      bolClear(oname1);
      return;
    }
  }
  if (e.type == 'checkbox') {
    if (e.checked) {
      if (val2Show == undefined) bolShow(oname2);
      else {
        bolHide(oname2);
        bolClear(oname2);
      }
    } else {
      if (val2Show == undefined) {
        bolHide(oname2);
        bolClear(oname2);
      } else bolShow(oname2);
    }
  } else {
    if (val2Show == undefined) return;
    if (e.value.toLowerCase() == val2Show.toLowerCase()) bolShow(oname2);
    else {
      bolHide(oname2);
      bolClear(oname2);
    }
  }
}
