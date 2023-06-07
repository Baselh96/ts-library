type BImSch_FormModeTypes =
  | 'local'
  | 'portalNew'
  | 'portalOpen'
  | 'findform'
  | 'localSaved';

export class Storage {
  private _formMode: BImSch_FormModeTypes = 'local';
  private _useSimulation = false;
  private _useLocalSave = false;
  private _mdURLPortal = '';
  private _md_UUID = '';
  private _md_processNr = '';
  private _md_URL_resolver = '';

  makeGetter(privateKey: string, publicKey: string) {
    try {
      const aux = localStorage.getItem(publicKey);
      if (typeof aux !== 'undefined') return aux;
      return this[privateKey];
    } catch (e) {
      return this[privateKey];
    }
  }

  set useSimulation(val: boolean) {
    localStorage.setItem('useSimulation', val.toString());
  }

  get useSimulation() {
    return this.makeGetter('_useSimulation', 'useSimulation') === 'true';
  }

  set BImSch_FormMode(val: BImSch_FormModeTypes) {
    localStorage.setItem('BImSch_FormMode', val);
  }

  get BImSch_FormMode() {
    return this.makeGetter('_formMode', 'BImSch_FormMode');
  }

  set md_URL_portal(val: string) {
    localStorage.setItem('md_URL_portal', val);
  }

  get md_URL_portal() {
    return this.makeGetter('_mdURLPortal', 'md_URL_portal');
  }

  set md_UUID(val: string) {
    localStorage.setItem('md_UUID', val);
  }

  get md_UUID() {
    return this.makeGetter('_md_UUID', 'md_UUID');
  }

  set md_processNr(val: string) {
    localStorage.setItem('md_processNr', val);
  }

  get md_processNr() {
    return this.makeGetter('md_processNr', '_md_processNr');
  }

  set useLocalSave(val: boolean) {
    localStorage.setItem('useLocalSave', val.toString());
  }

  get useLocalSave() {
    return this.makeGetter('useLocalSave', '_useLocalSave');
  }

  set md_URL_resolver(val: string) {
    localStorage.setItem('md_URL_resolver', val);
  }

  get md_URL_resolver() {
    return this.makeGetter('md_URL_resolver', '_md_URL_resolver');
  }
}

export default new Storage();
