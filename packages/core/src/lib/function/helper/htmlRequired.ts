import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * Adds either a star symbol (*) or a special symbol for required fields to an HTML element.
 * @param MyLabel The HTML element to which the symbol should be added.
 */
export function HTMLRequired(
  bolSettings: bolc__Settings,
  MyLabel: HTMLElement
) {
  if (bolSettings._useStar4required) {
    // If _useStar4required is true, add an asterisk (*) to the text of the element.
    MyLabel.innerText = MyLabel.innerText + ' *';
  } else {
    // If _useStar4required is false, add a special symbol for required fields
    MyLabel.innerHTML =
      MyLabel.innerHTML +
      '&nbsp;<span class="bol-field-required ' +
      bolSettings.symbol_fieldrequired +
      '" title="' +
      bolSettings._ttRequired +
      '" alt="Symbol ' +
      bolSettings._ttRequired +
      '"></span>';
  }
}
