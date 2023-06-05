import { bolc__Dialog } from '../../class';

export function setText2Label(
  labelId: string,
  newText: string,
  bolDialog: bolc__Dialog
) {
  const e = document.getElementById(labelId);
  if (e == undefined) return;
  if (newText == undefined || newText == '') e.style.display = 'none';
  else {
    let s = bolDialog.Project_String(newText);
    if (s == undefined || s == '') s = newText;
    e.innerHTML = s;
    e.style.display = '';
  }
}
