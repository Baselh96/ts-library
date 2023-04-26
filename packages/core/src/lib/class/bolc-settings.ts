import { Tooltip } from 'bootstrap';
import { getDefaultMsgStrings } from '../data/msg-string-data';
import { ConfigString } from '../model/config-string.model';
import { FieldError } from '../model/field-error.model';
import { MsgString } from '../model/msg-string.model';

//To import the global variables in this file
import { GlobalVariables } from './../global-variable/globalVariable';

/***************************************************************************************************
 * Settings
 ***************************************************************************************************/
export class bolc__Settings {
  // Standard-Strings fuer Meldungen innerhalb der Bibliothek
  private MsgStrings: MsgString[];

  // welche bootstrap Hauptversion ist im Einsatz
  private bootstrapVersion: number = 0;

  // Sprache fuer Meldungen der Bibliothek
  private _formLanguage: string = 'de';
  // ist das Formular in UTF-8 oder ISO-8859-15 Verwendung
  private _formCodePage: string = 'UTF-8';

  // Level der Anzeige von Fehlermeldungen: 3 = bootstrap Dialog, 2 = alert, 1 = console, 0 = keine Anzeige
  private _modeError: number | undefined;
  // Auflistung der Fehlerfelder beim Check einer Seite oder eines Blocks von Feldern
  private _fdsError: FieldError[] = [];
  // Farbe fuer die Anzeige von Fehlern (Hintergrund)
  private _colorErrorBg: string = '';
  // Komplementaerfarbe fuer die Anzeige von Fehlern (Text)
  private _colorErrorFg: string = '';

  // soll bol Routine zum Dateiladen verwendet werden?
  private useLoad4Files: number | string | boolean | undefined;
  // soll das HTML-Attribut accept für Dateifelder verwendet werden
  private useAccept4Files: number | string | boolean | undefined;
  // zulaessige Dateierweiterungen und MIME-Types
  private fileTypes: number | string | boolean | undefined;
  // maximale Dateigroesse in MByte
  private FileMaxSize: number | string | boolean | undefined;
  // Umfang der im Formular bereits geladenen Dateien in MByte
  private FileSizes: number = 0;
  // JSON-array der im Formular geladenen Dateien
  private Files: File[] = [];

  private _page: any; //ToDo
  // soll ein Seiten-Check erfolgen oder nicht
  private _checkPage: boolean = true;
  private _CheckedPages: boolean[] = [];
  private _usablePages: boolean[] = [];
  // sollen erweiterte Fehlermeldungen auf der console ausgegeben werden
  private _modeDebug: boolean = false;
  // soll mit Erreichen der letzten Seite automatisch die Zusammenfassung erzeugt werden
  private _modeSummary: boolean = true;

  private _modeJSON4Send: boolean = false;

  // soll statt Symbol ein Stern fuer Pflichtfeld angezeigt werden
  private _useStar4required: boolean = false;
  // soll ein Pflichtfeldsymbol bei Radio's angezeigt werden
  private _useRadioRequired: boolean = true;
  // soll statt Symbol ein Text mit Link zur Feldinfo angezeigt werden
  private _useLink4Info: boolean = false;

  // array mit Feldern und alternativen Feldbezeichnungen fuer die Zusammenfassungsseite
  private _fdsAltNames: any[] = []; //ToDo
  // array mit Feldnamen, welche nicht auf der Zusammenfassungsseite anzuzeigen sind
  private fieldsNotInSummary: string[] = [];
  // array mit Feldnamen, welches Feld soll auf welcher Seite den Focus erhalten
  private pageFocus: any[] = [];
  // Rueckfrage, ob Feldinhalte aus einem Feld-Container geloescht werden sollen
  private _confirmClear: boolean = true;

  // Modus fuer das Zwischenspeichern: 2 = lokal, 1 = auf bol-Server
  private _ModeTemp: boolean = true;

  // sollen die Linien um die StepButton verwendet werden?
  private _StepButtonImage: boolean = true;
  // sollen automatisch Zahlen für StepButton verwendet werden?
  private _StepButtonCounter: boolean = false;
  private _StepButtonLayout: string = 'ib';
  // top | left
  private _StepButtonPosition: string = 'top';

