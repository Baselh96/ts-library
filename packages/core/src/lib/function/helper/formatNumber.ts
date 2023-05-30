/**
 * This function formats a number by adding leading zeros to adjust the number of digits.
 * @param value the value to format
 * @param digits the desired number of digits
 * @returns the formatted result
 */
export function formatNumber(value: number, digits: number): string {
  // Convert number to string
  let result = value.toString();

  // Add leading zeroes as long as result is too short
  while (result.length < digits) {
    result = '0' + result;
  }

  return result;
}
