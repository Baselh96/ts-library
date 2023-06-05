type BImSch_FormModeTypes =
  | 'local'
  | 'portalNew'
  | 'portalOpen'
  | 'findform'
  | 'localSaved';

export class Storage {
  private formMode: BImSch_FormModeTypes = 'local';
  private simulation = false;

  set useSimulation(val: boolean) {
    localStorage.setItem('useSimulation', val.toString());
  }

  get useSimulation() {
    try {
      const useSimulation = localStorage.getItem('useSimulation');
      if (typeof useSimulation !== 'undefined') return useSimulation === 'true';
      return this.simulation;
    } catch (e) {
      return this.simulation;
    }
  }

  set BImSch_FormMode(val: BImSch_FormModeTypes) {
    localStorage.setItem('formMode', val);
  }

  get BImSch_FormMode() {
    try {
      const formMode = localStorage.getItem('formMode') as BImSch_FormModeTypes;
      if (typeof formMode !== 'undefined') return formMode;
      return this.formMode;
    } catch (e) {
      return this.formMode;
    }
  }
}
