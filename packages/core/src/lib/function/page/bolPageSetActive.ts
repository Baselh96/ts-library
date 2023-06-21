import { InitForm } from '../../class/initForm';

export function bolPageSetActive(initForm: InitForm) {
  initForm.bolPage.goTo(initForm.bolSettings.page);
}
