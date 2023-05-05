export class bolc__Object {
  private _obj: any;

  constructor(obj: any) {}

  get visible() {
    if (this._obj == undefined) return false;
    if (this._obj.style.display == '') return true;
    else return false;
  }

  set visible(newMode) {
    /* switch (newMode) {
      case 'Ja':
      case 'ja':
      case 'j':
      case 'yes':
      case true:
      case 1:
        this.Show();
        break;
      default:
        this.Hide();
    } */
  }
}
