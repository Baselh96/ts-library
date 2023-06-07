import { getField } from '../other-functions/getField';
import { bolClear } from './bolClear';
import { bolHide } from './bolHide';
import { bolShow } from './bolShow';

/**
 * Hides or clears elements based on conditions and values.
 * @param oname1 The name or ID of the first element to be processed.
 * @param oname2 The name or ID of the second element (optional).
 * @param val2Show The value used for comparison (optional).
 */
export function bolHideClear(
  oname1: string,
  oname2?: string,
  val2Show?: string
): void {
  // Find the element with the specified oname1
  const element1 =
    document.getElementById(oname1) || (getField(oname1) as HTMLElement);

  // If the element is not found, return immediately
  if (!element1) {
    return;
  }

  // Check if the element is a div, fieldset, or oname2 is not provided
  const isContainerElement =
    element1.tagName.toLowerCase() === 'div' ||
    element1.tagName.toLowerCase() === 'fieldset';

  if (isContainerElement || !oname2) {
    bolHideAndClear(oname1);
    return;
  }

  // Check if the element is an HTMLInputElement of type checkbox
  if (element1 instanceof HTMLInputElement && element1.type === 'checkbox') {
    handleCheckboxInput(element1, oname2, val2Show);
  } else {
    if (
      element1 instanceof HTMLInputElement &&
      element1.value.toLowerCase() == val2Show.toLowerCase()
    ) {
      // If the value of the element matches val2Show (case-insensitive), show the element specified by oname2
      bolShow(oname2);
    } else {
      // If the value of the element does not match val2Show, hide and clear the element specified by oname2
      bolHideAndClear(oname2);
    }
  }
      }
    } else {
      bolHideAndClear(oname2);
    }
  } else {
    if (val2Show === undefined) {
      bolHideAndClear(oname2);
    } else {
      bolShow(oname2 || '');
    }
  }
    }
  }
}
