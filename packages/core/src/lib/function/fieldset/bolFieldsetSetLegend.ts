import { bolc__Fieldset } from '../../class/bolc__Fieldset';
import { InitForm } from '../../class/initForm';

export function bolFieldsetSetLegend(oname: string, newText: string): void {
  const e = new bolc__Fieldset(InitForm.bolSettings, oname);
  e.title = newText;
}