  /*  allgemeine, oft verwendete Texte */

  // Texte fuer Tooltips
  // Text des Tootltips fuer Pflichtfelder
  private _ttRequired: string = '';
  // Text des Tootltips fuer Radiofelder
  private _ttRadioRequired: string = '';
  // Text des Tootltips zur Feldinfo
  private _ttInfo: string = '';
  private _ttDlgInfoTitle: string = '';

  private FieldNameConfigJSON: string = 'bol.FormSettings';

  // Name von bootstrap Symbolen zur Anzeige
  //private symbol_fieldrequired: string = "bi-star-fill";
  private symbol_fieldrequired: string = 'bi-star';
  private symbol_radiorequired: string = 'bi-star';
  private symbol_fieldinfo: string = '"bi-info-circle';
  //private symbol_up: string = "bi-caret-up-square";
  //private symbol_down: string = "bi-caret-down-square-fill";
  private symbol_up: string = 'bi-caret-up-square';
  private symbol_down: string = 'bi-caret-down-square-fill';
  private symbol_erase: string = 'bi-eraser-fill';
  private symbol_check: string = 'bi-check-circle';
  private symbol_delete: string = 'bi-trash';
  private symbol_help: string = 'bi-question-circle-fill';

  private ConfigString: ConfigString[] = [];

  constructor() {
    //to initialize the default values
    this.MsgStrings = getDefaultMsgStrings();

    //Check for bootstrap
    this.checkBootstrap();

    //Checking the variable bol__msg_strings_iso
    this.checkBol__msg_strings_iso();

    //Filling the _usablePages and _CheckedPages variables
    this.fillVariablePages();

    //Call load method
    this.Load();
  }

  /**
   * This returns whether bootstrap was used in the project.
   * @returns is a boolean value
   */
  get isBootstrap(): boolean {
    return this.bootstrapVersion !== 0;
  }

  /**
   * to get the value of variable ModeError.
   * @returns is the _modeError value
   */
  get ModeError(): number | undefined {
    return !this.isBootstrap && this._modeError == 3 ? 2 : this._modeError;
  }

  /**
   * to get the value of variable _page.
   * @returns is the _page value
   */
  get page(): any {
    return this._page;
  }

  /**
   * to set the value of variable _page.
   */
  set page(newValue: any) {
    sessionStorage.setItem('bol_active_page', newValue);
    this._page = newValue;
    this.Save();
  }

  /**
   * to get value of variable _checkPage.
   * @returns is the _checkPage value
   */
  get PageCheck(): boolean | undefined {
    return this._checkPage;
  }

  /**
   * to set the value of variable _checkPage.
   */
  set PageCheck(newValue: boolean | undefined) {
    this._checkPage = newValue != undefined && !newValue ? false : true;
  }

  /**
   * this method checks if bootstrap is used and if so then which bootstrap version.
   * Consequently the variable bootstrapVersion is set.
   */
  private checkBootstrap(): void {
    try {
      const bsv = Tooltip.VERSION.substr(0, 1);
      this.bootstrapVersion = parseInt(bsv);
    } catch (error) {
      this.bootstrapVersion = 0;
    }
  }

  /**
   * this method checks if the file "bol__msg_strings_iso" were loaded using tags.
   * If yes: then we change _formCodePage and we fill MsgStrings with the data of the loaded file.
   */
  private checkBol__msg_strings_iso(): void {
   // const bol__msg_strings_iso = undefined;
    if (bol__msg_strings_iso) {
      this._formCodePage = 'ISO-8859-15';
      this.MsgStrings = bol__msg_strings_iso;
    }
  }

  /**
   * this method is used to fill the variables _usablePages and _CheckedPages according to the number
   * of div elements with Id: Page
   */
  private fillVariablePages(): void {
    let e = document.querySelectorAll('div.row[id^=page]');
    this._usablePages.fill(true, 0, e.length);
    this._CheckedPages.fill(false, 0, e.length);
  }

  public Load(): void {}

  public Save(): void {}

}
