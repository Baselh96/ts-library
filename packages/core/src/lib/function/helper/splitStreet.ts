import { HTMLInputsType } from '../../type/htmlInputsType';
import { getField } from '../other-functions/getField';

/**
 * Splits the combined street value into separate street and house number fields.
 * @param fBoth - Field name for the combined street and house number
 * @param fStreet - Field name for the street
 * @param fNo - Field name for the house number
 */
export function SplitStreet(fBoth: string, fStreet: string, fNo: string) {
  // Get the field elements for the combined street and house number, street, and house number
  const sh = getField(fBoth.trim()) as HTMLInputsType;
  const s = getField(fStreet.trim()) as HTMLInputsType;
  const h = getField(fNo.trim()) as HTMLInputsType;

  // If any of the required fields are not found, return
  if (!sh || !s || !h) return;

  let str = ''; // Variable to store the street value
  let hn = ''; // Variable to store the house number value

  const a = sh.value.split(' '); // Split the combined value into an array by spaces
  for (let i = a.length - 1; i > 0; i--) {
    // Iterate over the array from the end
    if (Number(a[i]) > 0) {
      // If the array element is a number greater than 0, assume it is the house number
      str = a[0];
      for (let j = 1; j < i; j++) str += ' ' + a[j]; // Concatenate the street value
      s.value = str; // Set the street field value

      for (let j = i; j < a.length - 1; j++) hn += a[j] + ' '; // Concatenate the house number value
      hn += a[a.length - 1];
      h.value = hn; // Set the house number field value

      i = 0; // Exit the loop
    }
  }
  (getField(fStreet) as HTMLInputsType).value = str; // Update the street field value
  (getField(fNo) as HTMLInputsType).value = hn; // Update the house number field value
}
