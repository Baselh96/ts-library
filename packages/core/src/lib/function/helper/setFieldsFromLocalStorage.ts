import { InitForm } from "../../class/initForm";
import { HTMLInputsType } from "../../type/htmlInputsType";
import { getField } from "../other-functions/getField";

/**
   * Sets the form fields' values from the local store.
   * Retrieves the field list from the local store and the active page.
   * Sets the active page based on the stored value.
   * Retrieves each field value from the local store and updates the corresponding field.
   */
export function setFieldsFromLocalStorage(localStoreHeader: string): void {
    const fieldlist = localStorage
      .getItem(localStoreHeader + '_FormFieldList')
      ?.split(',');

    // If there is no field list or it is empty, return
    if (!fieldlist || fieldlist.length === 0) return;

    const pg =
      localStorage.getItem(localStoreHeader + '_active_page') || '1';

    // Set the active page based on the stored value
    InitForm.bolPage.Switch(parseInt(pg));

    // Retrieve each field value from the local store and update the corresponding field
    fieldlist.forEach((item) => {
      const field = getField(item) as HTMLInputsType;
      if (field) {
        field.value =
          localStorage.getItem(localStoreHeader + '' + field) || '';
      }
    });
  }