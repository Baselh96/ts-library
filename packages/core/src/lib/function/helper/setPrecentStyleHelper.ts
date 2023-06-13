/**
 * This method is used to modify the bolProgres HTML element.
 * @param element is the bolProgres HTML element
 * @param className are the class names to set
 * @param innerText is the text to set
 */
export function setPrecentStyleHelper(element: HTMLElement, className: string, innerText: string): void {
    element.style.display = '';
    element.className = className;
    element.innerText = innerText;
}