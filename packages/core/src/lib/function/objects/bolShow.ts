import { bolc__Object } from "../../class/bolc__Object";

/**
 * this method shows the HTML_element with the passed objId. 
 * @param objId is the id for the element to be displayed.
 */
export function bolShow(objId: string) {
    (new bolc__Object(document.getElementById(objId))).visible = true;
}