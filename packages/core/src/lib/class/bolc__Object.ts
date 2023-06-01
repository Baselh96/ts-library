/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  bol_CalcDate,
  bol_GetObjectType,
  bol_getPage4Object,
} from '../function';
import { bol_LabelGet } from '../function/field-element/bol_LabelGet';
import { DataClassDate } from './DataClassDate';
import { InputError } from '../function/other-functions/inputError';
import { InitForm } from './initForm';
import { bol_DateString } from '../function/dateAndTime/bol_DateString';
import { ResetField } from '../function/helper/resetField';
import { clearInputError } from '../function/other-functions/clearInputError';
import { SplitEformsTitle } from '../function/helper/splitEformsTitle';
import { HTMLRequired } from '../function/helper/htmlRequired';
import { HTMLInfo } from '../function/helper/htmlInfo';
import { HTMLRequiredRadio } from '../function/helper/htmlRequiredRadio';
import { HTMLInputsType } from '../type/htmlInputsType';
import { getField } from '../function/other-functions/getField';

export class bolc__Object {
  public _obj?: HTMLInputsType;
  public _label?: HTMLElement;
  public type?: string | null = '';
  public radioName: string = '';

  constructor(obj?: HTMLInputsType) {
    // If obj is undefined, return
    if (obj === undefined) return;
    this._obj = obj;

    // Determine the type of the input element
    this.type = bol_GetObjectType(obj);

    // If the type is 'hidden', return
    if (this.type == 'hidden') return;
    // If the type is 'radio', assign the name to radioName property
    if (this.type == 'radio') this.radioName = this.name;

    // Get the label associated with the input element
    this._label = bol_LabelGet(this._obj.id);
  }

  get visible(): boolean {
    return this._obj != undefined && this._obj.style.display == '';
  }

  set visible(newMode: boolean) {
    newMode ? this.Show() : this.Hide();
  }

  get name(): string {
    return this._obj ? this._obj.name : '';
  }

  get id(): string {
    return this._obj ? this._obj.id : '';
  }

  get value(): string {
    return this._obj ? this._obj.value : '';
  }

  set value(v: string) {
    if (this._obj) this._obj.value = v;
  }

  get required(): boolean {
    return this._obj ? this._obj.required : false;
  }

  get label(): string {
    return this._obj ? this._obj.title : '';
  }

  set label(newValue: string) {
    if (this._obj) this._obj.title = newValue || '';
  }

  get isEmpty(): boolean | undefined {
    if (!this._obj) return undefined;

    switch (this.type) {
      case 'checkbox':
        return (this._obj as HTMLInputElement).checked;
      case 'radio':
        // eslint-disable-next-line no-case-declarations
        const field = getField(this.name);
        if (!field) return false;

        return (field as HTMLInputElement | RadioNodeList).value.trim() == '';
      case 'text':
      case 'password':
      case 'textarea':
      case 'file':
        return this.value.trim() == '';
      case 'select':
      case 'select-one':
      case 'select-multiple':
        return this.value.trim() == '' || this.value == '0';
      default:
        return false;
    }
  }

  get pageNo() {
    return this._obj ? bol_getPage4Object(this._obj.id) : undefined;
  }

