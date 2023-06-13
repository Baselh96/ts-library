import { InitForm } from '../../class/initForm';

/**
 * Function to restore the previous temporary state of the form
 */
export function bolRestoreTemp(bolProject_RestoreFromTemp?: () => void) {
  // Restore the temporary state of the form
  InitForm.bolForm.RestoreTemp(bolProject_RestoreFromTemp);
}
