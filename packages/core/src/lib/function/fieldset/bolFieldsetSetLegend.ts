import { bolc__Settings } from '../../class';
import { bolc__Fieldset } from '../../class/bolc__Fieldset';

export function bolFieldsetSetLegend(bolSettings: bolc__Settings, oname: string, newText: string): void {
  const e = new bolc__Fieldset(bolSettings, oname);
  e.title = newText;
}
