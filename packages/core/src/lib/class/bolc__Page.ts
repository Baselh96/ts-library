import { bolDebug } from '../function';
import { bol_BlockCheck } from '../function/helper/bol_BlockCheck';
import { bolc__Settings } from './bolc__Settings';
import { bolc__Object } from './bolc__Object';
import { InitForm } from './initForm';
import { getField } from '../function/other-functions/getField';
import { HTMLInputsType } from '../type/htmlInputsType';

/***************************************************************************************************
 * BLOCK
 * Page
 ***************************************************************************************************/
export class bolc__Page {
  //Is an instance of the Settings class, which we get as a parameter in the configuration.
  private bolSettings: bolc__Settings;
  public max: number;
  // private bolSteps: bolc__Steps;
  // private bolForm: bolc__Form;
  // private bolDialog: bolc__Dialog;

  constructor(
    bolSettings: bolc__Settings,
    public bolProject_DoSomethingOnPage?: (aktivePage: number) => void,
    public bolProject_CheckPageBeforeLeave?: (aktivePage: number) => boolean,
    public bol__page_focus?: any[],
    public page_focus?: any[]
  ) {
    this.bolSettings = bolSettings;
    this.max = bolc__Page.max;
  }

  get active(): number {
    return this.bolSettings.page !== 0 ? this.bolSettings.page : 1;
  }

  set active(pageNumber: number) {
    this.bolSettings.page = pageNumber;
  }

  get max(): number {
    const e = document.querySelectorAll('div.row[id^=page]');
    return e ? e.length : 0;
  }

  get pageContainer(): HTMLElement | null {
    return document.querySelector('div.row[id=page' + this.active + ']');
  }

  /**
   * This method is responsible for navigating to a specific page within a form
   * @param pgNo
   * @returns
   */
  public goTo(pgNo: number): number {
    // Check if pgNo is greater than the maximum page number
    if (pgNo > this.max) return this.active;

    // Check if pgNo is less than 1 (minimum page number)
    if (pgNo < 1) return 1;

    // Initialize pgnr with pgNo
    let pgnr = pgNo;

    // Store the current active page number
    const oldPgNo = this.active;

    // Check if the requested page is ahead of the current active page
    if (pgNo > this.active) {
      // Find the next usable page starting from pgNo
      for (let i = pgNo; i <= this.max; i++) {
        // Check if the page is usable
        if (this.bolSettings._usablePages[i - 1]) {
          pgnr = i;
          break;
        }
      }
    }

    // Hide the current page
    this.Hide();

    // Update the active page to the new page number
    this.active = pgnr;

    // Show the new page
    this.Show();

    // Update the step indicator
      InitForm.bolSteps.Update(oldPgNo, this.active);

    if (this.bolProject_DoSomethingOnPage)
      this.bolProject_DoSomethingOnPage(this.active);

    // Check and update the page focus
    this.checkPageFocus();

    // Update the current field focus
    this.updateCurrentFieldFocus();

    // Return the new active page number
    return this.active;
  }

  /**
   * Hides the page container by setting its display property to 'none'.
   */
  public Hide(): void {
    // Check if the page container exists and is truthy
    if (this.pageContainer) {
      // Set the display property of the page container to 'none'
      this.pageContainer.style.display = 'none';
    }
  }

  /**
   * Shows the page by setting the display CSS property of the page container to 'flex'.
   */
  public Show(): void {
    // Check if the page container exists
    if (this.pageContainer) {
      // Set the display property to 'flex' to show the page
      this.pageContainer.style.display = 'flex';
    }
  }

  /**
   * this method is used to go to the next page
   */
  public Next(): Promise<number> | number | boolean {
    // Call the custom function to check if it's okay to leave the current page
    const customResult = this.bolProject_CheckPageBeforeLeave
      ? this.bolProject_CheckPageBeforeLeave(this.active)
      : false;

    // If the custom function returns false, do not allow the user to proceed
    if (!customResult) return false;

    // If the current page fails validation, do not proceed to the next page and return the current page number
    if (!this.Check()) return this.active;

    // Summarize the form before proceeding to the next page
    this.Summary();

    // Go to the next page and return the page number
    return this.goTo(this.active + 1);
  }

  /**
   * this method is used to go to the previous page
   * @returns is the number of current page as promise
   */
  public Prev(): number | undefined {
    // Check if the current page is not the first page
    if (this.active > 1) {
      // Loop backwards through the previous pages
      for (let i = this.active - 1; i >= 1; i--) {
        // Check if the page is usable
        if (this.bolSettings._usablePages[i - 1]) {
          // Go to the previous page
          return this.goTo(i);
        }
      }
    }
    return;
  }

  /**
   * This methode is is responsible for performing validation checks on a specific page
   * @param pgNo is the number of page
   * @returns is the result of performing validation checks
   */
  public Check(pgNo?: number): boolean {
    // If pgNo is not provided, set it to the current active page
    if (!pgNo) pgNo = this.active;

    // If _checkPage is true, skip the check and return true
    if (this.bolSettings._checkPage) return true;

    // Perform block-level field validation check on the specified page
    const b: boolean = bol_BlockCheck('page' + pgNo);

    // Update the PageChecked property with the validation result
    this.bolSettings.PageChecked = b;

    // Return the validation result
    return b;
  }

