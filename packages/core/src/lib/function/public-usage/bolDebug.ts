import { InitForm } from "../../class/initForm";

/**
 * this method to display the messages on the console
 * @param anyStuff are the data that will be returned
 * @param msg is the message to be displayed on the console
 * @returns is the parameter anyStuff
 */
export function bolDebug(anyStuff: any, msg: string): any {
    // Check if debug mode is enabled
    if (InitForm.bolSettings._modeDebug) {
        // Output debug message to console
        console.log(msg);
    }
    // Return original input
    return anyStuff;
}
