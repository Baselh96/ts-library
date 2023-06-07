/* eslint-disable @typescript-eslint/no-inferrable-types */
import { getCssVariable } from '../function/helper/getCssVariable';
import { setPrecentStyleHelper } from '../function/helper/setPrecentStyleHelper';
// TODO: Can probably remove
// import { Button } from '../model/buttons.model';
import { bolc__Settings } from './bolc__Settings';
import { bolc__Page } from './bolc__Page';

interface IButton {
  lang: string;
  page: number;
  visible: true;
  percent: number;
  label: string;
  tip?: string;
}

/***************************************************************************************************
 * BLOCK
 * step buttons, progress bar
 ***************************************************************************************************/
export class bolc__Steps {
  private _obj?: HTMLElement;
  public Buttons: IButton[] = [];
  public _infoText: string = '';
  private _percent: number = 10;
  private _percentStyle: string = 'basic';
  private _color_line: string = '';
  private _color_background: string = '';

  //Is an instance of the bolSettings class, which we get as a parameter.
  private bolSettings: bolc__Settings;

  constructor(bolSettings: bolc__Settings) {
    this.bolSettings = bolSettings;

    this._color_line = getCssVariable(
      '--bol-color-stepbutton-line',
      'rgb(222, 222, 222)'
    );
    this._color_background = getCssVariable(
      '--bol-color-stepbutton-bg',
      'rgb(0, 64, 128)'
    );

    for (let i = 1; i < bolc__Page.max + 1; i++) {
      this.Buttons.push({
        lang: 'de',
        page: i,
        visible: true,
        percent: 0,
        label: `Seite  ${i}`,
      });
    }

    // Search for the element with the ID "bol.StepButtonBar".
    this._obj = document.getElementById('bol.StepButtonBar') || undefined;

    // If the element exists and is an input element, change the surrounding HTML to a DIV element with the ID "bolStepButtons".
    if (this._obj && this._obj.tagName == 'INPUT' && this._obj.parentElement) {
      this._obj.parentElement!.outerHTML =
        '<div class="row" id="bolStepButtons"></div>';
    }
    // Otherwise assign the element with the ID "bolStepButtons" directly
    else {
      this._obj = document.getElementById('bolStepButtons') || undefined;
    }
  }

  //Setter and getter
  get info(): string {
    return this._infoText;
  }

  set info(newValue: string) {
    this._infoText = newValue;
    const e = document.getElementById('bolStepButtonInfo');
    if (e) e.innerText = this._infoText;
  }

  get percent(): number {
    return this._percent;
  }

  set percent(newValue: number) {
    // Search the HTML element with the ID 'bolProgress
    const e = document.getElementById('bolProgress');

    // Check if the element was found
    if (e === null || e === undefined) {
      // If the element is not found, set the style to 'none' and exit the method.
      this._percentStyle = 'none';
      return;
    }

    // Set the new percentage value
    this._percent = newValue;

    // Update the attributes and text of the element
    e.setAttribute('aria-valuenow', this._percent.toString());
    e.style.width = `${this._percent}%`;
    e.innerText = `${this._percent}%`;

    // If the percentage value is greater than zero, display the element
    if (this._percent > 0) {
      e.style.display = '';
    }
  }

  get percentStyle(): string {
    return this._percentStyle;
  }

  set percentStyle(newValue: string) {
    // Search the HTML element with the ID 'bolProgress
    const e = document.getElementById('bolProgress');

    // Check if the element was found
    if (e === null || e === undefined) {
      // If the element is not found, set the style to 'none' and exit the method.
      this._percentStyle = 'none';
      return;
    }

    //To update the bolProgress element
    switch (newValue.toLowerCase()) {
      case 'anistriped':
        setPrecentStyleHelper(
          e,
          'progress-bar progress-bar-striped progress-bar-animated',
          this._percent + '%'
        );
        break;
      case 'striped':
        this._percentStyle = 'label';
        setPrecentStyleHelper(
          e,
          'progress-bar progress-bar-striped',
          this._percent + '%'
        );
        break;
      case 'label':
        this._percentStyle = 'label';
        setPrecentStyleHelper(
          e,
          'progress-bar bol-progress',
          this._percent + '%'
        );
        break;
      case 'none':
        e.style.display = 'none';
        break;
      default:
        this._percentStyle = 'basic';
        setPrecentStyleHelper(e, 'progress-bar bol-progress', '');
    }
  }

  get layout(): string {
    return this.bolSettings._StepButtonLayout;
  }

  set layout(newValue: string) {
    this.bolSettings._StepButtonLayout =
      newValue.toLowerCase() === 'pib' ? 'pib' : 'ib';

    this.StyleIt();
  }

  get active(): number {
    return this.bolSettings.page !== 0 ? this.bolSettings.page : 1;
  }

