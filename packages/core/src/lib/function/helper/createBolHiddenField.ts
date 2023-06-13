/**
 * Creates a new container element for hidden fields.
 * @returns The created container element.
 */
export function createBolHiddenField(): HTMLElement {
  // Create a new container element
  const newElement = document.createElement('div');

  // Set the id and display style of the container element
  newElement.id = 'bolHiddenFields';
  newElement.style.display = 'none';

  // Return the created container element
  return newElement;
}
