import { bolc__Dialog, bolc__Object } from '../../class';
import { bol_FileCheck } from './bol_FileCheck';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * The method bol_FileLoad is responsible for handling the file loading functionality. 
 * It takes an e object as a parameter, which represents the file input field object
 */
export function bol_FileLoad(e: bolc__Object, bolSettings: bolc__Settings, bolDialog: bolc__Dialog): void {
  // If the object is null or value is empty, return
  if (!e || e.value.length === 0) return; 
  
  // Check for file errors using bol_FileCheck function
  const errorType = bol_FileCheck(bolSettings, e.name); 
  
  switch (errorType) {
    case 4:
    case 3:
      // Show error message for invalid file types (2 = error type for invalid file types)
      bolDialog.ShowErrorFile(2); 
      // Clear the value of the file input field
      e.value = ''; 
      break;
    case 5:
    case 2:
    case 1:
      // Show error message for file size errors (1 = error type for file size errors)
      bolDialog.ShowErrorFile(1); 
      // Clear the value of the file input field
      e.value = '';
      break;
    default:
      break;
  }
}
