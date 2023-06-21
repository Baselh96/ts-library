import { bolc__Settings } from '../../class';
import { bolFieldsetToggle } from './bolFieldsetToggle';

export function bolFieldsetTogglePart(
  bolSettings: bolc__Settings,
  Button: HTMLButtonElement,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
) {
  bolFieldsetToggle(bolSettings, Button, bolProject_Refresh);
}
