import { bolc__Settings } from './bolc__Settings';
import { bolc__Dialog } from './bolc__Dialog';
import { bolc__Form } from './bolc__Form';
import { bolc__Steps } from './bolc__Steps';
import { bolc__Page } from './bolc__Page';

export class InitForm {
  public bolSettings: bolc__Settings;
  public bolForm: bolc__Form;
  public bolPage: bolc__Page;
  public bolDialog: bolc__Dialog;
  public bolSteps: bolc__Steps;
  public bolFormVersion: string;

  // TODO: ADD doSomethingOnPage and checkPageBeforeLeave and bolProject_Summary as params to constructor
  public constructor(configJson: any, bolBarStyle: boolean) {
    // create a new instance of bolc__Settings
    this.bolSettings = new bolc__Settings(configJson);
    // set the bolFormVersion to an empty string
    this.bolFormVersion = '';
    // create a new instance of bolc__Steps with the bolSettings as an argument
    this.bolSteps = new bolc__Steps(this.bolSettings);
    //ToDo: The Variables bol__page_focus and page_focus are missing
    // create a new instance of bol__Page
    this.bolPage = new bolc__Page(this.bolSettings, this.bolSteps);
    //ToDo: we should enter the variables (numFields, bol__control_names, contoll_names, bol__notInSummary) in the construtor
    // create a new instance of bolc__Form with the bolSettings, bolPage and bolFormVersion as arguments
    this.bolForm = new bolc__Form(
      this.bolSettings,
      this.bolPage,
      this.bolFormVersion,
      0
    );
    //ToDo: The Variable bol__project_strings is missing
    // create a new instance of bolc__Dialog with the bolSettings and an empty array as arguments
    this.bolDialog = new bolc__Dialog(this.bolSettings, []);

    // call the StyleIt method of bolForm with bolBarStyle as an argument
    this.bolForm.StyleIt(bolBarStyle);

    this.bolPage.goTo(this.bolSettings.page);
  }
}
