import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * This function is used to turn on/off the debug mode of the application. 
 * @param newValue is a boolean
 */
export function bolDebugOn(bolSettings: bolc__Settings, newValue?: boolean): void {
    // If newValue parameter is not provided, turn on debug mode by default
	bolSettings._modeDebug = (newValue == undefined) ? true : newValue;
}