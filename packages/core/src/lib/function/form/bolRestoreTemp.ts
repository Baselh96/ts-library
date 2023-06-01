import { InitForm } from '../../class/initForm';

/**
 * Function to restore the previous temporary state of the form
 */
// TODO: Here we can just add bolProject_RestoreFromTemp as param
export function bolRestoreTemp() {
  // Restore the temporary state of the form
  InitForm.bolForm.RestoreTemp();
}
