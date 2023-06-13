import { InitForm } from "../../class/initForm";

/**
 * This function sets the error mode for the library.
 * @param mode ist the new value of _modeError
 */
export function bolSetErrorMode(mode?: number): void {
  // Set the error mode in the bolSettings object and if mode is undefined, set it to 1
  InitForm.bolSettings._modeError = mode || 1;
}
