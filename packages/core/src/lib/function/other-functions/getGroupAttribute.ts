/**
 * this fucktion retrieves the element with the specified group name 
 * and returns the value of the specified attribute.
 * @param groupname is the group name
 * @param attr is the attribut
 * @returns is the value of the attribut
 */
export function getGroupAttribute(groupname: string, attr: string): string {
  // Retrieve the element with the specified group name.
  const group = document.forms[0].elements.namedItem(
    groupname
  ) as RadioNodeList;

  // Check if the element and the attribute exist.
  // Return the value of the specified attribute.
  // If the element or attribute is not present, return an empty string.
  return group && group[group.length - 1] && attr in group[group.length - 1]
    ? (group[group.length - 1] as any)[attr]
    : '';
}
