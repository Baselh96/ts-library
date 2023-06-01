import { bolc__Settings } from './bolc__Settings';
import { bolc__Dialog } from './bolc__Dialog';
import { bolc__Form } from './bolc__Form';
import { bolc__Steps } from './bolc__Steps';
import { bolc__Page } from './bolc__Page';
import { bol_StylePages } from '../function/styling/bol_StylePages';
import { bol_StyleFieldsets } from '../function/styling/bol_StyleFieldsets';
import { bol_StyleFields } from '../function/styling/bol_StyleFields';
import { bolc__BSK } from './bolc__BSK';
import { MsgString } from '../model/msg-string.model';

export class InitForm {
  public static bolSettings: bolc__Settings;
  public static bolForm: bolc__Form;
  public static bolPage: bolc__Page;
  public static bolDialog: bolc__Dialog;
  public static bolSteps: bolc__Steps;
  public static bolBSK: bolc__BSK;
  public static bolFormVersion: string;

  /**
   * The init function initializes various components and settings for the form
   */
  public static init(
    bolBarStyle: boolean,
    bol__project_strings: MsgString[],
    bolProject_DoSomethingOnPage?: (aktivePage: number) => void,
    bolProject_CheckPageBeforeLeave?: (aktivePage: number) => boolean,
    OnSubmit?: (noValidation: boolean) => boolean,
    bolProject_Summary?: (page: number) => string,
    getNthFieldName?: (n: number) => string,
    bolProject_Refresh?: (id: string, fs_id?: string) => void,
    bol__page_focus?: any[],
    page_focus?: any[],
    bol__msg_strings_iso?: any[],
    bol__control_names?: any[],
    contoll_names?: any[],
    numFields?: number,
    bol__notInSummary?: any[]
  ) {
    // Create a new instance of bolc__Settings with the specified arguments
    InitForm.bolSettings = new bolc__Settings(
      bol__msg_strings_iso,
      bol__control_names,
      contoll_names
    );

    // set the bolFormVersion to an empty string
    InitForm.bolFormVersion = '';

    // Create a new instance of bolc__Page with the specified arguments
    InitForm.bolPage = new bolc__Page(
      InitForm.bolSettings,
      bolProject_DoSomethingOnPage,
      bolProject_CheckPageBeforeLeave,
      bol__page_focus,
      page_focus
    );

    // Create a new instance of bolc__Form with the specified arguments
    InitForm.bolForm = new bolc__Form(
      InitForm.bolSettings,
      InitForm.bolPage,
      InitForm.bolFormVersion,
      OnSubmit,
      bolProject_Summary,
      getNthFieldName,
      numFields,
      bol__control_names,
      contoll_names,
      bol__notInSummary
    );

    // Create a new instance of bolc__Form with the specified arguments
    InitForm.bolDialog = new bolc__Dialog(
      InitForm.bolSettings,
      bol__project_strings
    );

    // Create a new instance of bolc__Steps with the bolSettings and bolPage as arguments
    InitForm.bolSteps = new bolc__Steps(InitForm.bolSettings, InitForm.bolPage);

    // Call the StyleIt method of bolForm with bolBarStyle as an argument
    InitForm.bolForm.StyleIt(bolBarStyle);

    // Call the bol_StylePages function
    bol_StylePages();

    // Call the bol_StyleFieldsets function with the bolProject_Refresh function as an argument
    bol_StyleFieldsets(undefined, bolProject_Refresh);

    // Call the bol_StyleFields function
    bol_StyleFields();

    // Go to the specified page using the goTo method of bolPage
    InitForm.bolPage.goTo(InitForm.bolSettings.page);
  }
}
