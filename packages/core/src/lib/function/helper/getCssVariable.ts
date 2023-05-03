/**
* dise method checks if there is a css variable with the name 'varName',
 *if there is not, then the passed default value is returned.
 */
export function getCssVariable(varName: string, defaultValue: string): string {
  return (
    window.getComputedStyle(document.body).getPropertyValue(varName) ||
    defaultValue
  );
}
