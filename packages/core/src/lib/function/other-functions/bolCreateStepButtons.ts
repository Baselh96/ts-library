import { InitForm } from '../../class/initForm';

/**
 * Updates the visibility of step buttons based on the provided pages and sets the info text.
 * @param Pages An array of page numbers for which the corresponding step buttons should be shown.
 * @param InfoText The information text to be set.
 */
export function bolCreateStepButtons(Pages: number[], InfoText: string): void {
  // Get the necessary properties and methods from InitForm.bolSteps object
  const { Buttons, buttonHide, buttonShow } = InitForm.bolSteps;

  // Hide all step buttons initially
  Buttons.forEach((button) => buttonHide(button.page));

  // Show the step buttons for the specified pages
  Pages.forEach((page) => {
    // Find the matching button for the current page
    const matchedButton = Buttons.find((button) => button.page === page);

    // If a matching button is found, show it
    if (matchedButton) {
      buttonShow(page);
    }
  });

  // Set the info text
  InitForm.bolSteps._infoText = InfoText ?? '';
}
