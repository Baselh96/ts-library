import { InitForm } from '../../class/initForm';
import { MsgString } from '../../model/msg-string.model';

/**
 * This function exports the initialization of the form using the InitForm class.
 *
 * Important: If you do not want to enter one of the following parameters,
 * please enter undefind as a wildcard.
 *
 * @param bolBarStyle is a boolean parameter, which is passed to the InitForm.StyleIt() method
 * @param bol__project_strings An array of message strings for the form for (bolc__Dialog => Project_String).
 * @param bol__page_focus An array of page focus configurations (bolc__Page => goTo).
 * @param page_focus An array of page focus configurations (bolc__Page => goTo).
 * @param bol__msg_strings_iso An array of message strings in ISO format (bolc__Settings).
 * @param bol__control_names An array of control names (bolc__Form => Summary).
 * @param contoll_names An array of control names (bolc__Form => Summary).
 * @param numFields The number of fields in the form (bolc__Form => Summary).
 * @param bol__notInSummary An array of fields that should not appear in the form summary(bolc__Form => Summary).
 * @param bolProject_DoSomethingOnPage A function that will be called when a page is switched for (bolc__Page => goTo).
 * @param bolProject_CheckPageBeforeLeave A function that will be called to check if it's allowed to leave the current page for (bolc__Page).
 * @param OnSubmit  A function that will be called when the form is submitted for (bolc__Form => SubmitForm).
 * @param bolProject_Summary  A function that will generate the summary for a specific page (bolc__Form => Summary).
 * @param getNthFieldName A function that returns the field name at the specified index (bolc__Form => Summary).
 * @param bolProject_Refresh A function that will be called to refresh the form (bolc__Fieldset => StyleIt).
 */
export function bolFormInit(
  configJSON: any,
  bolBarStyle: boolean,
  bol__project_strings: MsgString[],
  bol__page_focus?: any[],
  page_focus?: any[],
  bol__msg_strings_iso?: any[],
  bol__control_names?: any[],
  contoll_names?: any[],
  numFields?: number,
  bol__notInSummary?: any[],
  bolProject_DoSomethingOnPage?: (aktivePage: number) => void,
  bolProject_CheckPageBeforeLeave?: (aktivePage: number) => boolean,
  OnSubmit?: (noValidation: boolean) => boolean,
  bolProject_Summary?: (page: number) => string,
  getNthFieldName?: (n: number) => string,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
): void {
  InitForm.init(
    configJSON,
    bolBarStyle,
    bol__project_strings,
    bolProject_DoSomethingOnPage,
    bolProject_CheckPageBeforeLeave,
    OnSubmit,
    bolProject_Summary,
    getNthFieldName,
    bolProject_Refresh,
    bol__page_focus,
    page_focus,
    bol__msg_strings_iso,
    bol__control_names,
    contoll_names,
    numFields,
    bol__notInSummary
  );
}
