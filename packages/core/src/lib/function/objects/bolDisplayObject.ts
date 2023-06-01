import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

export function bolDisplayObject(ename: string, newMode: boolean) {
  const ele = document.getElementById(ename);

  if (ele) new bolc__Object(ele as HTMLInputsType).visible = newMode;
}
