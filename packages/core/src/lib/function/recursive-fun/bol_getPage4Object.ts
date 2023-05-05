import { bol_getObjectPage } from './bol_getObjectPage';

/**
 * this method searches for its page element based on the passed name
 * and returns the first four number which are in the id
 * @param oname is the name of the object to search for
 * @returns is first 4 numbers from the id
 */
export function bol_getPage4Object(oname: string): number {
  //to get the page-html-element
  let p = bol_getObjectPage(document.getElementById(oname));

  //When we have the page, we take the first 4 letters and we return it
  return p || p === '' || typeof p === 'string'
    ? 0
    : parseInt((p as HTMLElement).id.substring(4));
}
