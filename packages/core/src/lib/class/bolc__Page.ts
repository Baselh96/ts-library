import { bolc__Settings } from './bolc-settings';
import { InitForm } from './initForm';

/***************************************************************************************************
 * BLOCK
 * Page
 ***************************************************************************************************/
export class bolc__Page {
  //Is an instance of the Settings class, which we get as a parameter in the configuration.
  private bolSettings: bolc__Settings;

  constructor(
    bolSettings: bolc__Settings,
    public bol__page_focus?: any[],
    public page_focus?: any[]
  ) {
    this.bolSettings = bolSettings;
  }

  get active(): number {
    return this.bolSettings.page !== 0 ? this.bolSettings.page : 1;
  }

  set active(pageNumber: number) {
    this.bolSettings.page = pageNumber;
  }

  get max(): number {
    let e = document.querySelectorAll('div.row[id^=page]');
    return e ? e.length : 0;
  }

  get pageContainer(): HTMLElement | null {
    return document.querySelector('div.row[id=page' + this.active + ']');
  }

  public async goTo(pgNo: number): Promise<number> {
    if (pgNo > this.max) return this.active;
    if (pgNo < 1) return 1;
    let pgnr = pgNo;
    let oldPgNo = this.active;

    if (pgNo > this.active) {
      for (let i = pgNo; i <= this.max; i++) {
        if (this.bolSettings._usablePages[i - 1]) {
          pgnr = i;
          break;
        }
      }
    }

    //To change the page
    this.Hide;
    this.active = pgnr;
    this.Show();
    InitForm.bolSteps.Update(oldPgNo, this.active);

    //ToDo: implement the function bolProject_DoSomethingOnPage
    /* try {await bolProject_DoSomethingOnPage(this.active)} catch(err) {} */

    this.checkPageFocus();
    this.updateCurrentFieldFocus();
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
    //ToDo: impelementation of function bolProject_CheckPageBeforeLeave
    // Call the custom function to check if it's okay to leave the current page
    /* let customResult: boolean = bolProject_CheckPageBeforeLeave(this.active);
    
    // If the custom function returns false, do not allow the user to proceed
    if (!customResult) return false; */

    // If the current page fails validation, do not proceed to the next page and return the current page number
    //if (!this.Check()) return this.active;

    // Summarize the form before proceeding to the next page
    this.Summary();

    // Go to the next page and return the page number
    return this.goTo(this.active + 1);
  }

  /**
   * this method is used to go to the previous page
   * @returns is the number of current page as promise
   */
  public Prev(): Promise<number> | undefined {
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

 /*  public Check(pgNo?: number): boolean {
    let b;
    if (!pgNo) pgNo = this.active;
    if (this.bolSettings._checkPage) return true;
    b = bol_BlockCheck('page' + pgNo);
    this.bolSettings.PageChecked = b;

    if (!b) {
      let pe = document.getElementById(this.bolSettings._fdsError[0].name);
      if (pe == undefined)
        pe = document.getElementsByName(this.bolSettings._fdsError[0].name)[0];
    }
    return b;
  } */

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
