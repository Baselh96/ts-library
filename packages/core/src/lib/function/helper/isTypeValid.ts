import { bolc__Settings } from '../../class/bolc__Settings';

export function IsTypeValid(bolSettings: bolc__Settings, file?: File): boolean {
    // If file is not provided or is undefined, return false
    if (!file) {
      return false;
    }
  
    // Split the file name by periods to extract the file extension
    const fileNameParts = file.name.split(".");
    const fileExtension = "." + fileNameParts[fileNameParts.length - 1].toLowerCase().trim();
  
    // Get the allowed file types from bolSettings and convert them to lowercase
    const allowedFileTypes = (bolSettings.fileTypes as string).toLowerCase();
  
    // Check if the file extension is present in the allowed file types
    if (allowedFileTypes.includes(fileExtension)) {
      return true;
    }
  
    // Check if the file type (MIME type) is present in the allowed file types
    if (allowedFileTypes.includes(file.type.toLowerCase())) {
      return true;
    }
  
    // Neither the file extension nor the file type is in the allowed file types
    return false;
  }
  