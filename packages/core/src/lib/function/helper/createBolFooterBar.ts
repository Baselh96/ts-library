import { bolc__Settings } from '../../class';
import { getBol__logo } from '../../data/bol__logo';


export function createBolFooterBar(bolSettings: bolc__Settings, bolFormVersion: string): void {
  // Create a new div element
  let myRow = document.createElement('div');

  // Set the class and ID of the div
  myRow.className = 'row bol-bar-row';
  myRow.id = 'bolFooterBarLogo';

  // Set the inner HTML of the div to a button and some text
  myRow.innerHTML =
    '<div class="col-4"><button type="button" id="bol__btn_up" class="bi-arrow-up-circle bol-bar-button" onclick="window.scrollTo(0,0);" title="' +
    bolSettings.GetMsgString('btn_up_title') +
    '"></button></div>';

  // If there is a version number, add a div with the version number
  if (bolFormVersion != '') {
    myRow.innerHTML =
      myRow.innerHTML +
      '<div class="col-4 bol-container-center"><span style="font-size: 70%;">v ' +
      bolFormVersion +
      '</span></div>';
  }
  // Otherwise, add a blank div
  else {
    myRow.innerHTML = myRow.innerHTML + '<div class="col-4">&nbsp;</div>';
  }

  // Add a third div with a link to getBol__logo() function
  myRow.innerHTML =
    myRow.innerHTML +
    '<div class="col-4 bol-bar-text">powered by <a href="https://www.bol-systemhaus.de/" target="_blank" rel="nofollow noreferrer">' +
    getBol__logo() +
    '</a></div>';
}
