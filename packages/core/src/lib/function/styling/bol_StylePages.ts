/**
 * This function is used to style and hide pages in a form
 */
export function bol_StylePages(): void {
  // Select all div elements with id starting with "page"
  document.querySelectorAll('div[id^=page]').forEach((page) => {
    // Apply the "bol-pagestyle" class to the div element
    page.classList.add('bol-pagestyle');
    // Hide the div element by setting the display property to 'none'
    (page as HTMLElement).style.display = 'none';
  });
}
