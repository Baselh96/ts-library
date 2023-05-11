import { InitForm } from '../../class/initForm';

/**
 * Function to restore the previous temporary state of the form
 */
export function bolRestoreTemp() {
  // Restore the temporary state of the form
  InitForm.bolForm.RestoreTemp();
}
