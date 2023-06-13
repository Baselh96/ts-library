import { setFieldsFromLocalStorage } from '../function/helper/setFieldsFromLocalStorage';
import { SplitStreet } from '../function/helper/splitStreet';
import { getField } from '../function/other-functions/getField';
import { HTMLInputsType } from '../type/htmlInputsType';
import { InitForm } from './initForm';

/********************* Buergerservice Konto ************************/
export class bolc__BSK {
  private authenticated?: boolean;
  private localStoreHeader?: string;
  private bol__SKFieldMapping: any;

  constructor(bol__SKFieldMapping: any, public getNthFieldName: (n: number) => string) {
    this.bol__SKFieldMapping = bol__SKFieldMapping;

    // Retrieve the form type element
    const e = document.getElementById('Form.FormGenerate#1.FormType#1');

    // If the form type element is not found, exit the constructor
    if (!e) return;

    // Set the local store header based on the form type value
    this.localStoreHeader = 'bolSK_' + (e as HTMLInputsType).value + '.';

    // Check if there are stored form field values
    if (localStorage.getItem(this.localStoreHeader + '_FormFieldList')) {
      this.authenticated = true;
      this.MapValues();
    } else {
      this.authenticated = false;
    }

    // Call LocalStoreInit() if authenticated
    if (this.authenticated) {
      this.LocalStoreInit();
    }
  }

  RunSK_KAAW(numFields?: number) {
    const url =
      '/NetFiller?_ID_=' +
      (getField('NetFillerConfiguration') as HTMLInputsType).value +
      '&sendRedirect=true&htmlValue=';

    this.constructUrl(url, numFields? numFields : 0);
  }

  /**
   * Runs the form based on the current location URL.
   * If running locally (file://), saves form field values to the local store and reloads the page.
   * Otherwise, if the serviceURL parameter is provided, constructs the URL and opens it in the current window.
   */
  public Run(serviceURL?: string, numFields?: number): void {
    // If running locally (file://)
    if (location.href.indexOf('file://') >= 0) {
      // Save form field values to the local store
      this.LocalStoreSave(numFields? numFields : 0);
      // Reload the page
      window.location.reload();
    } else {
      // If serviceURL is not provided, return
      if (serviceURL == undefined) return;

      this.constructUrl(serviceURL, numFields? numFields : 0);
    }
  }

  /**
   * Constructs the URL and opens it in the current window
   */
  private constructUrl(urlPart: string, numFields: number): void {
    // Get the base URL from the form field
    let url = (getField('Form.FormPublish#2.NetFillerURL#7') as HTMLInputsType)
      .value;
    // Get the findform URL from the form field
    const findform = (
      getField('Form.FormPublish#2.FindformURL#6') as HTMLInputsType
    ).value;
    // Construct the final URL
    url = url + urlPart + encodeURIComponent(findform);
    // If the URL is not empty
    if (url != '') {
      // Save form field values to the local store
      this.LocalStoreSave(numFields);
      // Open the URL in the current window
      window.open(url, '_self');
    }
  }

  /**
   * Initializes the local store by checking for existing stored data and loading it if available.
   * Clears the local store afterwards.
   * @private
   */
  private LocalStoreInit(): void {
    // Check if there are any stored data
    const fieldlist = localStorage.getItem(
      this.localStoreHeader + '_FormFieldList'
    );

    // If there are no stored data, exit the function
    if (!fieldlist || fieldlist.length == 0) return;

    // Load the stored data
    this.LocalStoreLoad();

    // Reset the local store by clearing the stored data
    this.LocalStoreReset();
  }

  /**
   * Saves the form field values to the local store.
   * Retrieves the field names and values, and stores them in the local store.
   * Also stores the active page in the local store.
   */
  LocalStoreSave(numFields: number) {
    const fieldlist = [];

    for (let i = 0; i < numFields; i++) {
      // Get the field
      const field = getField(this.getNthFieldName(i)) as HTMLInputsType;

      // Skip fields that are empty, hidden, or of certain types
      if (
        !field ||
        field.value == undefined ||
        field.value == '' ||
        field.type == 'button' ||
        field.type == 'submit' ||
        field.name == ''
      ) {
        continue;
      }

      // Trim the value of text and textarea fields
      if (field.type == 'text' || field.type == 'textarea') {
        field.value = field.value.trim();
      }

      if (field.value != '') {
        // Save the field value to the local store
        localStorage.setItem(this.localStoreHeader + field.name, field.value);

        // Add the field name to the field list
        fieldlist.push(field.name);
      }
    }

    // Save the active page to the local store
    localStorage.setItem(
      this.localStoreHeader + '_active_page',
      InitForm.bolPage.active.toString()
    );

    // Add the active page to the field list
    fieldlist.push('active_page');

    // Save the field list to the local store
    localStorage.setItem(
      this.localStoreHeader + '_FormFieldList',
      fieldlist.toString()
    );
  }

