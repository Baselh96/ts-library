import { bolc__Settings } from '../../class';
import { bol_MakeInfoButton } from '../styling';

/**
 * Adds either an info link or an info symbol to an HTML element.
 * @param MyLabel The HTML element to which the info link or info symbol should be added.
 */
export function HTMLInfo(bolSettings: bolc__Settings, MyLabel: HTMLElement, texthelp: string) {
  if (bolSettings._useLink4Info) {
    // If _useLink4Info is true, add an info link with the given title and a click event.
    
    MyLabel.innerHTML =
      MyLabel.innerHTML + bol_MakeInfoButton(bolSettings, texthelp);    
  } else {
    // If _useLink4Info is false, add an info icon with the given title and a click event.

    MyLabel.innerHTML =
      MyLabel.innerHTML + bol_MakeInfoButton(bolSettings, texthelp);
  }
}
