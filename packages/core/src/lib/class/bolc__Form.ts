import { bolDebug, bol_GetFieldTitle } from '../function';
import { createBolFooterBar } from '../function/helper/createBolFooterBar';
import { FieldNotInSummary } from '../function/helper/fieldNotInSummary';
import { generatePdfDisplayUrl } from '../function/helper/generatePdfDisplayUrl';
import { updateWappen } from '../function/helper/updateWappen';
import { bolHide } from '../function/objects/bolHide';
import { bolShow } from '../function/objects/bolShow';
import { bol_getFieldsetLegend } from '../function/recursive-fun/bol_getFieldsetLegend';
import { bol_getPage4Object } from '../function/recursive-fun/bol_getPage4Object';

export class bolc__Form {
  private _obj: HTMLFormElement | undefined;
  private _Kundenname: string = '';
  private _Kundenstrasse: string = '';
  private _KundenPLZ: string = '';
  private _Kundenort: string = '';
  private _KundenPerson: string = '';
  private _Kundentelefon: string = '';
  private _Kundenmail: string = '';
  private _Impressum_Link: string = '';
  private _Kontakt_Link: string = '';
  private _DSGVO_Link: string = '';
  private _SidebarText: string = '';
  private _PageCheck: any[] = []; //ToDo: we should change the datatype
  private numFields: number;

  constructor(
    numFields: number,
    public bol__control_names?: any[],
    public contoll_names?: any[],
    public bol__notInSummary?: any[]
  ) {
    this.numFields = numFields;
    // Get the form element with the name "bolForm"
    this._obj = document.getElementsByName('bolForm')[0] as HTMLFormElement;

    // If the form element was not found with the name "bolForm", try to find it with the name "WaimeaForm"
    if (this._obj == undefined) {
      this._obj = document.getElementsByName(
        'WaimeaForm'
      )[0] as HTMLFormElement;
    }

    // If the form element was still not found, return a debugging message indicating that no form element was found
    if (this._obj == undefined) {
      return bolDebug(false, '(bolc__Form) no form element!');
    }
  }

  /**
   * this method return a value of input with id 'Form.FormPublish#2.LocalSaveURL#4' or a empty string
   */
  get valueTemp() {
    let e = document.getElementById(
      'Form.FormPublish#2.LocalSaveURL#4'
    ) as HTMLInputElement;
    return e
      ? e.value.trim()
      : bolDebug('', '(bolc__Form) no valueTemp element');
  }

  /**
   * this method return a value of input with id 'Form.FormPublish#2.TargetURL#2' or a empty string
   */
  get valueTarget(): string {
    let e = document.getElementById(
      'Form.FormPublish#2.TargetURL#2'
    ) as HTMLInputElement;
    return e
      ? e.value.trim()
      : bolDebug('', '(bolc__Form) no valueTemp element');
  }

  /**
   * this. method fills a PDF form and displays it in a new tab
   */
  public PDFfilled(): void {
    // Ensure the form element exists
    if (!this._obj) {
      console.error('Form element not found.');
      return;
    }

    // Set the form's target to a new tab
    this._obj.target = '_blank';

    // Store the form's action
    const tempAction = this._obj.action;

    // Set the form's action to the PDF display URL
    this._obj.action = generatePdfDisplayUrl(this.valueTarget);

    // Submit the form
    this._obj.submit();

    // Reset the form's target and action
    this._obj.target = '_self';
    this._obj.action = tempAction;
  }

  /**
   * This method resets the input html element with the id 'act_form_saved'.
   */
  public RestoreTemp(): void {
    // Find the input element with id "act_form_saved"
    let e = document.getElementById('act_form_saved') as HTMLInputElement;

    // If the element exists and has a value
    if (e && e.value !== '') {
      // Try to restore the project data from temporary storage
      try {
        //TODO: implement this function
        bolProject_RestoreFromTemp();
      } catch (err) {
        // If an error occurs while restoring data, ignore it and proceed
      }

      // Clear the value of the "act_form_saved" input element
      e.value = '';
    }
  }

