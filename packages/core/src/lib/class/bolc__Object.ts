//TODo: Implementation
export class bolc__Object {
  public _obj: HTMLElement | null;

  constructor(obj: HTMLElement| null) {
    this._obj = obj;
  }

  get visible() {
    if (this._obj == undefined) return false;
    if (this._obj.style.display == '') return true;
    else return false;
  }

  set visible(newMode) {}
}
