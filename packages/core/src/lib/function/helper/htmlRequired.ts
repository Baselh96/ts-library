import { InitForm } from '../../class/initForm';

/**
 * Adds either a star symbol (*) or a special symbol for required fields to an HTML element.
 * @param MyLabel The HTML element to which the symbol should be added.
 */
export function HTMLRequired(MyLabel: HTMLElement) {
  if (InitForm.bolSettings._useStar4required) {
    // If _useStar4required is true, add an asterisk (*) to the text of the element.
    MyLabel.innerText = MyLabel.innerText + ' *';
  } else {
    // If _useStar4required is false, add a special symbol for required fields
    MyLabel.innerHTML =
      MyLabel.innerHTML +
      '&nbsp;<span class="bol-field-required ' +
      InitForm.bolSettings.symbol_fieldrequired +
      '" title="' +
      InitForm.bolSettings._ttRequired +
      '" alt="Symbol ' +
      InitForm.bolSettings._ttRequired +
      '"></span>';
  }
}
