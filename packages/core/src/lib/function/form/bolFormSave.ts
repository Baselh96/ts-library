import { InitForm } from '../../class/initForm';

/**
 * This function is used to save the current form as a temporary draft.
 */
// TODO: Add bolProject_SaveForTemp as argument and pass down
export function bolFormSave(): void {
  // The SaveTemp() function is called on the bolForm object to save the current form as a temporary draft.
  InitForm.bolForm.SaveTemp();
}