  /**
   * This method calls the bolProject_SaveForTemp function to save the data temporarily,
   * before submitting the form
   * @returns is the boolean value for the success or failure of saving
   */
  public SaveTemp(): boolean {
    // Check if there is a value for valueTemp, if not return false
    if (this.valueTemp === '') return false;

    // Clear the timestamp for saving
    window.bolSettings.TimeStampSave = '';

    // Try to save the project for temporary storage
    try {
      //TODO: implement this function
      bolProject_SaveForTemp();
    } catch (err) {}

    // Check the value of TempMode
    switch (window.bolSettings.TempMode) {
      // If TempMode is 2, do nothing
      case 2:
        break;
      // If TempMode is 1 or anything else, submit the form with valueTemp as the target
      case 1:
      default:
        this.SubmitForm(this.valueTemp, true);
        break;
    }

    // Return true to indicate that the function was successful
    return true;
  }

  /**
   * This method sends the form and before sending it changes the format of the value of the form.
   * @returns is the boolean value that tells whether the form was sent or not
   */
  public Send(): boolean {
    let targetURL = this.valueTarget;

    // If the target URL is empty, return false
    if (targetURL == '') return false;

    // Reset the time stamp for saving
    window.bolSettings.TimeStampSend = '';

    // call save-function to save the form
    window.bolSettings.Save();

    // Check if the form mode is set to JSON
    if (window.bolSettings._modeJSON4Send) {
      // If it is, convert the config JSON to a string and update the field value
      //TODO: implement this function
      getField(window.bolSettings.FieldNameConfigJSON).value = JSON.stringify(
        getField(window.bolSettings.FieldNameConfigJSON).value
      );
    }

    // Submit the form to the target URL with no validation
    this.SubmitForm(targetURL, true);

    // Return true to indicate the form was sent
    return true;
  }

  /**
   * Submits the form to the specified URL
   * @param url - The URL to submit the form to
   * @param noValidation - A flag indicating whether to skip form validation
   */
  public SubmitForm(url: string, noValidation: boolean): boolean {
    // Store the current form action for later
    const currentAction = this._obj?.action;

    // Call the global onsubmit event handler if it exists, and return if it returns false
    //TODO: implement this function
    if (window.onsubmit && !OnSubmit(noValidation)) {
      return false;
    }

    if (this._obj) {
      // Set the form's action to the specified URL
      this._obj.action = url;

      // Submit the form
      this._obj.submit();

      // Reset the form's target to its original action
      this._obj.target = currentAction || '';
    }
    return true;
  }

  /**
   * this methode is for update the html element wappen
   * and create the footer of page
   */
  public StyleIt(Mode?: any): boolean | undefined {
    if (this._obj == undefined) return false;

    //update Wappen, if exists
    updateWappen();

    // bol Logo Bar anzeigen?
    if (Mode != undefined) return;

    //To create the footer
    createBolFooterBar();
  }

  /**
   * This method is used to fill variables by their ElementId
   */
  public GetSidebarValues(): void {
    this._Kundenname = this.getHTMLELementById('Kundenname');
    this._Kundenstrasse = this.getHTMLELementById('Kundenstrasse');
    this._KundenPLZ = this.getHTMLELementById('KundenPLZ');
    this._Kundenort = this.getHTMLELementById('Kundenort');
    this._Kundentelefon = this.getHTMLELementById('Kundentelefon');
    this._Kundenmail = this.getHTMLELementById('Kundenmail');
    this._Impressum_Link = this.getHTMLELementById('Impressum_Link');
    this._Kontakt_Link = this.getHTMLELementById('Kontakt_Link');
    this._DSGVO_Link = this.getHTMLELementById('DSGVO_Link');
    this._SidebarText = this.getHTMLELementById('SidebarText');
  }

  /**
   * this method searches for an HTML-ELement and returns the value of the element
   * @param id is the id of searched element
   * @returns if the input element is given and the value is not empty
   */
  private getHTMLELementById(id: string): string {
    const ele = document.getElementById(id) as HTMLInputElement;
    return ele && ele.value != '' ? ele.value.trim() : '';
  }

  private getBolSummaryContainerElement() {}

