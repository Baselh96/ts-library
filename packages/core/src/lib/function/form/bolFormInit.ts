import { InitForm } from '../../class/initForm';

/**
 * This function exports the initialization of the form using the InitForm class.
 * @param bolBarStyle is a boolean parameter, which is passed to the InitForm.StyleIt() method
 */
export function bolFormInit(configJson: any, bolBarStyle = false): InitForm {
  return new InitForm(configJson, bolBarStyle);
}
