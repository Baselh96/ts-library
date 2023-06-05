/*----- URL stuff -----------------------------------------------------------------------------*/
export function bolURLParameter(para: string): string {
  let val = '',
    s;
  const paraString = location.href.split('?')[1];
  if (paraString == undefined) return '';
  const paraList = paraString.split('&');
  if (paraList == undefined || paraList.length == 0) return '';
  if (para != undefined && para != '') {
    for (let i = 0; i < paraList.length; i++) {
      s = paraList[i].toLowerCase();
      if (s.indexOf(para.toLowerCase()) >= 0) {
        val = paraList[i].split('=')[1];
        return val;
      }
    }
  }
  return '';
}
