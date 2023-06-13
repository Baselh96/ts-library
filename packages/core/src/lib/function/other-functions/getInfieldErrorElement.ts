/*
  Find corresponding infield error element
*/
export function getInfieldErrorElement(element: HTMLElement) {
	const id = element.id + '-infield-error';
	return document.getElementById(id);
}