  /**
   * This method generates an SVG image for the step buttons.
   * Depending on the passed "Mode" (active or inactive), a corresponding SVG path is created and filled with colors from the object.
   * The finished SVG is then converted to a Data URI and returned as background image.
   * @returns Data-URI as backgound image
   */
  public ButtonImage(Mode: boolean): string {
    const svg =
      '<svg width="900" height="40" overflow="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';

    const image = `${svg}<path d="M 0,3 H 885 L 900 20 L 885 37 H 0" fill="${
      Mode ? this._color_background : 'none'
    }" fill-rule="none" style="fill:none:fill-opacity:${
      Mode ? '1' : '10'
    }10;stroke:${this._color_line};stroke-width:1;stroke-miterlimit:14;${
      Mode ? '' : 'stroke-opacity:1'
    };"/></svg>`;

    return `url('data:image/svg+xml;utf8,${image}') `;
  }

  /**
   * Creates the step buttons and returns a row element containing the buttons.
   * @returns A row element containing the step buttons.
   */
  public CreateButtons(): HTMLDivElement {
    const myRow = document.createElement('div');
    myRow.className = 'row';

    const myCol = document.createElement('div');
    myCol.className = 'col-lg-12 bol-stepbar';
    myCol.id = 'bolStepButtonBar';

    myRow.appendChild(myCol);

    // Loop through the buttons and create a button element for each
    this.Buttons.forEach((button) => {
      // Skip buttons with page number 0
      if (button.page === 0) return;

      // Get label and tooltip for button
      const steplabel = button.label;
      const steptip =
        !button.tip || button.tip == '' ? button.label : button.tip;

      // Create button element and set its properties
      const btn = document.createElement('button');
      btn.id = 'bol_btnStep' + button.page;
      btn.type = 'button';
      btn.value = button.page.toString();
      btn.style.display = button.visible ? '' : 'none';
      btn.innerText = steplabel;

      // Set button onclick attribute and tooltip attribute
      btn.setAttribute('onclick', 'bolPageSwitch(' + button.page + ');');
      btn.setAttribute('title', steptip);

      // Add active/inactive class and background image if applicable
      if (this.active == button.page) {
        btn.classList.add(
          this.bolSettings._StepButtonPosition == 'left'
            ? 'bol-stepbtn-active-left'
            : 'bol-stepbtn-active'
        );

        if (this.bolSettings._StepButtonImage)
          btn.style.backgroundImage = this.ButtonImage(true);
      } else {
        btn.classList.add(
          this.bolSettings._StepButtonPosition == 'left'
            ? 'bol-stepbtn-inactive-left'
            : 'bol-stepbtn-inactive'
        );

        if (this.bolSettings._StepButtonImage)
          btn.style.backgroundImage = this.ButtonImage(false);
      }

      // Add step counter to button text if applicable
      if (this.bolSettings._StepButtonCounter) {
        btn.innerText = ' ' + button.page + '. ' + btn.innerText;
      }

      // Append button to column and add line break if step button position is left
      myCol.appendChild(btn);
      if (this.bolSettings._StepButtonPosition == 'left') {
        myCol.appendChild(document.createElement('br'));
      }
    });

    // Return the row element containing the step buttons
    return myRow;
  }

  /**
   * this method is used to create a row in which is a column for step-button-info
   * @returns is an html-div as a line
   */
  public CreateInfo(): HTMLDivElement {
    //Create a div for row
    const myRow = document.createElement('div');
    myRow.className = 'row';

    //Create a div for column
    const myCol = document.createElement('div');
    myCol.className = 'col-lg-12 bol-stepbar-text';
    myCol.id = 'bolStepButtonInfo';
    myCol.innerText = this.info;

    //appende column to the row
    myRow.appendChild(myCol);

    return myRow;
  }

  /**
   * this method is used to create a progess-element.
   * @returns is a implemented progress as div-element
   */
  public CreateProgress(): HTMLDivElement {
    // create a new row
    const myRow = document.createElement('div');
    myRow.className = 'row';
    // hide the row if the progress is zero
    if (this.percent == 0) myRow.style.display = 'none';
    // create a new column
    const myCol = document.createElement('div');
    myCol.className = 'col-lg-12 bol-stepbar-percent';
    myCol.id = 'bolStepButtonProgress';
    // if the progress is negative, show a hidden progress bar with zero width
    // otherwise, show a visible progress bar with zero width
    myCol.innerHTML =
      '<div class="progress"><div id="bolProgress" class="progress-bar" role="progressbar" style="width: 0%;' +
      (this.percent < 0)
        ? 'display: none;'
        : '' +
          '" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" title="' +
          this.bolSettings.GetMsgString('progress_title') +
          '"></div></div>';
    // append the column to the row and return the row
    myRow.appendChild(myCol);
    return myRow;
  }

  /**
   * This function hide the button of page with number pageNo.
   * @param pageNo is the pageNumber the button is on
   */
  public buttonHide(pageNo: number): void {
    this.changeButton(pageNo, 'none');
  }

