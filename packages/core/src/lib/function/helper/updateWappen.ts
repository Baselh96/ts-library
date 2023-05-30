  /**
   * This methode updates the html element with id wappen, if it exists
   */
  export function updateWappen(): void {
    // get the element with ID 'WAPPEN'
    const e = document.getElementById('WAPPEN');

    // if the element exists
    if (e) {
      // set the element's class to 'bol-emblem'
      e.setAttribute('class', 'bol-emblem');

      // remove any inline styles applied to the element
      e.removeAttribute('style');

      // remove any width and height attributes from the element
      e.removeAttribute('width');
      e.removeAttribute('height');

      // if the element's source attribute is set to 'xxxWAPPENxxx'
      if (e.getAttribute('src') == 'xxxWAPPENxxx') {
        // set the source attribute to 'logo-ozg.jpg'
        e.setAttribute('src', 'logo-ozg.jpg');
      }
    }
  }