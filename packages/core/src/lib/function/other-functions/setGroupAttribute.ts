/**
 * Sets an attribute with a boolean value for all elements in a named group.
 * @param groupname The name of the group.
 * @param attr The attribute name.
 * @param val The boolean value to set.
 */
export function setGroupAttribute(
  groupname: string,
  attr: string,
  val: boolean
) {
  const group = document.forms[0].elements.namedItem(groupname);
  
  if (!group) return;
  
  (group as RadioNodeList).forEach((element) => {
    if (element instanceof HTMLInputElement && attr in element) {
        (element as any)[attr] = val;
      }
  });
}