  /**
   * Loads form field values from the local store.
   * Sets fields' values from the local store using the setFieldsFromLocalStorage() method.
   * Retrieves the field mapping.
   * For testing purposes when running locally, fills some fields with default values.
   * Maps the values to the corresponding fields.
   */
  private LocalStoreLoad() {
    // Set fields' values from the local store
    setFieldsFromLocalStorage(this.localStoreHeader || '');

    const fds = this.bol__SKFieldMapping;

    // If the field mapping is not available, return
    if (!fds) return;

    // Fill some fields with default values for testing purposes when running locally
    if (location.href.indexOf('file://') >= 0) {
      fds.forEach((field: any, index: number) => {
        if (field.fdTec || field.fdForm == undefined || field.fdForm == '')
          return;

        const e = document.getElementById(field.fdSK) as HTMLInputsType;
        if (e == undefined) return;

        switch (field.fdSK) {
          case 'Nachname':
            e.value = 'Mustermann-SK';
            break;
          case 'Vorname':
            e.value = 'Max-SK';
            break;
          case 'Telefonnummer':
            e.value = '01-234567';
            break;
          case 'AdressePLZ':
            e.value = '12345';
            break;
          case 'AdresseOrt':
            e.value = 'Musterdorf';
            break;
          case 'AdresseStrasseHnr':
            e.value = 'Musterweg 21';
            break;
          case 'Geburtsdatum':
            e.value = '01.01.2001';
            break;
          default:
            e.value = 'V ' + index;
        }
      });
    }

    // Map the values to the corresponding fields
    this.MapValues();
  }

  /**
   * Resets the local store by removing all stored form field values and the active page.
   * Retrieves the field list from the local store and removes each field value.
   * Also removes the active page and the field list itself from the local store.
   */
  private LocalStoreReset() {
    const fieldlist = localStorage
      .getItem(this.localStoreHeader + '_FormFieldList')
      ?.split(',');

    // If there is no field list or it is empty, return
    if (!fieldlist || fieldlist.length === 0) return;

    // Remove each field value from the local store
    fieldlist.forEach((field) => {
      localStorage.removeItem(this.localStoreHeader + field);
    });

    // Remove the active page from the local store
    localStorage.removeItem(this.localStoreHeader + '_active_page');

    // Remove the field list itself from the local store
    localStorage.removeItem(this.localStoreHeader + '_FormFieldList');
  }

  /**
   * Maps values from the source fields to the destination fields based on the field mapping configuration.
   */
  public MapValues() {
    const fds = this.bol__SKFieldMapping;

    // If the field mapping is not defined, return
    if (fds == undefined) return;

    // Iterate over each field mapping
    fds.forEach((field: any, index: number) => {
      // Skip if the field is technical or the destination field is not defined
      if (field.fdTec || field.fdForm == undefined || field.fdForm == '')
        return;

      const e = document.getElementById(field.fdSK) as HTMLInputsType; // Get the source field element
      const f = document.getElementById(field.fdForm) as HTMLInputsType; // Get the destination field element

      // Skip if either the source field or the destination field is not found
      if (!e || !f) return;

      if (field.splitInto != undefined) {
        const splitIntos = field.splitInto.split(',');
        SplitStreet(field.fdSK, splitIntos[0], splitIntos[1]); // Split the street value if required
      }

      (getField(field.fdForm) as HTMLInputsType).value = e.value; // Set the value of the destination field to the value of the source field

      if (e.value != '')
        (getField(field.fdForm) as any).readonly = field.disabled; // Set the readonly property of the destination field based on the 'disabled' flag
    });

    // Update the value of the 'bol.textSK_LoggedIn' or 'BSK_textLoggedIn' field if available
    let msgf = 'bol.textSK_LoggedIn';
    let e = document.getElementById(msgf);

    if (!e) {
      msgf = 'BSK_textLoggedIn';
      e = document.getElementById(msgf);
    }

    if (e)
      (getField(msgf) as HTMLInputsType).value =
        'mittels Servicekonto authentifiziert';
  }
}