  /**
   * This method is used to create sidebar.
   * @param DontLoadFields this paramter decides whether the attributes of the object are filled or not.
   * If it is ture, then the variable will not be updated.
   */
  public CreateSideBar(DontLoadFields: boolean): void {
    if (!DontLoadFields) this.GetSidebarValues();
    //To create the string for sidebar
    const htmlString = this.createHTMLStringForbolSideBar();

    // Retrieve the element with the ID "bolSideBar" or "adresse_rechts"
    let ele = document.getElementById('bolSideBar');
    if (ele == undefined) {
      ele = document.getElementById('adresse_rechts');
      if (ele == undefined) {
        return; // Neither element was found, return
      }
    }

    // If the string variable "htmlString" is not empty, create the HTML code for the sidebar and insert it into the "ele" element's innerHTML
    if (htmlString != '') {
      ele.innerHTML =
        '<div class="col"><span class="bol-h2">' +
        window.bolSettings.GetMsgString('txt_sidebar_questions') +
        '</span><br><br>' +
        htmlString +
        '</div>';
      bolShow('bolSideBar');
    } else {
      // If "htmlString" is empty, remove any existing content from "ele"
      ele.innerHTML = '';

      // Hide the "bolSideBar" element
      bolHide('bolSideBar');
    }
  }

  /**
   * This methode is for creating the string for sidebar
   * @returns is the html-Sting for sidebar
   */
  private createHTMLStringForbolSideBar(): string {
    let htmlstring = '';
    // check if there is text to add to the sidebar
    if (this._SidebarText !== '') {
      // add the text to the sidebar string
      htmlstring +=
        '<span style="font-size: 0.8em;">' +
        this._SidebarText +
        '</span><br><br>';
    }

    // check if there is a customer name to add to the sidebar
    if (this._Kundenname != '') {
      // add the customer name to the sidebar string
      htmlstring = '<b>' + this._Kundenname + '</b>';
    }

    // check if there is a customer street address to add to the sidebar
    if (this._Kundenstrasse != '') {
      // add the customer street address to the sidebar string
      htmlstring += '<br>' + this._Kundenstrasse;
    }

    // check if there is a customer postal code and city to add to the sidebar
    if (!this._KundenPLZ || this._KundenPLZ == '') {
      if (this._Kundenort != '') {
        // add the customer city to the sidebar string
        htmlstring += '<br>' + this._Kundenort + '<br>';
      }
    } else {
      if (this._Kundenort != '') {
        // add the customer postal code and city to the sidebar string
        htmlstring += '<br>' + this._KundenPLZ + ' ' + this._Kundenort + '<br>';
      }
    }

    // check if there is a customer phone number to add to the sidebar
    if (this._Kundentelefon != '') {
      // add the customer phone number to the sidebar string
      htmlstring +=
        '<br><span class="bi-telephone bol-sidebar-link" ></span>&nbsp;<span style="font-size: 0.8em;">' +
        this._Kundentelefon +
        '</span>';
    }

    // check if there is a customer email to add to the sidebar
    if (this._Kundenmail != '') {
      // add the customer email to the sidebar string
      htmlstring +=
        '<br><span class="bi-mailbox bol-sidebar-link"></span>&nbsp;<span style="font-size: 0.8em;">' +
        this._Kundenmail +
        '</span>';
    }

    // check if there is an Impressum link to add to the sidebar
    if (this._Impressum_Link != '') {
      // add the Impressum link to the sidebar string
      htmlstring +=
        '<br><br><a href="' +
        this._Impressum_Link +
        '" target="_blank" class="bol-sidebar-link">' +
        window.bolSettings.GetMsgString('txt_impress_link') +
        '</a>';
    }

    // check if there is a Kontakt link to add to the sidebar
    if (this._Kontakt_Link != '') {
      // add the Kontakt link to the sidebar string
      htmlstring +=
        '<br><br><a href="' +
        this._Kontakt_Link +
        '" target="_blank" class="bol-sidebar-link">' +
        window.bolSettings.GetMsgString('txt_kontakt_link') +
        '</a>';
    }

    // check if there is a DSGVO link to add to the sidebar
    if (this._DSGVO_Link != '') {
      // add the DSGVO link to the sidebar string
      htmlstring +=
        '<br><br><a href="' +
        this._DSGVO_Link +
        '" target="_blank" class="bol-sidebar-link">' +
        window.bolSettings.GetMsgString('txt_dsgvo_link') +
        '</a>';
    }

    return htmlstring;
  }

