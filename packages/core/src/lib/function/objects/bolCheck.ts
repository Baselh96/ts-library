import { bolc__Dialog } from '../../class';
import { bol_BlockCheck } from '../helper/bol_BlockCheck';
import { bolc__Settings } from '../../class/bolc__Settings';

export function bolCheck(
  bolSettings: bolc__Settings,
  bolDialog: bolc__Dialog,
  objId: string
) {
  return bol_BlockCheck(bolSettings, bolDialog, objId);
}