  /**
   * This methode is responsible for handling the navigation logic based on the provided pgNo parameter.
   * @param pgNo ist die Pagenumber, zu ihr es gewechselt werden soll
   * @returns ist die Pagenumber, zu der es gewechselt wurde
   */
  Switch(pgNo: number) {
    // If pgNo is less than the current active page and greater than 0, navigate to the specified page
    if (pgNo < this.active && pgNo > 0) {
      return this.goTo(pgNo);
    }

    // If pgNo is equal to the current active page plus 1, navigate to the next page
    if (pgNo === this.active + 1) {
      return this.Next();
    }

    try {
      // Check the result of the custom function bolProject_CheckPageBeforeLeave
      const customResult = this.bolProject_CheckPageBeforeLeave
        ? this.bolProject_CheckPageBeforeLeave(this.active)
        : false;

      // If the custom result is false, return the current active page
      if (!customResult) {
        return this.active;
      }
    } catch (err) {
      // Handle any errors thrown by bolProject_CheckPageBeforeLeave
    }

    // Perform field validation check
    if (!this.Check()) {
      return this.active;
    }

    if (InitForm.bolSettings._checkPage) {
      // If _checkPage is true, validate the checked pages
      for (let i = this.active; i < pgNo; i++) {
        if (!InitForm.bolSettings._usablePages[i - 1]) {
          continue;
        }
        if (!InitForm.bolSettings._CheckedPages[i - 1]) {
          InitForm.bolDialog.ShowErrorPages();
          return this.active;
        }
      }
    }

    if (pgNo >= this.max && InitForm.bolSettings._modeSummary) {
      // If pgNo is greater than or equal to the maximum page and _modeSummary is enabled, navigate to the summary page
      this.Summary(pgNo);
    }

    // Navigate to the specified page
    return this.goTo(pgNo);
  }

  /**
   * This function takes in a page number pgNo and checks whether it's equal to the last page and _modeSummary is enabled in bolSettings
   * @param pgNo is a page number
   */
  public Summary(pgNo?: number): void {
    // If pgNo is not provided, set it to the next page number after the currently active page
    if (!pgNo) pgNo = this.active + 1;
    // If pgNo is equal to the last page and _modeSummary is enabled in the bolSettings, call the Summary() method of the form
    if (pgNo == this.max && this.bolSettings._modeSummary)
      InitForm.bolForm.Summary();
  }

  public StringOffFields(
    theKey: string,
    NameReplacement?: string,
    BlockOfFields?: string,
    Mode?: string
  ): string {
    // Get the fields based on the block identifier or the entire page
    const fields:
      | NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | undefined =
      !BlockOfFields || BlockOfFields == ''
        ? this.pageContainer?.querySelectorAll('input, select, textarea')
        : document
            .getElementById(BlockOfFields)
            ?.querySelectorAll('input, select, textarea');

    // Check if fields exist
    if (!fields || fields.length <= 0) {
      return bolDebug('', '(bolc_Page.StringOfFields) no objects');
    }

    // Set the mode (default is 'j' for JSON)
    Mode = Mode ? Mode.toLowerCase().substr(0, 1) : 'j';

    let fstrings = ''; // Track field names to avoid duplicates
    let result = '';

    // Iterate over each field
    fields.forEach((field) => {
      const f = getField(field.name) as HTMLInputsType;
      if (!f) return;

      const fname = f.id ? f.id : f.name;

      // Skip fields starting with 'js_' and fields that have already been processed
      if (
        fname.toLowerCase().substring(0, 3) == 'js_' ||
        fstrings.indexOf(fname) >= 0
      )
        return;

      fstrings += fname + ';';

      // Special handling for radio buttons
      const e =
        document.getElementById(fname) || document.getElementsByName(fname)[0];
      if (e) return;

      const obj = new bolc__Object(e);
      if (!obj) return;

      switch (Mode) {
        case 'i': // Input objects
          result += obj.value2INPUT(theKey, NameReplacement);
          break;
        case 'x': // XML structure
          result += obj.value2XML(theKey);
          break;
        case 'j':
        default: // JSON structure
          result += obj.value2JSON() + ', ';
      }
    });

    return result;
  }

  /**
   * function checks the page focus and update the settings accordingly
   */
  private checkPageFocus(): void {
    const focus = this.bol__page_focus || this.page_focus;
    if (focus) {
      this.bolSettings.pageFocus = focus;
    }
  }

  /**
   * the function checks if there's a specific field on the page that has focus based
   * on the bolSettings.pageFocus property.
   */
  private updateCurrentFieldFocus(): void {
    // Initialize fieldId and field variables
    let fieldId: string | undefined = undefined;
    let field: HTMLElement | null = null;

    // Check if pageFocus is defined
    if (this.bolSettings.pageFocus.length > 0) {
      // Check if pageFocus is defined
      fieldId = this.bolSettings.pageFocus[this.active - 1][1];

      // If fieldId is defined, get the corresponding field element
      if (fieldId) {
        field = document.getElementById(fieldId);
      }
    }

    // If field is still null, try to find the first input, select, or textarea element on the page
    if (!field) {
      // Check if pageContainer is defined
      if (!this.pageContainer) return;
      // Get all input, select, and textarea elements on the page that don't start with "js_" or "bol."
      const fields = this.pageContainer.querySelectorAll(
        'input:not([name^="js_"]):not([name^="bol."]), select:not([name^="js_"]):not([name^="bol."]), textarea:not([name^="js_"]):not([name^="bol."])'
      );

      // If fields is defined and not empty, get the first element as field
      if (fields && fields.length !== 0) field = fields[0] as HTMLElement;
    }

    // If field is defined, scroll to the top of the page and set focus to the field
    if (field) {
      window.scroll(0, 0);
      field.focus();
    }
  }
}