  /**
   *this methode creates the Summary-Page.
   * @returns ture, if the page is succesfully created.
   */
  Summary(): boolean | undefined {
    // Get the summary container element
    // If the container is not found, try finding it in the "control_page" element
    let cntOutput: HTMLElement | null =
      document.getElementById('bolSummaryContainer') ||
      document.getElementById('control_page');

    // If the container is still not found, log an error and return
    if (!cntOutput)
      return bolDebug(false, '(bolc__Form) kein container fuer "control_page"');

    // Clear the container
    cntOutput.innerHTML = '';

    // Get the page of the container
    let page = bol_getPage4Object(cntOutput.id);

    // Declare and initialize ProjectOutput variable
    let ProjectOutput;

    try {
      // Attempt to call bolProject_Summary function and store result in ProjectOutput variable
      //ToDO: implement this both functions
      ProjectOutput = bolProject_Summary(page);
    } catch (err) {
      // If an error occurs, do nothing and proceed to the next step
    }

    // Check if ProjectOutput variable has a value
    if (ProjectOutput) {
      // If ProjectOutput is an empty string, hide the cntOutput element; otherwise, set its content to the value of ProjectOutput
      if (ProjectOutput.trim() == '') {
        cntOutput.style.display = 'none';
      } else {
        cntOutput.innerHTML = ProjectOutput;
      }

      // Go to the page indicated by the cntOutput container element
      window.bolPage.goTo(page);
      return;
    }

    this.checkGlobalScript();

    cntOutput.innerHTML = this.getStringOutput();
    window.bolPage.goTo(page);
  }

  /**
   * this mehtode updates the bolSettings object for the summary page
   */
  private checkGlobalScript(): void {
    // Check if alternative field names have been defined in the global script
    if (typeof this.bol__control_names !== 'undefined') {
      window.bolSettings.FieldNamesAlternative = this.bol__control_names;
    } else if (typeof this.contoll_names !== 'undefined') {
      window.bolSettings.FieldNamesAlternative = this.contoll_names;
    }

    // Check if fields not in summary have been defined in the global script
    let fieldsNotInSummary = this.bol__notInSummary || [];
    if (fieldsNotInSummary.length > 0) {
      window.bolSettings.fieldsNotInSummary = fieldsNotInSummary;
    }
  }

  /**
   * this method creates the HTML code for all fields on the summary page and returns it as a string.
   * @returns is the HTML code as string
   */
  public getStringOutput(): string {
    let stringOutput: string = '';
    let fieldset: string = '';

    for (let i = 0; i < this.numFields; i++) {
      //ToDO: implement this both functions
      let field = getField(getNthFieldName(i));
      let fieldvalue = '';
      let fieldset_active = '';
      let linealternate = true;

      if (!field) continue;
      // if it should not appear in the summary, check for this class
      if (FieldNotInSummary(field)) continue;
      if (field.id == window.bolSettings.FieldNameConfigJSON) continue;

      switch (field.type) {
        case 'text':
        case 'textarea':
          fieldvalue = field.value.trim();
          if (field.type == 'textarea')
            fieldvalue = '<pre>' + fieldvalue + '</pre>';
          break;
        case 'file':
          fieldvalue = field.value.replace('C:\\fakepath\\', '');
          break;
        case 'select':
          fieldvalue = field.value;
          break;
        default:
          fieldvalue = field.value;
      }

      // get current fieldset title
      fieldset_active = bol_getFieldsetLegend(field);
      // if the current fieldset is not equal to the previous one and is not a page, the following line is output
      if (fieldset_active != fieldset && fieldset_active != 'page') {
        stringOutput +=
          '<div class="row"><div class="col-sm-12 bol-table-header">' +
          fieldset_active +
          '</div></div>';
        fieldset = fieldset_active;
      }

      if (linealternate) {
        stringOutput += this.createRow(
          bol_GetFieldTitle(field),
          fieldvalue,
          false
        );
        linealternate = false;
      } else {
        stringOutput += this.createRow(
          bol_GetFieldTitle(field),
          fieldvalue,
          true
        );
        linealternate = true;
      }
    }
    return stringOutput;
  }

  /**
   *  The method returns an HTML string that represents a row in the summary page.
   * @param title is the title of row
   * @param value is the value of row
   * @param isAlternate it is for the classname important, so that according to the line appropriate class is taken for this line.
   * @returns a row as string
   */
  private createRow(
    title: string,
    value: string,
    isAlternate: boolean
  ): string {
    const leftClass = isAlternate
      ? 'bol-table-cellleft2'
      : 'bol-table-cellleft1';
    const rightClass = isAlternate
      ? 'bol-table-cellright2'
      : 'bol-table-cellright1';
    return `<div class="row">
      <div class="col-sm-5 ${leftClass}">${title}</div>
      <div class="col-sm-7 ${rightClass}">${value}</div>
    </div>`;
  }
}
