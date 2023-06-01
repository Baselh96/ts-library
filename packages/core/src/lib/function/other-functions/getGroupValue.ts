import { getField } from './getField';

/**
 * The function takes a groupname parameter of type string
 * and returns the value of the selected element of a group of fields.
 * @param groupname
 * @returns
 */
export function getGroupValue(groupname: string) {
  const group: any = getField(groupname); // Get the field with the group name

  if (!group) return ''; // If the field doesn't exist, return an empty string instead of 'Off'

  for (let n = 0; n < group.length; n++) {
    // Check if an element of the group is selected
    if (group[n] && group[n].checked) {
      return group[n].value; // Return the value of the selected element
    }
  }

  return ''; // If no element is selected, return an empty string
}
