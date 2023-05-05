import { bolc__Object } from "../../class/bolc__Object";

/**
 * this method hides the HTML_element with the passed objId. 
 * @param objId is the id for the element to be hidden.
 */
export function bolHide(objId: string) {
    (new bolc__Object(document.getElementById(objId))).visible = false;
}