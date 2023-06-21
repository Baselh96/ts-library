import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * Adds either a star symbol (*) or a special symbol for required options in a radio button element.
 * @param MyLabel The HTML element to which the icon should be added.
 */
export function HTMLRequiredRadio(bolSettings: bolc__Settings, MyLabel: HTMLElement): void {
  if (bolSettings._useRadioRequired) {
    // If _useRadioRequired is true and _useStar4required is true, add an asterisk (*) to the text of the element
    if (bolSettings._useStar4required) {
      MyLabel.innerText = MyLabel.innerText + ' *';
    } else {
      // If _useRadioRequired is true and _useStar4required is false, add a special symbol for required options
      MyLabel.innerHTML =
        MyLabel.innerHTML +
        '&nbsp;<span class="bol-field-required ' +
        bolSettings.symbol_radiorequired +
        '" title="' +
        bolSettings._ttRadioRequired +
        '" alt="Symbol ' +
        bolSettings._ttRequired +
        '"></span>';
    }
  }
}
