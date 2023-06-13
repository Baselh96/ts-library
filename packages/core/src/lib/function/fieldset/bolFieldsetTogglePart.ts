import { bolFieldsetToggle } from './bolFieldsetToggle';

export function bolFieldsetTogglePart(
  Button: HTMLButtonElement,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
) {
  bolFieldsetToggle(Button, bolProject_Refresh);
}
