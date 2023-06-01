import { InitForm } from '../../class/initForm';

/**
 * This function is used to save the current form as a temporary draft.
 */
export function bolFormSave(bolProject_SaveForTemp?: () => void): void {
  // The SaveTemp() function is called on the bolForm object to save the current form as a temporary draft.
  InitForm.bolForm.SaveTemp(bolProject_SaveForTemp);
}