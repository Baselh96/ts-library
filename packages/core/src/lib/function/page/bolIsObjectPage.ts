import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { InitForm } from '../../class';

/**
 * Checks if the specified object is on the currently active page.
 * @param oname - The name or ID of the object to be checked.
 * @returns Returns true if the object is on the active page, false otherwise.
 */
export function bolIsObjectPage(initform: InitForm, oname: string) {
  // Attempt to find an element in the document with the specified oname
  const element =
    document.getElementById(oname) || document.getElementsByName(oname)[0];

  // Create a new instance of the bolc__Object class using the found element as an argument
  const bolObject = new bolc__Object(initform.bolSettings, element as HTMLInputsType);

  // Check if the active page number is equal to the pageNo of the bolc__Object instance
  return initform.bolPage.active === bolObject.pageNo;
}
