import { bolc__Settings } from './bolc-settings';

//TODo: Implementation
export class bolc__Page {
  //Is an instance of the Settings class, which we get as a parameter in the configuration.
  private bolSettings: bolc__Settings;

  constructor(bolSettings: bolc__Settings) {
    this.bolSettings = bolSettings;
  }

  get active() {
    let i = this.bolSettings.page;
    if (i != 0) return i;
    else return 1;
  }

  get max() {
    let e = document.querySelectorAll('div.row[id^=page]');
    if (e == undefined) return 0;
    else return e.length;
  }

  public async goTo(pgNo: number) {
    return this.active;
  }
}
