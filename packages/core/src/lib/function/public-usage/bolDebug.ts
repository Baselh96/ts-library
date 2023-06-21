import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * this method to display the messages on the console
 * @param anyStuff are the data that will be returned
 * @param msg is the message to be displayed on the console
 * @returns is the parameter anyStuff
 */
export function bolDebug(bolSettings: bolc__Settings, anyStuff: any, msg: string): any {
    // Check if debug mode is enabled
    if (bolSettings._modeDebug) {
        // Output debug message to console
        console.log(msg);
    }
    // Return original input
    return anyStuff;
}
