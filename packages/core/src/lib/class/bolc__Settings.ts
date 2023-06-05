/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { getDefaultMsgStrings } from '../data/msg-string-data';
import { ConfigString } from '../model/config-string.model';
import { FieldError } from '../model/field-error.model';
import { MsgString } from '../model/msg-string.model';
import { bolGetTimeStamp } from '../function';
import { ConfigStringValue } from '../type/configStringValue.type';
import { File } from '../model/file.model';
import { checkBootstrap } from '../function/helper/checkBootstrap';
import { createHTMLInput } from '../function/helper/createHTMLInput';
import { updateHtmlTextOfFileSizes } from '../function/helper/updateHtmlTextOfFileSizes';
import { getCssVariable } from '../function/helper/getCssVariable';
import { msgStringHelper } from '../function/helper/msgstringHelper';

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
  public _modeError: number | undefined;
  // Auflistung der Fehlerfelder beim Check einer Seite oder eines Blocks von Feldern
  public _fdsError: FieldError[] = [];
  // Farbe fuer die Anzeige von Fehlern (Hintergrund)
  public _colorErrorBg: string = '';
  // Komplementaerfarbe fuer die Anzeige von Fehlern (Text)
  public _colorErrorFg: string = '';

  // soll bol Routine zum Dateiladen verwendet werden?
  public useLoad4Files: ConfigStringValue | undefined;
  // soll das HTML-Attribut accept für Dateifelder verwendet werden
  public useAccept4Files: ConfigStringValue | undefined;
  // zulaessige Dateierweiterungen und MIME-Types
  public fileTypes: ConfigStringValue | undefined;
  // maximale Dateigroesse in MByte
  public FileMaxSize: ConfigStringValue | undefined;
  // Umfang der im Formular bereits geladenen Dateien in MByte
  private FileSizes: number = 0;
  // JSON-array der im Formular geladenen Dateien
  private Files: File[] = [];

  private _page: number = 1;
  // soll ein Seiten-Check erfolgen oder nicht
  public _checkPage: boolean = true;
  public _CheckedPages: boolean[] = [];
  public _usablePages: boolean[] = [];
  // sollen erweiterte Fehlermeldungen auf der console ausgegeben werden
  public _modeDebug: boolean = false;
  // soll mit Erreichen der letzten Seite automatisch die Zusammenfassung erzeugt werden
  public _modeSummary: boolean = true;

  public _modeJSON4Send: boolean = false;

  // soll statt Symbol ein Stern fuer Pflichtfeld angezeigt werden
  public _useStar4required: boolean = false;
  // soll ein Pflichtfeldsymbol bei Radio's angezeigt werden
  public _useRadioRequired: boolean = true;
  // soll statt Symbol ein Text mit Link zur Feldinfo angezeigt werden
  public _useLink4Info: boolean = false;

  // array mit Feldern und alternativen Feldbezeichnungen fuer die Zusammenfassungsseite
  private _fdsAltNames: any[] = []; //ToDo
  // array mit Feldnamen, welche nicht auf der Zusammenfassungsseite anzuzeigen sind
  public fieldsNotInSummary: string[] = [];
  // array mit Feldnamen, welches Feld soll auf welcher Seite den Focus erhalten
  public pageFocus: any[] = [];
  // Rueckfrage, ob Feldinhalte aus einem Feld-Container geloescht werden sollen
  private _confirmClear: boolean = true;

  // Modus fuer das Zwischenspeichern: 2 = lokal, 1 = auf bol-Server
  private _ModeTemp: boolean = true;
  public TempMode: number = 0;

  // sollen die Linien um die StepButton verwendet werden?
  public _StepButtonImage: boolean = true;
  // sollen automatisch Zahlen für StepButton verwendet werden?
  public _StepButtonCounter: boolean = false;
  public _StepButtonLayout: string = 'ib';
  // top | left
  public _StepButtonPosition: string = 'top';

  /*  allgemeine, oft verwendete Texte */

  // Texte fuer Tooltips
  // Text des Tootltips fuer Pflichtfelder
  public _ttRequired: string = '';
  // Text des Tootltips fuer Radiofelder
  public _ttRadioRequired: string = '';
  // Text des Tootltips zur Feldinfo
  public _ttInfo: string = '';
  public _ttDlgInfoTitle: string = '';

  public FieldNameConfigJSON: string = 'bol.FormSettings';

  // Name von bootstrap Symbolen zur Anzeige
  //private symbol_fieldrequired: string = 'bi-star-fill';
  public symbol_fieldrequired: string = 'bi-star';
  public symbol_radiorequired: string = 'bi-star';
  public symbol_fieldinfo: string = 'bi-info-circle';
  //private symbol_up: string = 'bi-caret-up-square';
  //private symbol_down: string = 'bi-caret-down-square-fill';
  public symbol_up: string = 'bi-caret-up-square';
  public symbol_down: string = 'bi-caret-down-square-fill';
  public symbol_erase: string = 'bi-eraser-fill';
  public symbol_check: string = 'bi-check-circle';
  public symbol_delete: string = 'bi-trash';
  public symbol_help: string = 'bi-question-circle-fill';

  private ConfigString: ConfigString[] = [];

  constructor(
    private configJson: any,
    private bol__msg_strings_iso?: any[],
    public bol__control_names?: any[],
    public contoll_names?: any[]
  ) {
    //to initialize the default values
    this.MsgStrings = getDefaultMsgStrings();

    //Check for bootstrap
    this.bootstrapVersion = checkBootstrap();

    //Checking the variable bol__msg_strings_iso
    this.checkBol__msg_strings_iso(bol__msg_strings_iso);

    //Filling the _usablePages and _CheckedPages variables
    this.fillVariablePages();

    //Call load method
    this.Load(configJson);
  }

  //Setter and getter for the variables
  get isBootstrap(): boolean {
    return this.bootstrapVersion !== 0;
  }

  get ModeError(): number | undefined {
    return !this.isBootstrap && this._modeError == 3 ? 2 : this._modeError;
  }

  get page(): number {
    return this._page;
  }
  set page(newValue: number) {
    sessionStorage.setItem('bol_active_page', JSON.stringify(newValue));
    this._page = newValue;
    this.Save();
  }

  get PageCheck(): boolean | undefined {
    return this._checkPage;
  }
  set PageCheck(newValue: boolean | undefined) {
    this._checkPage = newValue && !newValue ? false : true;
  }

  get PageChecked() {
    return this._CheckedPages[this.page - 1];
  }
  set PageChecked(newValue: boolean) {
    this._CheckedPages[this.page - 1] = newValue;
    this.Save();
  }

  getPageChecked(pgNo: number) {
    return this._CheckedPages[pgNo - 1];
  }
  setPageChecked(pgNo: number, newValue: boolean) {
    this._CheckedPages[pgNo - 1] = newValue;
  }

  get SKauthentication(): boolean {
    return this.findConfigString('SKauthentication') ? true : false;
  }
  set SKauthentication(newValue: boolean) {
    if (newValue) {
      this.addToConfigStrings('SKauthentication', true);
      this.Save();
    }
  }

  get DialogMode() {
    return this.getValue('DialogMode', 3);
  }
  set DialogMode(newValue: ConfigStringValue) {
    const item: ConfigString | undefined = this.findConfigString('DialogMode');
    item
      ? (item.value = newValue)
      : this.ConfigString.push(new ConfigString('DialogMode', 3));
    this.Save();
  }

  get TimeStampSave(): ConfigStringValue {
    const item: ConfigString | undefined =
      this.findConfigString('TimeStampSave');
    return item ? item.value : '';
  }
  set TimeStampSave(newValue: ConfigStringValue) {
    this.addToConfigStrings('TimeStampSave', bolGetTimeStamp());
    this.Save();
  }

  get TimeStampSend(): ConfigStringValue {
    const item: ConfigString | undefined =
      this.findConfigString('TimeStampSend');
    return item ? item.value : '';
  }
  set TimeStampSend(newValue: ConfigStringValue) {
    this.addToConfigStrings('TimeStampSend', bolGetTimeStamp());
    this.Save();
  }

  get FieldNamesAlternative() {
    if (this._fdsAltNames == undefined) {
      let arf: any;

      try {
        arf = this.bol__control_names;
      } catch (err) {} // Version 1.x

      if (arf) {
        this._fdsAltNames = arf;
      } else {
        try {
          arf = this.contoll_names;
        } catch (err) {} // bol OZG Original
        if (arf) this._fdsAltNames = arf;
      }
    }

    return this._fdsAltNames;
  }
  set FieldNamesAlternative(newValue: any[]) {
    this._fdsAltNames = newValue;
  }

  get language(): string {
    return this._formLanguage;
  }

  /**
   * this method checks if the file 'bol__msg_strings_iso' were loaded using tags.
   * If yes: then we change _formCodePage and we fill MsgStrings with the data of the loaded file.
   */
  private checkBol__msg_strings_iso(bol__msg_strings_iso?: any[]): void {
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
    const e = document.querySelectorAll('div.row[id^=page]');
    this._usablePages.fill(true, 0, e.length);
    this._CheckedPages.fill(false, 0, e.length);
  }

  /**
   * Load a configuration from the hidden INPUT and
   * if not existing, create it
   */
  public Load(configJson: any): void {
    // Herewith we search for the HTML-ELement
    let input: HTMLInputElement | undefined = document.getElementById(
      this.FieldNameConfigJSON
    ) as HTMLInputElement;

    if (configJson != undefined) {
      this.ConfigString = configJson;
    } else {
      if (input && input.value != '') {
        //If the HTMLInputElement exists and its value is not empty, then we assign its value to variable ConfigString
        this.ConfigString = JSON.parse(input.value);
      } else {
        //In the other case, we create an input and add a value to it and attach it to our form.
        input = createHTMLInput(this.FieldNameConfigJSON);

        const form: HTMLCollectionOf<HTMLFormElement> =
          document.getElementsByTagName('form');

        //Here we append the InputElement to the first shape found,
        //if there is at least one shape found
        if (form && form.length !== 0) {
          form[0].appendChild(input);
          this.ConfigString = JSON.parse(input.value);
        }
      }
    }

    //To initialize some variables
    this.initOtherVariables();

    //To check NavigatorString and TimeStampLoad from ConfigString list
    this.addToConfigStrings('NavigatorString', navigator.userAgent);
    this.addToConfigStrings('TimeStampLoad', bolGetTimeStamp());

    //to delete the content of field to output the total size of uploads, if it exists
    updateHtmlTextOfFileSizes('');
  }

  /**
   * Here some variables are filled.
   * If they are not in the ConfigString list, they are initialized with default-values.
   */
  private initOtherVariables(): void {
    this.page = this.getValue('active_page_number', 1) as number;
    this._modeJSON4Send = this.getValue('JSONstringify', false) as boolean;
    this._modeError = this.getValue('ModeError', 3) as number;
    this._modeDebug = this.getValue('ModeDebug', false) as boolean;
    this._checkPage = this.getValue('ModeCheckPage', true) as boolean;
    this._modeSummary = this.getValue('ModeSummary', true) as boolean;
    this._ModeTemp = this.getValue('ModeTempSave', true) as boolean;
    this._confirmClear = this.getValue('ModeConfirmClear', true) as boolean;
    this.useLoad4Files = this.getValue('useLoad4Files', true) as boolean;
    this.useAccept4Files = this.getValue('useAccept4Files', true) as boolean;
    const tempFiletype = this.getValue(
      'fileTypes',
      '.pdf, image/jpeg'
    ) as string;
    this.fileTypes =
      tempFiletype !== '.pdf, image/jpeg'
        ? tempFiletype
        : (this.getValue('FileExtensions', '.pdf, image/jpeg') as string);
    this.FileMaxSize = this.getValue('FileMaxSize', 2) as number;
    this._useStar4required = this.getValue(
      'useStar4required',
      false
    ) as boolean;
    this._useRadioRequired = this.getValue('useRadioRequired', true) as boolean;
    this._useLink4Info = this.getValue('useInfoLink', false) as boolean;
    this._StepButtonImage = this.getValue('StepButtonImage', true) as boolean;
    this._StepButtonCounter = this.getValue(
      'StepButtonCounter',
      false
    ) as boolean;
    this._StepButtonLayout = this.getValue('StepButtonLayout', 'ib') as string;
    this._StepButtonPosition = this.getValue(
      'StepButtonPosition',
      'to'
    ) as string;
    this.symbol_fieldrequired = this.getValue(
      'symbol_fieldrequired',
      'bi-star'
    ) as string;
    this.symbol_radiorequired = this.getValue(
      'symbol_radiorequired',
      'bi-star'
    ) as string;
    this.symbol_fieldinfo = this.getValue(
      'symbol_fieldinfo',
      'bi-info-circle-fill'
    ) as string;
    this.symbol_up = this.getValue('symbol_up', 'bi-caret-up-square') as string;
    this.symbol_down = this.getValue(
      'symbol_down',
      'bi-caret-down-square-fill'
    ) as string;
    this.symbol_erase = this.getValue(
      'symbol_erase',
      'bi-eraser-fill'
    ) as string;
    this.symbol_check = this.getValue(
      'symbol_check',
      'bi-check-circle'
    ) as string;
    this.symbol_delete = this.getValue('symbol_delete', 'bi-trash') as string;
    this.symbol_help = this.getValue(
      'symbol_help',
      'bi-question-circle-fill'
    ) as string;
    this.symbol_radiorequired = this.getValue(
      'active_page_number',
      1
    ) as string;

    //To fill some styling stuff
    this._ttRequired = this.GetMsgString('tip_fd_required');
    this._ttRadioRequired = this.GetMsgString('tip_fd_radiorequired');
    this._ttInfo = this.GetMsgString('tip_fd_info');
    this._ttDlgInfoTitle = this.GetMsgString('tip_fd_infotitle');
    this._colorErrorBg = getCssVariable('--bol-color-fielderror-bg', '#DF0044');
    this._colorErrorFg = getCssVariable('--bol-color-fielderror-fg', '#white');
  }

  /**
   * This method checks whether there is an item in the ConfigString list matching the name passed.
   * If yes, then the value of the found item is returned.
   * If no, then the passed default value is returned.
   * @param name is the name of the string in configString list
   * @param defaultValue is the default value of variable, if it does not exist in the list
   * @returns is the value of the variable for which this method is called
   */
  private getValue(
    name: string,
    defaultValue: ConfigStringValue
  ): ConfigStringValue {
    const item: ConfigString | undefined = this.findConfigString(name);

    return item ? item.value : defaultValue;
  }

  /**
   * this method searches for a matching ELement in configString list and returns it
   * @param name is the name of the string in configString list
   * @returns is the first element found in configString list
   */
  private findConfigString(name: string): ConfigString | undefined {
    return this.ConfigString.find(
      (item) => item.id.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * this method checks if in the ConfigString has an item with the passed parameter 'name' as name.
   * if yes, then the item is updated with the new passed value.
   * if no, then a new item is added to the list with the passed values.
   * @param name is the name of the string in configString list
   * @param value is the new value of the item in the list
   */
  private addToConfigStrings(name: string, value: ConfigStringValue): void {
    const item: ConfigString | undefined = this.findConfigString(name);

    item
      ? (item.value = value)
      : this.ConfigString.push(new ConfigString(name, value));
  }

  /**
   * This method is used to store ConfigString as a list at an HTMLInputElement
   */
  public Save(): void {
    //To update some variables
    this.addToConfigStrings('active_page_number', this.page);
    this.addToConfigStrings('usablePages', this._usablePages);
    this.addToConfigStrings('checkedPages', this._CheckedPages);

    //To add the ConfigStrings as a Liste to the HTMLInputElement 'FieldNameConfigJSON'
    const input: HTMLInputElement = document.getElementById(
      this.FieldNameConfigJSON
    ) as HTMLInputElement;
    if (input) input.value = JSON.stringify(this.ConfigString);
  }

  /**
   * This method is used to update files and their size.
   * @param fieldname is the name of the field
   * @param filename is the name of the uploaded file
   * @param filesize is the size of the uploaded file
   */
  UpdateFiles(fieldname?: string, filename?: string, filesize?: number): void {
    //to delete the content of field to output the total size of uploads, if it exists
    updateHtmlTextOfFileSizes('');

    if (fieldname == undefined) return;

    //we find the index on the searched element in the list and if there is not,
    //then the value is -1
    const index = this.Files.findIndex((item) => item.fid === fieldname);

    switch (true) {
      // gefunden, soll aber geloescht werden
      case index > -1 && filename == undefined: {
        this.Files.splice(index, 1);
        break;
      }
      // nicht gefunden, dann zum array hinzufuegen
      case index < 0 && filename && filename.length !== 0: {
        this.Files.push(new File(fieldname, filename!, filesize || 0));
        break;
      }
      // gefunden, update
      default: {
        this.Files[index].fid = fieldname;
        this.Files[index].fname = filename || '';
        this.Files[index].fsize = filesize || 0;
      }
    }

    //To update the FileSize
    this.FileSizes = 0;
    this.Files.forEach((file) => (this.FileSizes += file.fsize));
    this.FileSizes = parseFloat((this.FileSizes / 1024 / 1024).toFixed(2));

    //to update view of total size
    updateHtmlTextOfFileSizes(this.FileSizes + ' MByte');
  }

  /**
   * this method searches in the MsgStrings list for a message with id "key"
   * and returns its content
   * @param key is the searched MsgId
   * @param msgRegplace1 is the first placeholder
   * @param msgRegplace2 is the second placeholder
   * @returns MessageContent of found Message
   */
  public GetMsgString(
    key: string,
    msgRegplace1?: string,
    msgRegplace2?: string
  ): string {
    return msgStringHelper(
      key,
      this.MsgStrings,
      this._formLanguage,
      msgRegplace1,
      msgRegplace2
    );
  }
}
