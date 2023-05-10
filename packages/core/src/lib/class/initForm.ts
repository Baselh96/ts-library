import { bolc__Settings } from './bolc-settings';
import { bolc__Dialog } from './bolc__Dialog';
import { bolc__Form } from './bolc__Form';
import { bolc__Steps } from './bolc__Steps';
import { bolc__Page } from './bolc__Page';

export class InitForm {
  public static bolSettings: bolc__Settings;
  public static bolForm: bolc__Form;
  public static bolPage: bolc__Page;
  public static bolDialog: bolc__Dialog;
  public static bolSteps: bolc__Steps;
  public static bolFormVersion: string;

  public static init(bolBarStyle: boolean) {
    // create a new instance of bolc__Settings
    InitForm.bolSettings = new bolc__Settings();
    // set the bolFormVersion to an empty string
    InitForm.bolFormVersion = '';

    // create a new instance of bol__Page
    InitForm.bolPage = new bolc__Page(InitForm.bolSettings);
    //ToDo: we should enter the variables (numFields, bol__control_names, contoll_names, bol__notInSummary) in the construtor
    // create a new instance of bolc__Form with the bolSettings, bolPage and bolFormVersion as arguments
    InitForm.bolForm = new bolc__Form(
      InitForm.bolSettings,
      InitForm.bolPage,
      InitForm.bolFormVersion,
      0
    );
    //ToDo: The Variable bol__project_strings is missing
    // create a new instance of bolc__Dialog with the bolSettings and an empty array as arguments
    InitForm.bolDialog = new bolc__Dialog(InitForm.bolSettings, []);
    // create a new instance of bolc__Steps with the bolSettings as an argument
    InitForm.bolSteps = new bolc__Steps(InitForm.bolSettings, InitForm.bolPage);

    // call the StyleIt method of bolForm with bolBarStyle as an argument
    InitForm.bolForm.StyleIt(bolBarStyle);

    InitForm.bolPage.goTo(InitForm.bolSettings.page);
  }
}
