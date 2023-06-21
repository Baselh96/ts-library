import { InitForm } from "../../class/initForm";

/**
 * This function creates a PDF document from the current form data
 */
export function bolForm2PDF(initForm: InitForm) {
    initForm.bolForm.PDFfilled();
}