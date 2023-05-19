import { bolc__Settings } from '../../class';

/**
 * this function generates an HTML string for an information 
 * button based on the provided helpMsg and bolSettings.
 * @param helpMsg is the help message
 * @param bolSettings is a object of class bolc__Settings
 * @returns is the generated HTML sting
 */
export function bol_MakeInfoButton(
  helpMsg: string,
  bolSettings: bolc__Settings
) {
  const { _useLink4Info, _ttInfo, _ttDlgInfoTitle, symbol_fieldinfo } =
    bolSettings;

  if (_useLink4Info) {
    // Generate HTML string with link using template literals
    return `&nbsp;<a title="${_ttInfo}" onclick="bolDialog.Show('${_ttDlgInfoTitle}', '${helpMsg}')">(i)</a>`;
  } else {
    // Generate HTML string with button using template literals
    return `&nbsp;<button type="button" class="bol-field-info ${symbol_fieldinfo}" title="${_ttInfo}" onclick="bolDialog.Show('${_ttDlgInfoTitle}', '${helpMsg}')"></button>`;
  }
}
