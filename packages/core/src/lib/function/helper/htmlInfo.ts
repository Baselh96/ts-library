import { InitForm } from '../../class/initForm';

/**
 * Adds either an info link or an info symbol to an HTML element.
 * @param MyLabel The HTML element to which the info link or info symbol should be added.
 */
export function HTMLInfo(MyLabel: HTMLElement, texthelp: string) {
  if (InitForm.bolSettings._useLink4Info) {
    // If _useLink4Info is true, add an info link with the given title and a click event.
    MyLabel.innerHTML =
      MyLabel.innerHTML +
      ' <a title="' +
      InitForm.bolSettings._ttInfo +
      '" onclick="bolDialog.Show(`' +
      InitForm.bolSettings._ttDlgInfoTitle +
      '`, `' +
      texthelp +
      '`)">(i)</a>';
  } else {
    // If _useLink4Info is false, add an info icon with the given title and a click event.
    MyLabel.innerHTML =
      MyLabel.innerHTML +
      '&nbsp;<button type="button" class="bol-field-info ' +
      InitForm.bolSettings.symbol_fieldinfo +
      '" title="' +
      InitForm.bolSettings._ttInfo +
      '" onclick="bolDialog.Show(`' +
      InitForm.bolSettings._ttDlgInfoTitle +
      '`, `' +
      texthelp +
      '`)"></button>';
  }
}
