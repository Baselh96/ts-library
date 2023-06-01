import { InitForm } from '../../class/initForm';

/**
 * Adds either a star symbol (*) or a special symbol for required options in a radio button element.
 * @param MyLabel The HTML element to which the icon should be added.
 */
export function HTMLRequiredRadio(MyLabel: HTMLElement): void {
  if (InitForm.bolSettings._useRadioRequired) {
    // If _useRadioRequired is true and _useStar4required is true, add an asterisk (*) to the text of the element
    if (InitForm.bolSettings._useStar4required) {
      MyLabel.innerText = MyLabel.innerText + ' *';
    } else {
      // If _useRadioRequired is true and _useStar4required is false, add a special symbol for required options
      MyLabel.innerHTML =
        MyLabel.innerHTML +
        '&nbsp;<span class="bol-field-required ' +
        InitForm.bolSettings.symbol_radiorequired +
        '" title="' +
        InitForm.bolSettings._ttRadioRequired +
        '" alt="Symbol ' +
        InitForm.bolSettings._ttRequired +
        '"></span>';
    }
  }
}
