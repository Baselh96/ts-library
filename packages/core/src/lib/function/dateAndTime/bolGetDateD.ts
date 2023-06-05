export function bolGetDateD(objD?: Date) {
  let s = '',
    d;
  if (objD == undefined) d = new Date();
  else d = objD;
  if (d.getDate() < 10) s = '0' + d.getDate() + '.';
  else s = d.getDate() + '.';
  if (d.getMonth() < 10) s = s + '0' + (d.getMonth() + 1) + '.';
  else s = s + (d.getMonth() + 1) + '.';
  s = s + d.getFullYear();
  return s;
}
