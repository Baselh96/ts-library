/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import { HTMLInputsType } from '../type/HTMLInputsType';

//TODo: Implementation
export class bolc__Object {
  public _obj: HTMLInputsType;
  public _label: string | undefined = undefined;
  public type: string = '';
  public radioName: string = '';

  constructor(obj: HTMLInputsType) {
    this._obj = obj;
  }

  get visible(): boolean {
    if (!this._obj) return false;
    if (this._obj.style.display == '') return true;
    else return false;
  }

  set visible(newMode) {}

  get required(): boolean {
    if (!this._obj) return false;
    return this._obj.required;
  }

  get name(): string {
    return this._obj ? this._obj.name : '';
  }

  get label() {
    return this._obj ? this._obj.title : undefined;
  }

  set label(newValue) {
    if (this._obj) this._obj.title = newValue || '';
  }

  get id() {
    return this._obj ? this._obj.id : '';
  }

  get value() {
    return this._obj ? this._obj.value : '';
  }

  get isEmpty(): boolean | undefined {
    if (this._obj) return true;

    switch (this.type) {
      case 'checkbox':
        return (this._obj as HTMLInputElement).checked;
      case 'radio':
        //ToDo: Implementation of Function getField
        /* if (getField(this.name).value.trim() == '')  */
        return true;
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

  /**
   * this method is used to create an input
   * @param key is for input-id and input-name
   * @param NameReplacement is also for input-id and input-name
   * @returns is the created input as string
   */
  value2INPUT(key: string, NameReplacement?: string): string {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let valString = '';

    // Determine the value string based on the input type
    if (this.type === 'radio') {
      //TODo: Implementation of function getField
      valString = /* getField(this.radioName).value */ '';
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
  value2JSON(): string {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let fieldName = '';
    let fieldValue = '';

    if (this.type === 'radio') {
      // For radio buttons, use the radioName as the field name
      fieldName = this.radioName.replace('.', '_');
      //TODo: Implementation of function getField
      fieldValue = /* JSON.stringify(getField(this.radioName).value.trim()) */ '';
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
  value2XML(key: string) {
    // Check if the object exists
    if (!this._obj) {
      return '';
    }

    let fieldName = '';
    let fieldValue = '';

    if (this.type === 'radio') {
      // For radio buttons, use the radioName as the field name
      fieldName = this.radioName.replace('.', '_');
      //TODo: Implementation of function getField
      fieldValue = /* getField(this.radioName).value.trim() */ '';
    } else {
      // For other input types, use the name of the object as the field name
      fieldName = this._obj.name.replace('.', '_');
      fieldValue = this._obj.value.trim();
    }

    // Construct the XML string with the field name and field value
    return `<${key}_${fieldName}>${fieldValue}</${key}_${fieldName}>`;
  }
}
