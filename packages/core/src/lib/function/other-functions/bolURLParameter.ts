/**
 * Retrieves the value of a URL parameter from the current page URL.
 * @param para - The name of the parameter whose value needs to be retrieved.
 * @returns The value of the specified URL parameter, or an empty string if not found.
 */
export function bolURLParameter(para?: string): string {
  // Get the parameter string from the URL
  const paraString = location.href.split('?')[1];

  // If no parameter string is found, return an empty string
  if (!paraString) {
    return '';
  }

  // Split the parameter string into individual parameters
  const paraList = paraString.split('&');

  // If no parameters or an empty parameter list is found, return an empty string
  if (!paraList || paraList.length === 0) {
    return '';
  }

  // If a parameter name is specified, search for its value in the parameter list
  if (para && para.length !== 0) {
    for (const parameter of paraList) {
      // Check if the current parameter matches the specified parameter name
      if (parameter.toLowerCase().indexOf(para.toLowerCase()) >= 0) {
        // Split the parameter into name-value pair and return the value
        return parameter.split('=')[1];
      }
    }

    // If no matching parameter is found, return an empty string
    return '';
  } else {
    // If no parameter name is specified, return the entire parameter list as a string
    return paraList.toString();
  }
}
