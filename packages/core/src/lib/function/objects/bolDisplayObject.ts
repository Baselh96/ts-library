import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { bolc__Settings } from '../../class/bolc__Settings';

export function bolDisplayObject(bolSettings: bolc__Settings, ename: string, newMode: boolean) {
  const ele = document.getElementById(ename);

  if (ele) new bolc__Object(bolSettings, ele as HTMLInputsType).visible = newMode;
}
