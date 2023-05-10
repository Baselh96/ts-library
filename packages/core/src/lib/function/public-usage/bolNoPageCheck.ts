import { InitForm } from "../../class/initForm";

/**
 * This function sets the PageCheck property of the bolSettings object to true or
 *  false based on the value of the newMode parameter.
 * @param newMode is a boolean
 */
export function bolNoPageCheck(newMode?: boolean) {
	InitForm.bolSettings.PageCheck = (newMode == undefined) ? false: newMode;
}