export function bolFieldsetDelete(Button: HTMLButtonElement): void {
  // Extract the fieldset ID from the button's ID
  const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);

  // Get the element with the extracted fieldset ID
  const e = document.getElementById(fs_id);

  // Check if the element exists
  if (!e) return;

  e.parentNode?.removeChild(e);

  //ToDo: Implement bolProject_Clear
  /* try {
    bolProject_Clear(bol_getObjectPage(e).id.substring(4), fs_id);
  } catch (err) {} */
}