  /**
   * This function show the button of page with number pageNo.
   * @param pageNo is the pageNumber the button is on
   */
  public buttonShow(pageNo: number): void {
    this.changeButton(pageNo, '');
  }

  /**
   * This function changes a button from the button list according to the passed values.
   * @param pageNo is the pageNumber the button is on
   * @param displayText is the value of the display of the button
   */
  private changeButton(pageNo: number, displayText: string): void {
    // Search for the button with the specified page number
    const button = this.Buttons.find((item) => item.page === pageNo);

    // If the button was found, set the visibility
    if (button) {
      button.visible = displayText.toLowerCase() !== 'none';

      // Search for the HTML element with ID "bol_btnStep" + pageNo
      const ele = document.getElementById('bol_btnStep' + pageNo);

      // If the element was found, set the display to "none".
      if (ele && ele !== null) ele.style.display = displayText;
    }
  }

  /**
   * this method changes the label and tootip of a button.
   * @param pageNo is the pageNumber the button is on
   * @param tLabel is the new label
   * @param tTip is a new tooltip
   */
  buttonText(pageNo: number, tLabel: string, tTip?: string): void {
    // Search for the button with the specified page number
    const button = this.Buttons.find((item) => item.page === pageNo);

    // If the button was found, set the label and tooltip
    if (button) {
      button.label = tLabel;
      button.tip = tTip ? tTip : '';
    }
  }

  /**
   * this method is used to change two buttons
   * @param OldNo is the numer of the old button
   * @param NewNo is the number of the new button
   * @returns nothing is returned if the buttons are not found, sont ture is returned
   */
  public Update(OldNo: number, NewNo: number): boolean | undefined {
    //To update the buttons and if there buttens are not found, it will jump out of this method
    if (this.updateButton(OldNo, false)) return;
    if (this.updateButton(NewNo, true)) return;

    // Search for the button with the specified page new number
    const button = this.Buttons.find((item) => item.page === NewNo);

    // If the button was found, set the attribute precent of this class on the precent of button
    if (button) {
      this.percent = button.percent;
    }
    return true;
  }

  /**
   * this method is a helfemethde for the Update of the button.
   * @param bNumber is the number of the button to change.
   * @param isAktive is boolean value.
   */
  private updateButton(bNumber: number, isAktive: boolean): boolean {
    // Search for the HTML element with the ID "bol_btnStep" + bNumber
    const ele = document.getElementById(`bol_btnStep${bNumber}`);

    // If the element was not found, terminate the method
    if (ele === null) {
      return true;
    }

    // Set the class of the element depending on the activation
    if (this.bolSettings._StepButtonPosition === 'left') {
      ele.className = isAktive
        ? 'bol-stepbtn-active-left'
        : 'bol-stepbtn-inactive-left';
    } else {
      ele.className = isAktive ? 'bol-stepbtn-active' : 'bol-stepbtn-inactive';
    }

    // If the button image setting is enabled, set the background image of the element.
    if (this.bolSettings._StepButtonImage) {
      ele.style.backgroundImage = this.ButtonImage(isAktive);
    }

    return false;
  }

  /**
   * This method show the button
   */
  public Show(): void {
    this.StyleIt();

    // Search for the button with the specified page from bolPage number
    const button = this.Buttons.find((item) => item.page === this.active);

    // If the button was found, set the attribute precent of this class on the precent of button
    if (button) {
      this.percent = button.percent;
    }
  }

  /**
   * This  method formats and updates the appearance of the step-by-step buttons.
   */
  public StyleIt(): void {
    // get the container element
    const cnt = document.getElementById('bolStepButtons');

    // check if _obj and cnt exist, if not return
    if (!this._obj || !cnt) return;

    // clear the container contents
    cnt.innerHTML = '';

    // create a div element with class 'col-lg-12'
    const myColBase = document.createElement('div');
    myColBase.className = 'col-lg-12';

    // add myColBase to cnt
    cnt.appendChild(myColBase);

    // depending on the layout, create the elements and append them to myColBase
    switch (this.layout) {
      case 'bip':
        myColBase.appendChild(this.CreateButtons());
        myColBase.appendChild(this.CreateInfo());
        myColBase.appendChild(this.CreateProgress());
        break;
      case 'ip':
        myColBase.appendChild(this.CreateInfo());
        myColBase.appendChild(this.CreateProgress());
        break;
      case 'ib':
        myColBase.appendChild(this.CreateInfo());
        myColBase.appendChild(this.CreateButtons());
        break;
      case 'b':
        myColBase.appendChild(this.CreateButtons());
        break;
      default: // ibp
        myColBase.appendChild(this.CreateInfo());
        myColBase.appendChild(this.CreateButtons());
        myColBase.appendChild(this.CreateProgress());
        break;
    }

    // remove 'bol-container-hidden' and add 'bol-stepbar' to cnt
    cnt.classList.remove('bol-container-hidden');
    cnt.classList.add('bol-stepbar');
  }
}
