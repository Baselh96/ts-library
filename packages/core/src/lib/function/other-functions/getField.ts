import { FieldType } from '../../type/fieldType';
import { getGroupAttribute } from './getGroupAttribute';
import { getGroupValue } from './getGroupValue';
import { isNodeList } from './isNodeList';
import { setGroupAttribute } from './setGroupAttribute';
import { setGroupValue } from './setGroupValue';

/**
 * this method retrieves and handles different types of form 
 * fields based on the given fieldname
 * @param fieldname is the name of the field
 */
export function getField(fieldname: string): FieldType | null | undefined {
  if (fieldname.length === 0) return;

  // Retrieve the field by its ID
  let field: FieldType | null = document.getElementById(fieldname);

  // Retrieve the field by its ID
  if (field instanceof HTMLInputElement && field.type === 'radio') {
    if (document.forms[0]) {
      const elements = document.forms[0].elements.namedItem(fieldname);
      console.log(elements);
      if (elements) {
        if (isNodeList(elements)) {
          field = elements as RadioNodeList;
        } else {
          field = [elements as RadioNodeList];
        }
      } else {
        field = null;
      }
    }
  }

  // Handle group fields
  if (field === null && document.forms[0]) {
    const elements = document.forms[0].elements;
    const array = [];
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].id.indexOf(fieldname + '.') == 0)
        array.push(elements[index] as HTMLElement);
    }
    if (array.length > 0) field = array;
  }

  // Return null if the field is still null
  if (field === null) return null;

  // Handle group fields (RadioNodeList)
  if (isNodeList(field)) {
    // Add additional properties and getters/setters to the field object
    // based on the field type and behavior

    if (!('groupName' in field)) {
      Object.defineProperty(field, 'groupName', {
        value: fieldname,
        writable: false,
      });
    }

    if (!('required' in field)) {
      Object.defineProperty(field, 'required', {
        set: function (v) {
          setGroupAttribute(this.groupName, 'required', v ? true : false);
        },
        get: function () {
          return getGroupAttribute(this.groupName, 'required');
        },
      });
    }

    if (
      !('type' in field) &&
      (field instanceof RadioNodeList || field instanceof Array) &&
      field[0] &&
      field[0] instanceof HTMLInputElement &&
      field[0].type === 'radio'
    ) {
      Object.defineProperty(field, 'type', {
        value: 'radiobutton',
        writable: false,
      });
    }

    if (!('value' in field)) {
      Object.defineProperty(field, 'value', {
        set: function (v) {
          setGroupValue(this.groupName, v);
        },
        get: function () {
          return getGroupValue(this.groupName);
        },
      });
    }

    handleProperty('display', field);
    handleProperty('fillColor', field);

    if (!('readonly' in field)) {
      Object.defineProperty(field, 'readonly', {
        set: function (v) {
          setGroupAttribute(this.groupName, 'readOnly', v);
          setGroupAttribute(this.groupName, 'disabled', v);
        },
        get: function () {
          return getGroupAttribute(this.groupName, 'readOnly');
        },
      });
    }

    handleProperty('disabled', field);
    handleProperty('userName', field);

    if (!('name' in field)) {
      Object.defineProperty(field, 'name', {
        value: fieldname,
        writable: false,
      });
    }

    if (!('setFocus' in field)) {
      Object.defineProperty(field, 'setFocus', {
        set: function () {
          const group = document.forms[0].elements.namedItem(this.groupName);
          if (!group) return;

          ((group as RadioNodeList)[0] as HTMLInputElement).focus();
        },
      });
    }
  }

  return field;
}

function handleProperty(property: string, field: FieldType): void {
  // Check if the property exists in the field object
  if (!(property in field)) {
    // Define a new property on the field object using Object.defineProperty
    Object.defineProperty(field, property, {
      // Setter function for the property
      set: function (v) {
        // Call the custom setGroupAttribute function with the groupName, property, and value as arguments
        setGroupAttribute(this.groupName, property, v);
      },
      // Getter function for the property
      get: function () {
        // Call the custom getGroupAttribute function with the groupName and property as arguments
        return getGroupAttribute(this.groupName, property);
      },
    });
  }
}
