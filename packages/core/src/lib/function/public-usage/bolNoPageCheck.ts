import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * This function sets the PageCheck property of the bolSettings object to true or
 *  false based on the value of the newMode parameter.
 * @param newMode is a boolean
 */
export function bolNoPageCheck(bolSettings: bolc__Settings, newMode?: boolean) {
	bolSettings.PageCheck = (newMode == undefined) ? false: newMode;
}