  get valueClean() {
    if (this._obj === undefined) return '';

    let value = this._obj.value;

    // Replace zero-width space with a regular space
    value = value.replace(/&#8203;/g, ' ');

    // Replace en dashes and em dashes with a hyphen
    value = value.replace(/&#8210;|&#8211;/g, ' - ');

    // Replace double em dashes with two hyphens
    value = value.replace(/&#8212;/g, ' -- ');

    // Replace different single quote characters with a standard single quote
    value = value.replace(/&#8216;|&#8217;|&#8218;|&#8219;/g, "'");

    return value;
  }

  /**
   * Displays the input element and its label, if present.
   * Based on the type of the input element, the corresponding element or its parent element is displayed.
   * If a label is present, it will also be displayed.
   */
  public Show(): void {
    if (this._obj === undefined) return;

    switch (this._obj.type) {
      case 'checkbox': {
        // Show the input element
        this._obj.style.display = '';
        // Show the parent node of the input element
        if (this._obj.parentNode) {
          (this._obj.parentNode as HTMLInputElement).style.display = '';
        }
        break;
      }
      case 'text':
      case 'textarea':
      case 'file': {
        // Show the parent node of the input element
        if (this._obj.parentNode) {
          (this._obj.parentNode as HTMLInputElement).style.display = '';
        }
        break;
      }
      case 'radio': {
        // Get all radio elements with the same name
        const radioElements = document.getElementsByName(this._obj.name);
        radioElements.forEach((e) => {
          // Show the parent node of each radio element
          (e.parentNode as HTMLInputElement).style.display = ''; // Set display to default (show)
        });
        break;
      }
      case 'select':
      case 'select-multiple':
      default:
        // Set display to default (show)
        this._obj.style.display = '';
    }

    // Set display to default (show)
    if (this._label) this._label.style.display = '';
  }

  /**
   * Hide the input element and its label, if present.
   * Based on the type of the input element, the corresponding element or its parent element is hidden.
   * If a label is present, it will also be hidden.
   */
  public Hide(): void {
    if (this._obj === undefined) return;

    switch (this._obj.type) {
      case 'checkbox': {
        // Hide the input element
        this._obj.style.display = 'none';
        // Hide the parent node of the input element
        if (this._obj.parentNode) {
          (this._obj.parentNode as HTMLInputElement).style.display = 'none';
        }
        break;
      }
      case 'text':
      case 'textarea':
      case 'file': {
        // Hide the parent node of the input element
        if (this._obj.parentNode) {
          (this._obj.parentNode as HTMLInputElement).style.display = 'none';
        }
        break;
      }
      case 'radio': {
        // Get all radio elements with the same name
        const radioElements = document.getElementsByName(this._obj.name);
        radioElements.forEach((e) => {
          // Hide the parent node of each radio element
          (e.parentNode as HTMLInputElement).style.display = 'none'; // Set display to 'none' for hidden
        });
        break;
      }
      case 'select':
      case 'select-multiple':
      default:
        // Set display to 'none' for hidden
        this._obj.style.display = 'none';
    }

    // Set display to 'none' for hidden
    if (this._label) this._label.style.display = '';
  }

  /**
   * this method is used to create an input
   * @param key is for input-id and input-name
   * @param NameReplacement is also for input-id and input-name
   * @returns is the created input as string
   */
  public value2INPUT(key: string, NameReplacement?: string): string {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let valString = '';

    // Determine the value string based on the input type
    if (this.type === 'radio') {
      const field = getField(this.radioName);
      valString = field
        ? (field as HTMLInputElement | RadioNodeList).value.trim()
        : '';
    } else {
      valString = this._obj.value.trim();
    }

    // Determine the name of the input field with optional replacement
    const nn = NameReplacement
      ? this.name.replace(NameReplacement, '')
      : this.name;

    // Construct the HTML input element string with the field name and value
    return `<input type="hidden" id="${key}.${nn}" name="${key}.${nn}" value="${valString}"></input>`;
  }

  /**
   * This method is used to create a json property.
   * @returns is the created Json-Property as string
   */
  public value2JSON(): string {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let fieldName = '';
    let fieldValue = '';

    if (this.type === 'radio') {
      // For radio buttons, use the radioName as the field name
      fieldName = this.radioName.replace('.', '_');
      const field = getField(this.radioName);
      fieldValue = field
        ? JSON.stringify(
            (field as HTMLInputElement | RadioNodeList).value.trim()
          )
        : '';
    } else {
      // For other input types, use the name of the object as the field name
      fieldName = this._obj.name.replace('.', '_');
      fieldValue = JSON.stringify(this._obj.value.trim());
    }

    // Construct the JSON string with the field name and field value
    return `"${fieldName}": ${fieldValue}`;
  }

  /**
   * This method is used to create a xml-tag.
   * @returns is the created xml-tag as string
   */
  public value2XML(key: string): string {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let fieldName = '';
    let fieldValue = '';

    if (this.type === 'radio') {
      // For radio buttons, use the radioName as the field name
      fieldName = this.radioName.replace('.', '_');
      const field = getField(this.radioName);
      fieldValue = field
        ? (field as HTMLInputElement | RadioNodeList).value.trim()
        : '';
    } else {
      // For other input types, use the name of the object as the field name
      fieldName = this._obj.name.replace('.', '_');
      fieldValue = this._obj.value.trim();
    }

    // Construct the XML string with the field name and field value
    return `<${key}_${fieldName}>${fieldValue}</${key}_${fieldName}>`;
  }

  /**
   * This method takes a JSON key value pair and inserts the
   * corresponding value into an HTML input field.
   * @param key is the id or name of the field
   * @param value is the value for the field
   */
  public JSON2value(key: string, value: string) {
    // Replace "_" with "." in the key
    const skey = key.replace('_', '.');

    // Get the corresponding HTML input field
    const field = getField(skey) as HTMLInputElement;

    if (field.type) {
      if (field.type.substring(0, 5) == 'radio') {
        // If it's a radio button, retrieve the first element with the name
        this._obj = document.getElementsByName(skey)[0] as HTMLInputElement;
      } else {
        // Otherwise, retrieve the element with the corresponding ID
        this._obj = document.getElementById(skey) as HTMLInputElement;
      }

      // Set the value of the HTML input field
      field.value = value;
    }
  }

  /**
   * the method tries to convert the value of an HTML element into the
   * format of a date string
   * @returns
   */
  public FormatAsDate(): boolean | string {
    // If the HTML element is not present, false is returned.
    if (!this._obj) return false;

    // The desired date format
    const dFormat = '%D2.%M2.%Y2';
    // The value of the HTML element
    const nDate = this._obj.value;

    // An instance of the DataClassDate class is created to process the date.
    const oDate = new DataClassDate();

    // The date is scanned and verified
    if (!oDate.Scan(nDate, dFormat)) {
      InputError(
        this._obj,
        InitForm.bolSettings.GetMsgString('error_notadate'),
        1,
        0
      );
      // false is returned to indicate that the formatting failed
      return false;
    }

    // The formatted date is returned
    return oDate.Format(dFormat);
  }

  /**
   * This method checks if the date of birth is valid and within a certain range
   * @returns If either of the comparisons evaluates to true, it displays the appropriate error message and returns false.
   * Otherwise, it returns true, indicating a valid birthdate.
   */
  public CheckDateBirth(): boolean {
    // Format the input date as a string
    const nDate = this.FormatAsDate();

    // Calculate the date object from the input date
    const cDate = bol_CalcDate(nDate, 0, 0, 0);

    // Check if the calculated date is in the future
    if (cDate && new Date().valueOf() < cDate.valueOf()) {
      this.showInputError('error_birthdatefuture');
      return false;
    }
    // Check if the calculated date is before the year 1900
    else if (cDate && cDate.valueOf() < new Date(1900, 0, 1).valueOf()) {
      this.showInputError('error_birthdatepast');
      return false;
    }

    // If the date is valid, return true
    return true;
  }

  /**
   * Displays an input error message on the associated input element.
   * @param msgString - The key string to retrieve the error message from the message settings.
   */
  private showInputError(msgString: string): void {
    InputError(
      this._obj as HTMLElement,
      InitForm.bolSettings.GetMsgString(msgString),
      1,
      0
    );
  }

  /**
   * Checks if the entered date of birth corresponds to a legal age.
   * @returns A boolean indicating whether the date of birth corresponds to a legal age.
   */
  public CheckLegalAge(): boolean {
    if (!this.CheckDateBirth()) return false;

    const currentDate = bol_CalcDate(new Date(), -18, 0, 0);
    const objectDate = bol_CalcDate(this.FormatAsDate(), 0, 0, 0);
    if (
      objectDate &&
      currentDate &&
      objectDate.valueOf() > currentDate.valueOf()
    ) {
      this.showInputError('error_notlegalage');
      return false;
    }
    return true;
  }

  /**
   * Checks if the entered date is older with a given number of years.
   * @param Years - The number of years to compare against.
   * @returns A boolean value indicating whether the entered date is older.
   */
  public CheckOlder(Years: number): boolean {
    const cDate = bol_CalcDate(this.FormatAsDate(), Years, 0, 0);
    return cDate != undefined && new Date().valueOf() > cDate?.valueOf();
  }

  /**
   * Checks if the entered date is older with a given number of years.
   * @param Years - The number of years to compare against.
   * @returns A boolean value indicating whether the entered date is older.
   */
  public CheckYounger(Years: number): boolean {
    const cDate = bol_CalcDate(this.FormatAsDate(), Years, 0, 1);
    return cDate != undefined && new Date().valueOf() < cDate?.valueOf();
  }

  public value2Date(): string | boolean {
    return this.FormatAsDate();
  }

  /**
   * This method is used to format the date of this object according to a desired format.
   * @param FormatType is the desired format
   * @returns is the date in the desired format
   */
  public value2DateString(FormatType: string): string {
    return this._obj ? bol_DateString(this._obj, FormatType) : '';
  }

  public CalcDate(
    YearsToChange: number,
    MonthsToChange: number,
    DaysToChange: number,
    FirstDay: boolean
  ): Date | undefined {
    return bol_CalcDate(
      this._obj?.value,
      YearsToChange,
      MonthsToChange,
      DaysToChange,
      FirstDay
    );
  }

  /**
   * This method is used to clear the form by resetting
   * the values of input, textarea, and select elements.
   */
  public Clear(): void {
    if (!this._obj) return; // If the HTML element is not present, return early

    // Clear the form based on its type
    switch (this.type) {
      case 'container':
      case 'div':
      case 'fieldset':
        // Reset the list of error fields
        InitForm.bolSettings._fdsError = [];

        // Reset the styling and errors of input, select, and textarea elements within the container
        this._obj
          .querySelectorAll('input, select, textarea')
          .forEach((element) => {
            // Clear input, textarea, and select elements within the container
            ResetField(element as HTMLInputsType);
            if (element instanceof HTMLSelectElement) {
              element.selectedIndex = 0;
            }

            if (
              element instanceof HTMLInputElement &&
              element.type === 'radio'
            ) {
              // For radio buttons, reset the parent element's color
              (element.parentNode as HTMLElement).style.color = 'inherit';
            } else {
              // For other input elements, clear the input error
              clearInputError(element as HTMLInputsType);
            }
          });
        break;
      default:
        // For other types of elements, simply reset the field and clear the input error
        ResetField(this._obj);
        clearInputError(this._obj);
    }
  }

  public StyleIt() {
    // Skip styling for undefined objects, hidden elements, and elements with "bol-nolabel" class
    if (
      this._obj == undefined ||
      this.type == 'hidden' ||
      this._obj.className.toLowerCase().indexOf('bol-nolabel') != -1
    )
      return;

    switch (this.type) {
      case 'checkbox':
        this.styleCheckBoxAndRadio(true); // Apply styling for checkboxes
        break;
      case 'radio':
        this.styleCheckBoxAndRadio(false); // Apply styling for radio buttons
        break;
      case 'file':
        if (InitForm.bolSettings.useLoad4Files as boolean)
          this._obj.setAttribute('onchange', 'bol_FileLoad(this);');
        if (InitForm.bolSettings.useAccept4Files as boolean)
          this._obj.setAttribute(
            'accept',
            InitForm.bolSettings.fileTypes as string
          );
        this.styleOtherTypes();
        break;
      case 'text':
      case 'textarea':
      case 'select':
        this.styleOtherTypes();
        break;
    }
  }

  /**
   * Stylizes a checkbox or radiobutton element.
   * @param isCheckBox Specifies whether it is a checkbox element (true) or not (false - radiobutton).
   */
  private styleCheckBoxAndRadio(isCheckBox: boolean): void {
    if (!this._obj) return; // If the element is not present, exit the function.

    // Set the 'bolTitle' attribute of the element if it is undefined.
    if (this._obj.getAttribute('bolTitle') == undefined)
      this._obj.setAttribute('bolTitle', this._obj.title);

    // Split the title text into separate parts using SplitEformsTitle function.
    const texts = SplitEformsTitle(this._obj.title);

    // Update the title attribute with the text for the tooltip if it is not empty.
    if (texts.texttooltip.length !== 0) this._obj.title = texts.texttooltip;

    // Get the <span> elements within the parent of the element.
    const spanElements = (
      this._obj.parentNode as HTMLElement
    )?.getElementsByTagName('SPAN');

    if (spanElements[0]) {
      // Style the element based on whether it is required or not.
      if (this._obj.required) {
        if (isCheckBox) {
          HTMLRequired(spanElements[0] as HTMLElement); // Add required styling for checkbox.
        } else {
          HTMLRequiredRadio(spanElements[0] as HTMLElement); // Add required styling for radiobutton.
        }
      }

      // Add info icon and functionality if help text is provided.
      if (texts.texthelp != '') {
        HTMLInfo(spanElements[0] as HTMLElement, texts.texthelp);
      }
    }
  }

  /**
   * This method performs styling logic for elements of types other than checkbox, radio,
   * file, text, textarea, and select
   */
  private styleOtherTypes(): void {
    if (!this._obj) return; // If the element is not present, exit the function.

    let texts = {
      textlabel: '',
      texttooltip: '',
      texthelp: '',
    };

    // Check if there is a label associated with the element
    if (this._label) {
      texts = SplitEformsTitle(this._label.innerText);
    } else if (
      // Check if the element's parent has the class "infieldlabel"
      (this._obj?.parentNode as Element)?.className
        .toLowerCase()
        .indexOf('infieldlabel') !== -1
    ) {
      texts = this._obj.getAttribute('bolTitle')
        ? SplitEformsTitle(this._obj.getAttribute('bolTitle') || '')
        : SplitEformsTitle(this._obj.title);

      // Set bolTitle attribute if it doesn't exist
      if (!this._obj.getAttribute('bolTitle'))
        this._obj.setAttribute('bolTitle', this._obj.title);

      // Create a new label element and associate it with the element using "for" attribute
      this._label = document.createElement('label');
      this._label.setAttribute('for', this._obj.id);
      this._obj.parentNode?.appendChild(this._label);
    }

    if (this._label) {
      // Apply styling based on the extracted text properties
      if (texts.textlabel.length !== 0) this._label.innerHTML = texts.textlabel;
      if (texts.texttooltip.length !== 0) this._obj.title = texts.texttooltip;
      if (this._obj.required) HTMLRequired(this._label);
      if (texts.texthelp.length !== 0) HTMLInfo(this._label, texts.texthelp);
    }
  }
}
