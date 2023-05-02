import { bol_Field } from './bol_Field';

/**
 * this method returns the value of the HTMLElement specified by the passed name
 * @param fname The name or ID of the element.
 * @returns is the return value from the bol_Field function.
 */
export function bol_FieldValue(fname: string): any {
  return bol_Field(fname).value;
}
