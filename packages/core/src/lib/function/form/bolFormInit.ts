import { InitForm } from '../../class/initForm';

/**
 * This function exports the initialization of the form using the InitForm class.
 * @param bolBarStyle is a boolean parameter, which is passed to the InitForm.StyleIt() method
 */
export function bolFormInit(bolBarStyle: boolean): void {
  InitForm.init(bolBarStyle);
}
