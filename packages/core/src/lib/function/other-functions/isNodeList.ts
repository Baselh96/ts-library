/**
 * The function checks if a passed element is a NodeList
 * @param element
 * @returns
 */
export function isNodeList(element: any): boolean {
  // Use Object.prototype.toString.call() to get the internal class name of the element
  const elementType = Object.prototype.toString.call(element);

  // Check if the class name refers to an HTMLCollection, NodeList, RadioNodeList or Array
  return (
    elementType === '[object HTMLCollection]' ||
    elementType === '[object NodeList]' ||
    elementType === '[object RadioNodeList]' ||
    elementType === '[object Array]'
  );
}
