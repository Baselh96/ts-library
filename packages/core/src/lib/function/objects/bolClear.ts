import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';

export function bolClear(objId: string) {
  new bolc__Object(document.getElementById(objId) as HTMLInputsType).Clear();
}
