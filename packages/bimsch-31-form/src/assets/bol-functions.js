/*********************************************************************************************************************************************
 * @name		bol-globals, bol-func
 * @summary		generelle Funktionen fuer bol bootstrap Formulare
 * @param		{any}	anyStuff	kommentar
 * @returns		{any}	kommentar
 * @version		2.1.7, 2023-01
 * @author		Dirk Werther
 */

/*----- global variables -------------------------------------------------------------------------*/
let bolSettings;
let bolDialog;
let bolForm;
let bolPage;
let bolSteps;
let bolBSK;

let bolFormVersion = "";

/***************************************************************************************************
 * Settings
***************************************************************************************************/
class bolc__Settings {
    // Standard-Strings fuer Meldungen innerhalb der Bibliothek
    MsgStrings = [
        {msglng: "de", msgid: "error_browser_toold", msg: "Ihr Browser ist leider nicht kompatibel.\n\nBitte verwenden Sie für dieses Formular moderne Browser, z.B.:\n* Chrome/Edge\n* Firefox ab Version 70\n* Safari\n\nDer Internet Explorer wird nicht mehr unterstützt!\n"},
        {msglng: "de", msgid: "error_missing_focus", msg: "Kein passender Feldnamen für den Fokus auf Seite "},
        {msglng: "de", msgid: "error_text", msg: "Dieses Feld muss einen Wert enthalten"},
        {msglng: "de", msgid: "error_select", msg: "Wählen Sie einen Eintrag aus"},
        {msglng: "de", msgid: "txt_sidebar_questions", msg: "Haben Sie Fragen?"},
        {msglng: "de", msgid: "txt_impress_link", msg: "Impressum"},
        {msglng: "de", msgid: "txt_kontakt_link", msg: "Kontakt"},
        {msglng: "de", msgid: "txt_dsgvo_link", msg: "Datenschutz"},
        {msglng: "de", msgid: "btn_up_title", msg: "nach oben"},
        {msglng: "de", msgid: "fieldset_btn_toggle", msg: "Bereich ein-/ausklappen"},
        {msglng: "de", msgid: "fieldset_btn_erase", msg: "Eingaben in diesem Bereich löschen/zurücksetzen"},
        {msglng: "de", msgid: "fieldset_btn_check", msg: "Eingaben in diesem Bereich überprüfen"},
        {msglng: "de", msgid: "fieldset_btn_delete", msg: "diesen Datenblock löschen"},
        {msglng: "de", msgid: "fieldset_btn_togglepart", msg: "Bereich teilweise ein-/ausklappen"},

        {msglng: "de", msgid: "progress_title", msg: "Fortschrittsanzeige"},

        {msglng: "de", msgid: "error_notadate", msg: "Die Eingabe ist kein gültiges Datum!"},
        {msglng: "de", msgid: "error_birthdatefuture", msg: "Ein Geburtsdatum kann nicht in der Zukunft liegen!"},
        {msglng: "de", msgid: "error_birthdatepast", msg: "Das Geburtsdatum darf nicht vor dem 01.01.1900 liegen!"},
        {msglng: "de", msgid: "error_notlegalage", msg: "Sie müssen zum Zeitpunkt der Antragstellung volljährig sein!"},

        {msglng: "de", msgid: "error_DlgHeadSingle", msg: "Fehler: es ist 1 Fehler aufgetreten.%1%"},
        {msglng: "de", msgid: "error_DlgHead", msg: "Fehler: es sind %1% Fehler aufgetreten.%2%"},
        {msglng: "de", msgid: "error_DlgTextTopSingle", msg: "Bitte füllen Sie folgendes Feld aus:"},
        {msglng: "de", msgid: "error_DlgTextTop", msg: "Bitte füllen Sie folgende Felder aus:"},
        {msglng: "de", msgid: "error_DlgTextPageTop", msg: "Fehler beim Seitenwechsel"},
        {msglng: "de", msgid: "error_DlgTextPageText", msg: "Auf den nachfolgenden Seiten wurden nicht alle Pflichtfelder durch Sie ausgefüllt. Ein Sprung über mehrere Seiten ist somit aktuell nicht möglich. Bitte gehen Sie schrittweise im Ausfüllprozess vor."},

        {msglng: "de", msgid: "error_FileTitle", msg: "Hochladen einer Datei"},
        {msglng: "de", msgid: "error_FileTypeSingle", msg: "Die gewählte Datei ist kein erlaubtes Dateiformat. Es ist nur der Dateityp '%1%' zulässig."},
        {msglng: "de", msgid: "error_FileTypes", msg: "Die gewählte Datei ist kein erlaubtes Dateiformat. Zulässige Dateitypen sind '%1%'."},
        {msglng: "de", msgid: "error_FileSize", msg: "Die Datei ist größer als die zulässigen %1% MByte."},

        {msglng: "de", msgid: "tip_fd_required", msg: "(Pflichtfeld)"},
        {msglng: "de", msgid: "tip_fd_radiorequired", msg: "(Pflichtfeld-Auswahl)"},
        {msglng: "de", msgid: "tip_fd_info", msg: "Symbol anklicken für mehr Info"},
        {msglng: "de", msgid: "tip_fd_infotitle", msg: "Information zum Datenfeld"},

        {msglng: "en", msgid: "key", msg: "value"}
    ];
    bootstrapVersion;           // welche bootstrap Hauptversion ist im Einsatz

    _formLanguage;              // Sprache fuer Meldungen der Bibliothek
    _formCodePage;              // ist das Formular in UTF-8 oder ISO-8859-15 Verwendung

    _modeError;                 // Level der Anzeige von Fehlermeldungen: 3 = bootstrap Dialog, 2 = alert, 1 = console, 0 = keine Anzeige
    _fdsError;                  // Auflistung der Fehlerfelder beim Check einer Seite oder eines Blocks von Feldern
    _colorErrorBg;              // Farbe fuer die Anzeige von Fehlern (Hintergrund)
    _colorErrorFg;              // Komplementaerfarbe fuer die Anzeige von Fehlern (Text)

    useLoad4Files;              // soll bol Routine zum Dateiladen verwendet werden?
    useAccept4Files;            // soll das HTML-Attribut accept für Dateifelder verwendet werden
    fileTypes;                  // zulaessige Dateierweiterungen und MIME-Types
    FileMaxSize;                // maximale Dateigroesse in MByte
    FileSizes;                  // Umfang der im Formular bereits geladenen Dateien in MByte
    Files;                      // JSON-array der im Formular geladenen Dateien


    _page;
    _checkPage;                  // soll ein Seiten-Check erfolgen oder nicht
    _CheckedPages;
    _usablePages;
    _modeDebug;                  // sollen erweiterte Fehlermeldungen auf der console ausgegeben werden
    _modeSummary;                // soll mit Erreichen der letzten Seite automatisch die Zusammenfassung erzeugt werden

    _modeJSON4Send;

    _useStar4required;           // soll statt Symbol ein Stern fuer Pflichtfeld angezeigt werden
    _useRadioRequired;           // soll ein Pflichtfeldsymbol bei Radio's angezeigt werden
    _useLink4Info;               // soll statt Symbol ein Text mit Link zur Feldinfo angezeigt werden

    _fdsAltNames;                // array mit Feldern und alternativen Feldbezeichnungen fuer die Zusammenfassungsseite
    fieldsNotInSummary;          // array mit Feldnamen, welche nicht auf der Zusammenfassungsseite anzuzeigen sind
    pageFocus;                   // array mit Feldnamen, welches Feld soll auf welcher Seite den Focus erhalten
    _confirmClear;               // Rueckfrage, ob Feldinhalte aus einem Feld-Container geloescht werden sollen


    _ModeTemp;                   // Modus fuer das Zwischenspeichern: 2 = lokal, 1 = auf bol-Server

    _StepButtonImage;           // sollen die Linien um die StepButton verwendet werden?
    _StepButtonCounter;         // sollen automatisch Zahlen für StepButton verwendet werden?
    _StepButtonLayout;
    _StepButtonPosition;        // top | left

    // allgemeine, oft verwendete Texte

    // Texte fuer Tooltips
    _ttRequired;                // Text des Tootltips fuer Pflichtfelder
    _ttRadioRequired;           // Text des Tootltips fuer Radiofelder
    _ttInfo;                    // Text des Tootltips zur Feldinfo
    _ttDlgInfoTitle;

    FieldNameConfigJSON = "bol.FormSettings";

    // Name von bootstrap Symbolen zur Anzeige
    // symbol_fieldrequired = "bi-star-fill";
    symbol_fieldrequired = "bi-star";
    symbol_radiorequired = "bi-star";
    symbol_fieldinfo = "bi-info-circle";
    // symbol_up = "bi-caret-up-square";
    // symbol_down = "bi-caret-down-square-fill";
    symbol_up;
    symbol_down;
    symbol_erase;
    symbol_check;
    symbol_delete;
    symbol_help;

    ConfigString = [
    ];

    // [
    //     {"id": "active_page_number", "value": 1},
    //     {"id": "ModeCheckPage", "value": true},
    //     {"id": "fileTypes", "value": ".pdf, image/jpeg"},
    //     {"id": "FileMaxSize", "value": 10},
    //     {"id": "StepButtonImage", "value": false},
    //     {"id": "StepButtonCounter", "value": true},
    //     {"id": "StepButtonLayout", "value": "b"},
    //     {"id": "StepButtonPosition", "value": "left"},
    //     {"id": "useStar4required", "value": true},
    //     {"id": "symbol_fieldinfo", "value": "bi-info-circle-fill"}
    // ]

    constructor(configJSON) {
        this._fdsError = [];
        this.Files = [];
        this.FileSizes = 0;

        this._formLanguage = "de";
        this._useRadioRequired = true;
        this._fdsAltNames = [];
        this.fieldsNotInSummary = [];
        this.fieldsInSummary = [];
        this.pageFocus = [];

        this._formCodePage = "UTF-8";
        // wurde zuvor ueber TAGS eine Datei "bol-globals.iso.js" geladen, sollte es JSON bol__msg_strings_iso geben
        // ist diese Varaiable vorhanden, dann diese strings verwenden
        {try {if (bol__msg_strings_iso != undefined) {
            this._formCodePage = "ISO-8859-15";
            this.MsgStrings = bol__msg_strings_iso;
        }} catch(err) {}}

        // pruefen, ob bootstrap verwendet wird
        try {
            let bsv = bootstrap.Tooltip.VERSION.substr(0,1);
            this.bootstrapVersion = parseInt(bsv);
        } catch (error) {
            this.bootstrapVersion = 0;
        }
        let e = document.querySelectorAll("div.row[id^=page]");
        this._usablePages = [];
        for (let i = 0; i < e.length; i++) this._usablePages.push(true);
        this._CheckedPages = [];
        for (let i = 0; i < e.length; i++) this._CheckedPages.push(false);
        this.Load(configJSON);
    }
    get isBootstrap() {
        if (this.bootstrapVersion == 0) return false; else return true;
    }
    // Laden einer Konfiguration aus dem versteckten INPUT
    // wenn nicht existent, dann anlegen
    Load(configJSON) {
        let base = document.getElementById(this.FieldNameConfigJSON);
        if (base == undefined) {
            base = document.createElement("input");
            base.id = this.FieldNameConfigJSON;
            base.className = "form-control";
            base.type = "hidden";
            base.value = '[{"id":"active_page_number","value":1}]';
            let e = document.getElementsByTagName("form");
            if (e != undefined) e[0].appendChild(base);
        }
        if (configJSON != undefined) this.ConfigString = configJSON;
        else this.ConfigString = JSON.parse(base.value);

        let o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("active_page_number").toLowerCase());
        if (o.length != 0) this.page = o[0].value; else this.page = 1;

        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("JSONstringify").toLowerCase());
        if (o.length != 0) this._modeJSON4Send = o[0].value; else this._modeJSON4Send = false;

        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("ModeError").toLowerCase());
        if (o.length != 0) this._modeError = o[0].value; else this._modeError = 3;

        o = this.ConfigString.filter(({id}) => id == "ModeDebug");
        if (o.length != 0) this._modeDebug = o[0].value; else this._modeDebug = false;
        o = this.ConfigString.filter(({id}) => id == "ModeCheckPage");
        if (o.length != 0) this._checkPage = o[0].value; else this._checkPage = true;
        o = this.ConfigString.filter(({id}) => id == "ModeSummary");
        if (o.length != 0) this._modeSummary = o[0].value; else this._modeSummary = true;

        o = this.ConfigString.filter(({id}) => id == "ModeTempSave");
        if (o.length != 0) this._ModeTemp = o[0].value; else this._ModeTemp = true;
        o = this.ConfigString.filter(({id}) => id == "ModeConfirmClear");
        if (o.length != 0) this._confirmClear = o[0].value; else this._confirmClear = true;

        // Settings for file upload
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("useLoad4Files").toLowerCase());
        if (o.length != 0) this.useLoad4Files = o[0].value; else this.useLoad4Files = true;
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("useAccept4Files").toLowerCase());
        if (o.length != 0) this.useAccept4Files = o[0].value; else this.useAccept4Files = true;
        o = this.ConfigString.filter(({id}) => (id.toLowerCase() == ("fileTypes").toLowerCase() || id.toLowerCase() == ("FileExtensions").toLowerCase()));
        if (o.length != 0) this.fileTypes = o[0].value; else this.fileTypes = ".pdf, image/jpeg";
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("FileMaxSize").toLowerCase());
        if (o.length != 0) this.FileMaxSize = parseInt(o[0].value); else this.FileMaxSize = 2;

        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("useStar4required").toLowerCase());
        if (o.length != 0) this._useStar4required = true; else this._useStar4required = false;
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("useRadioRequired").toLowerCase());
        if (o.length != 0) this._useRadioRequired = false; else this._useRadioRequired = true;
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("useInfoLink").toLowerCase());
        if (o.length != 0) this._useLink4Info = true; else this._useLink4Info = false;


        o = this.ConfigString.filter(({id}) => id == "StepButtonImage");
        if (o.length != 0) this._StepButtonImage = o[0].value; else this._StepButtonImage = true;
        o = this.ConfigString.filter(({id}) => id == "StepButtonCounter");
        if (o.length != 0) this._StepButtonCounter = o[0].value; else this._StepButtonCounter = false;
        o = this.ConfigString.filter(({id}) => id == "StepButtonLayout");
        if (o.length != 0) this._StepButtonLayout = o[0].value; else this._StepButtonLayout = "ib";
        o = this.ConfigString.filter(({id}) => id == "StepButtonPosition");
        if (o.length != 0) this._StepButtonPosition = o[0].value; else this._StepButtonPosition = "top";

        o = this.ConfigString.filter(({id}) => id == "symbol_fieldrequired");
        if (o.length != 0) this.symbol_fieldrequired = o[0].value; else this.symbol_fieldrequired = "bi-star";
        o = this.ConfigString.filter(({id}) => id == "symbol_radiorequired");
        if (o.length != 0) this.symbol_radiorequired = o[0].value; else this.symbol_radiorequired = "bi-star";
        o = this.ConfigString.filter(({id}) => id == "symbol_fieldinfo");
        if (o.length != 0) this.symbol_fieldinfo = o[0].value; else this.symbol_fieldinfo = "bi-info-circle-fill";
        o = this.ConfigString.filter(({id}) => id == "symbol_up");
        if (o.length != 0) this.symbol_up = o[0].value; else this.symbol_up = "bi-caret-up-square";
        o = this.ConfigString.filter(({id}) => id == "symbol_down");
        if (o.length != 0) this.symbol_down = o[0].value; else this.symbol_down = "bi-caret-down-square-fill";
        o = this.ConfigString.filter(({id}) => id == "symbol_erase");
        if (o.length != 0) this.symbol_erase = o[0].value; else this.symbol_erase = "bi-eraser-fill";
        o = this.ConfigString.filter(({id}) => id == "symbol_check");
        if (o.length != 0) this.symbol_check = o[0].value; else this.symbol_check = "bi-check-circle";
        o = this.ConfigString.filter(({id}) => id == "symbol_delete");
        if (o.length != 0) this.symbol_delete = o[0].value; else this.symbol_delete = "bi-trash";
        o = this.ConfigString.filter(({id}) => id == "symbol_help");
        if (o.length != 0) this.symbol_help = o[0].value; else this.symbol_help = "bi-question-circle-fill";


        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("NavigatorString").toLowerCase());
        if (o.length == 0) this.ConfigString.push({"id": "NavigatorString", "value": navigator.userAgent}); else o[0].value = navigator.userAgent;
        o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("TimeStampLoad").toLowerCase());
        if (o.length == 0) this.ConfigString.push({"id": "TimeStampLoad", "value": bolGetTimeStamp()}); else o[0].value = bolGetTimeStamp();

        // Styling stuff
        this._ttRequired = this.GetMsgString("tip_fd_required");
        this._ttRadioRequired = this.GetMsgString("tip_fd_radiorequired");
        this._ttInfo = this.GetMsgString("tip_fd_info");
        this._ttDlgInfoTitle = this.GetMsgString("tip_fd_infotitle");

        this._colorErrorBg = window.getComputedStyle(document.body).getPropertyValue('--bol-color-fielderror-bg');
        if (this._colorErrorBg == "") this._colorErrorBg = "#DF0044";
        this._colorErrorFg = window.getComputedStyle(document.body).getPropertyValue('--bol-color-fielderror-fg');
        if (this._colorErrorFg == "") this._colorErrorFg = "white";

        // wenn ein Feld zur Ausgabe der Gesamtgroesse von Uploads existiert => Inhalt löschen
        let e = document.getElementById("bol.FileSizes");
        if (e != undefined) e.innerText = "";

    }
    Save() {
        let o = this.ConfigString.filter(({id}) => id == "active_page_number");
        if (o.length == 0) this.ConfigString.push({"id": "active_page_number", "value": this.page}); else o[0].value = this.page;
        o = this.ConfigString.filter(({id}) => id == "usablePages");
        if (o.length == 0) this.ConfigString.push({"id": "usablePages", "value": this._usablePages}); else o[0].value = this._usablePages;
        o = this.ConfigString.filter(({id}) => id == "checkedPages");
        if (o.length == 0) this.ConfigString.push({"id": "checkedPages", "value": this._CheckedPages}); else o[0].value = this._CheckedPages;

        let base = document.getElementById(this.FieldNameConfigJSON);
        if (base != undefined) base.value = JSON.stringify(this.ConfigString);
    }
    get SKauthentication() {
        let o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("SKauthentication").toLowerCase());
        if (o.length != 0) return true; else return false;
    }
    set SKauthentication(newValue) {
        let o = this.ConfigString.filter(({id}) => id.toLowerCase() == ("SKauthentication").toLowerCase());
        if (newValue) {
            if (o.length == 0) this.ConfigString.push({"id": "SKauthentication", "value": true}); else o[0].value = true;
            this.Save();
        } else {
            if (o.length != 0) {}
        }
    }

    get page() {
        return this._page;
    }
    set page(newValue) {
        sessionStorage.setItem("bol_active_page", newValue);
        this._page = newValue;
        this.Save();
    }

    get PageCheck() {
        return this._checkPage;
    }
    set PageCheck(newValue) {
        if (newValue != undefined && newValue == false) this._checkPage = false;
        else this._checkPage = true;
    }
    get PageChecked() {
        return this._CheckedPages[this.page - 1];
    }
    set PageChecked(newValue) {
        this._CheckedPages[this.page - 1] = newValue;
        this.Save();
    }
    getPageChecked(pgNo) {
        return this._CheckedPages[pgNo - 1];
    }
    setPageChecked(pgNo, newValue) {
        this._CheckedPages[pgNo - 1] = newValue;
    }



    get ModeError() {
        if (!this.isBootstrap && this._modeError == 3) return 2;
        else return this._modeError;
    }


    get DialogMode() {
        let o = this.ConfigString.filter(({id}) => id == "DialogMode");
        if (o.length != 0) return o[0].value; else return 3;
    }
    set DialogMode(newValue) {
        let o = this.ConfigString.filter(({id}) => id == "DialogMode");
        if (o.length == 0) this.ConfigString.push({"id": "DialogMode", "value": 3}); else o[0].value = newValue;
        this.Save();
    }

    get TimeStampSave() {
        let o = this.ConfigString.filter(({id}) => id == "TimeStampSave");
        if (o.length == 0) return ""; else return o[0].value;
    }
    set TimeStampSave(newValue) {
        let o = this.ConfigString.filter(({id}) => id == "TimeStampSave");
        if (o.length == 0) this.ConfigString.push({"id": "TimeStampSave", "value": bolGetTimeStamp()}); else o[0].value = bolGetTimeStamp();
        this.Save();
    }
    get TimeStampSend() {
        let o = this.ConfigString.filter(({id}) => id == "TimeStampSend");
        if (o.length == 0) return ""; else return o[0].value;
    }
    set TimeStampSend(newValue) {
        let o = this.ConfigString.filter(({id}) => id == "TimeStampSend");
        if (o.length == 0) this.ConfigString.push({"id": "TimeStampSend", "value": bolGetTimeStamp()}); else o[0].value = bolGetTimeStamp();
        this.Save();
    }

    get FieldNamesAlternative() {
        let arf;
        if (this._fdsAltNames == undefined) {
            try {arf = bol__control_names; } catch(err) {} // Version 1.x
            if (arf != undefined) this._fdsAltNames = arf;
            else {
                try {arf = contoll_names; } catch(err) {} // bol OZG Original
                if (arf != undefined) this._fdsAltNames = arf;
            }
        }
        return this._fdsAltNames;
    }
    set FieldNamesAlternative(newValue) {
        this._fdsAltNames = newValue;
    }

    UpdateFiles(fieldname, filename, filesize) {
        let e = document.getElementById("bol.FileSizes");
        if (e != undefined) e.innerText = "";

        if (fieldname == undefined) return;
        // filtern, ob es das Feld schon gibt
        let m = this.Files.filter(({fid}) => fid == fieldname);
        // gefunden, soll aber geloescht werden
        if (m != 0 && filename == undefined) {
            let u = this.Files.indexOf(m[0]);
            this.Files.splice(u, 1);
        }
        // nicht gefunden, dann zum array hinzufuegen
        else if (m == 0 && filename != "")
            // nicht gefunden
            this.Files.push({"fid": fieldname, "fname": filename, "fsize": filesize});
        else {
            // gefunden, update
            m[0].fid = fieldname;
            m[0].fname = filename;
            m[0].fsize = filesize;
        }
        this.FileSizes = 0;
        for (let i = 0; i < this.Files.length; i++) {
            this.FileSizes = this.FileSizes + this.Files[i].fsize;
        }
        this.FileSizes = (this.FileSizes / 1024 / 1024).toFixed(2);

        // Ansicht Gesamtgroesse aktualisieren
        if (e == undefined) return;
        e.innerText = this.FileSizes + " MByte";
    }
    GetMsgString(key, msgRegplace1, msgRegplace2) {
        if (this.MsgStrings == undefined) return "";
        let m = this.MsgStrings.filter(({msgid, msglng}) => msgid == key && msglng == this._formLanguage);
        if (m == 0) m = this.MsgStrings.filter(({msgid, msglng}) => msgid == key && msglng == "de");
        if (m == 0) m = this.MsgStrings.filter(({msgid}) => msgid == key);
        if (m == 0) return "";
        let s = m[0].msg;
        if (msgRegplace1 != undefined) s = s.replace("%1%", msgRegplace1);
        if (msgRegplace2 != undefined) s = s.replace("%2%", msgRegplace2);
        return s;
    }

}


/***************************************************************************************************
 * BLOCK
 * Dialog
***************************************************************************************************/
class bolc__Dialog {
    _obj;
    constructor() {
        if (bolSettings.isBootstrap) {
            let e = document.getElementById('bolDialog');
            if (e == undefined) {
                e = document.createElement("div");
                e.id = "bolDialog";
                e.classList.add("modal");
                e.tabindex = -1;
                e.role = "dialog";
                e.setAttribute("aria-hidden", "true");

                let s = '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">' +
                        '<div class="modal-content"><div id="bolDialogHeader" class="modal-header bol-dialog-header">' +
                        '<h5 class="modal-title" id="bolDialogTitle"></h5>' +
                        '</div><div class="modal-body" id="bolDialogMessage"></div>' +
                        '<div class="modal-footer"><button id="bolDialogButtonOK" type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal">OK</button></div></div></div>';
                e.innerHTML = s;
                document.body.children[0].appendChild(e);
            }
            this._obj = new bootstrap.Modal(e, {keyboard: false});
        } else this._obj = undefined;
    }
    get title() {
        if (this._obj != undefined) return document.getElementById('bolDialogTitle');
    }
    set title(newValue) {
        if (this._obj != undefined) document.getElementById('bolDialogTitle').innerHTML = newValue;
    }
    get message() {
        if (this._obj != undefined) return document.getElementById('bolDialogMessage');
    }
    set message(newValue) {
        if (this._obj != undefined) document.getElementById('bolDialogMessage').innerHTML = newValue;
    }
    Project_String(key) {
        if (bol__project_strings == undefined) return "";
        let m = bol__project_strings.filter(({msgid, msglng}) => msgid == key && msglng == bolSettings.language);
        if (m == 0) m = bol__project_strings.filter(({msgid, msglng}) => msgid == key && msglng == "de");
        if (m == 0) m = bol__project_strings.filter(({msgid}) => msgid == key);
        if (m == 0) {return ""} else return m[0].msg;
    }
    ChangeStyle(newMode) {
        switch (newMode) {
            case 2:
                document.getElementById('bolDialogHeader').classList.remove("bol-dialog-header");
                document.getElementById('bolDialogHeader').classList.add("bol-dialog-errorheader");
                break;
            default:
                document.getElementById('bolDialogHeader').classList.remove("bol-dialog-errorheader");
                document.getElementById('bolDialogHeader').classList.add("bol-dialog-header");
        }
    }
    Show(newTitle, newMessage, noOK) {
        let msg = "";
        if (noOK) document.getElementById("bolDialogButtonOK").style.display = "none"; else document.getElementById("bolDialogButtonOK").style.display = "";
        {try {msg = this.Project_String(newMessage)} catch(err) {}}
        if (newTitle != undefined) this.title = newTitle;
        if (msg == "") msg = newMessage;
        if (msg != undefined || msg != "") this.message = msg;
        if (bolSettings.isBootstrap) {
            this.ChangeStyle(1);
            this._obj.show();
            let e = document.getElementById("bolDialogButtonOK");
            e.focus();
        } else alert(this.title + '\n\n' + this.message);
    }
    ShowError() {
        let msg = "";
        document.getElementById("bolDialogButtonOK").style.display = "";
        switch (bolSettings._modeError) {
            case 3:
                this.ChangeStyle(2);
                if (bolSettings._fdsError.length == 1) msg = bolSettings.GetMsgString("error_DlgTextTopSingle");
                else msg = bolSettings.GetMsgString("error_DlgTextTop");
                msg = msg + "<br><ul>";
                for (let i = 0; i < bolSettings._fdsError.length; i++) {
                    msg = msg + '<li>' + bolSettings._fdsError[i].title;
                }
                this.message = msg + "</ul>";
                if (bolSettings._fdsError.length == 1) this.title = bolSettings.GetMsgString("error_DlgHeadSingle", "");
                else this.title = bolSettings.GetMsgString("error_DlgHead", bolSettings._fdsError.length, "");
                this._obj.show();
                let e = document.getElementById("bolDialogButtonOK");
                break;
            case 2:
                if (bolSettings._fdsError.length == 1) msg = bolSettings.GetMsgString("error_DlgTextTopSingle");
                else msg = bolSettings.GetMsgString("error_DlgTextTop");
                for (var i = 0; i < bolSettings._fdsError.length; i++) {
                    msg = msg + '\n*  ' + bolSettings._fdsError[i].title;
                }
                msg = bolSettings.GetMsgString("error_dialogtoptext") + msg;
                alert(msg);
                break;
            case 1:
                if (bolSettings._fdsError.length == 1) msg = bolSettings.GetMsgString("error_DlgTextTopSingle");
                else msg = bolSettings.GetMsgString("error_DlgTextTop");
                console.log(msg);
                for (var i = 0; i < bolSettings._fdsError.length; i++) {
                    console.log(bolSettings._fdsError[i].name, ":", bolSettings._fdsError[i].title);
                }
            default:
        }
    }
    ShowErrorFile(modus) {
        this.title = bolSettings.GetMsgString("error_FileTitle");
        document.getElementById("bolDialogButtonOK").style.display = "";
        if (modus == 2) {
            if (bolSettings.fileTypes.split(",").length == 1) this.message = bolSettings.GetMsgString("error_FileTypeSingle", bolSettings.fileTypes);
            else this.message = bolSettings.GetMsgString("error_FileTypes", bolSettings.fileTypes);
        }
        else if (modus == 1) this.message = bolSettings.GetMsgString("error_FileSize", bolSettings.FileMaxSize);
        switch (bolSettings._modeError) {
            case 3:
                this.ChangeStyle(2);
                this._obj.show();
                let e = document.getElementById("bolDialogButtonOK");
                e.focus();
                break;
            default:
                alert(this.title + "\n\n" + this.message);
                break;
        }
    }
    ShowInfo(title, msg) {
        this.Show(title, msg, true)
    }
    ShowErrorPages() {
        let msg = "";
        document.getElementById("bolDialogButtonOK").style.display = "";
        this.title = bolSettings.GetMsgString("error_DlgTextPageTop");
        this.message = bolSettings.GetMsgString("error_DlgTextPageText");
        switch (bolSettings._modeError) {
            case 3:
                this.ChangeStyle(2);
                this._obj.show();
                let e = document.getElementById("bolDialogButtonOK");
                e.focus();
                break;
            default:
                alert(this.title + "\n\n" + this.message);
                break;
        }
    }
}

/***************************************************************************************************
 * BLOCK
 * step buttons, progress bar
***************************************************************************************************/
class bolc__Steps {
    _obj;
    Buttons;
    _infoText;
    _percent;
    _percentStyle;
    _color_line;
    _color_background;


    constructor() {
        this.Buttons = [];
        this._percent = 10;
        this._percentStyle = "basic";
        this.info = "";
        this._color_line = getComputedStyle(document.body).getPropertyValue('--bol-color-stepbutton-line');
        if (this._color_line == undefined || this._color_line == "") this._color_line = "rgb(222, 222, 222)";
        this._color_background = getComputedStyle(document.body).getPropertyValue('--bol-color-stepbutton-bg');
        if (this._color_background == undefined || this._color_background == "") this._color_background = "rgb(0, 64, 128)";
        for (let i = 1; i < (bolPage.max + 1); i++) {
            this.Buttons.push({"lang": "de", "page": i,"visible": true, "percent":  0, "label": "Seite " + i, "tip": ""})
        }
        this._obj = document.getElementById("bol.StepButtonBar");
        if (this._obj != undefined && this._obj.tagName == "INPUT") this._obj.parentElement.outerHTML = '<div class="row" id="bolStepButtons"></div>';
        else this._obj = document.getElementById("bolStepButtons");
    }

    ButtonImage(Mode) {
        let sa, s = '<svg width="900" height="40" overflow="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        if (Mode) { // active
            sa = s + '<path d="M 0,3 H 885 L 900 20 L 885 37 H 0" fill="' + this._color_background + '" fill-rule="none" style="fill:none:fill-opacity:1;stroke:' + this._color_line + ';stroke-miterlimit:14;stroke-width:1;"/></svg>';
        } else { // inactive
            sa = s + '<path d="M 0,3 H 885 L 900 20 L 885 37 H 0" fill="none" fill-rule="none" style="fill:none:fill-opacity:10;stroke:' + this._color_line + ';stroke-width:1;stroke-miterlimit:14;stroke-opacity:1;"/></svg>';
        }
        let sif = "url('data:image/svg+xml;utf8," + sa + "') ";
        return sif;
    }
    CreateButtons() {
        let steptip, steplabel;
        let myRow = document.createElement("div");
        myRow.className = "row";

        let myCol = document.createElement("div");
        myCol.className = "col-lg-12 bol-stepbar";
        myCol.id = "bolStepButtonBar";
        myRow.appendChild(myCol);
        for (let i = 0; i < this.Buttons.length; i++) {
            if (this.Buttons[i].page == 0) continue;
            steplabel = this.Buttons[i].label;
            if (this.Buttons[i].tip == undefined || this.Buttons[i].tip == "") steptip = this.Buttons[i].label; else steptip = this.Buttons[i].tip;
            let btn = document.createElement("button");
            btn.id = "bol_btnStep" + this.Buttons[i].page;
            btn.type = "button";
            btn.value = this.Buttons[i].page;
            if (this.Buttons[i].visible) btn.style.display = ""; else btn.style.display = "none";
            if (bolSettings._StepButtonPosition == "left") {
                btn.innerText = steplabel;
            } else {
                btn.innerText = steplabel;
            }
            btn.setAttribute("onclick", "bolPageSwitch("+ this.Buttons[i].page + ");");
            btn.setAttribute("title", steptip);
            if (bolPage.active == this.Buttons[i].page) {
                if (bolSettings._StepButtonPosition == "left") {
                    btn.classList.add('bol-stepbtn-active-left');
                } else btn.classList.add('bol-stepbtn-active');
                if (bolSettings._StepButtonImage) btn.style.backgroundImage = this.ButtonImage(true);
            } else {
                if (bolSettings._StepButtonPosition == "left") btn.classList.add('bol-stepbtn-inactive-left'); else btn.classList.add('bol-stepbtn-inactive');
                if (bolSettings._StepButtonImage) btn.style.backgroundImage = this.ButtonImage();
            }
            if (bolSettings._StepButtonCounter) {
                btn.innerText = " " + this.Buttons[i].page + ". " + btn.innerText;
                // btn.classList.add("bi-" + this.Buttons[i].page + "-circle");
            }
            myCol.appendChild(btn);
            if (bolSettings._StepButtonPosition == "left") {
                btn = document.createElement("br");
                myCol.appendChild(btn);
            }
        }
        return myRow;
    }
    CreateInfo() {
        let myRow = document.createElement("div");
        myRow.className = "row";
        let myCol = document.createElement("div");
        myCol.className = "col-lg-12 bol-stepbar-text";
        myCol.id = "bolStepButtonInfo";
        myCol.innerText = this.info;
        myRow.appendChild(myCol);
        return myRow;
    }
    CreateProgress() {
        let myRow = document.createElement("div");
        myRow.className = "row";
        if (this.percent == 0) myRow.style.display = "none";
        let myCol = document.createElement("div");
        myCol.className = "col-lg-12 bol-stepbar-percent";
        myCol.id = "bolStepButtonProgress";
        if (this.percent < 0) {
            myCol.innerHTML = '<div class="progress"><div id="bolProgress" class="progress-bar" role="progressbar" style="width: 0%; display: none;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" title="' + bolSettings.GetMsgString("progress_title") + '"></div></div>';
        } else myCol.innerHTML = '<div class="progress"><div id="bolProgress" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" title="' + bolSettings.GetMsgString("progress_title") + '"></div></div>';
        myRow.appendChild(myCol);
        return myRow;
    }

    buttonHide(pageNo) {
        let b = this.Buttons.filter(({page}) => page == pageNo);
        if (b != undefined && b.length > 0) {
            b[0].visible = false;
            let ele = document.getElementById("bol_btnStep" + pageNo);
            if (ele != undefined) ele.style.display = "none";
        }
    }
    buttonShow(pageNo) {
        let b = this.Buttons.filter(({page}) => page == pageNo);
        if (b != undefined && b.length > 0) {
            b[0].visible = true;
            let ele = document.getElementById("bol_btnStep" + pageNo);
            if (ele != undefined) ele.style.display = "";
        }
    }
    buttonText(pageNo, tLabel, tTip) {
        let b = this.Buttons.filter(({page}) => page == pageNo);
        if (b != undefined) {
            b[0].label = tLabel;
            if (tTip != undefined) b[0].tip = tTip; else b[0].tip = "";
        }
    }
    get percent() {
        return this._percent;
    }
    set percent(newValue) {
        let e = document.getElementById("bolProgress");
        if (e == undefined) {this._percentStyle = "none"; return}
        this._percent = parseInt(newValue);
        e.setAttribute("aria-valuenow", this._percent);
        e.style.width = this._percent + "%";
        e.innerText = this._percent + "%";
        if (this._percent > 0) e.style.display = "";
    }
    get info() {
        return this._infoText;
    }
    set info(newValue) {
        this._infoText = newValue;
        let e = document.getElementById("bolStepButtonInfo");
        if (e != undefined) e.innerText = this._infoText;
    }
    get percentStyle() {
        return this._percentStyle;
    }
    set percentStyle(newValue)  {
        let e = document.getElementById("bolProgress");
        if (e == undefined) {this._percentStyle = "none"; return}
        switch (newValue) {
            case "anistriped":
                e.style.display = "";
                e.className = "progress-bar progress-bar-striped progress-bar-animated";
                e.innerText = this._percent + "%";
                break
            case "striped":
                this._percentStyle = "label";
                e.style.display = "";
                e.className = "progress-bar progress-bar-striped";
                e.innerText = this._percent + "%";
                break;
            case "label":
                this._percentStyle = "label";
                e.style.display = "";
                e.className = "progress-bar bol-progress";
                e.innerText = this._percent + "%";
                break;
            case "none":
                e.style.display = "none";
                break;
            default:
                this._percentStyle = "basic";
                e.style.display = "";
                e.className = "progress-bar bol-progress";
                e.innerText = "";
                break;
        }
    }
    get layout() {
        return bolSettings._StepButtonLayout;
    }
    set layout(newValue) {
        switch (newValue.toLowerCase()) {
            case "pib":
            case "ib":
                bolSettings._StepButtonLayout = newValue.toLowerCase();
                break;
            default:
                bolSettings._StepButtonLayout = "ib";
        }
        this.StyleIt();
    }
    Update(OldNo, NewNo) {
        let ele = document.getElementById("bol_btnStep" + OldNo);
        if (ele == undefined) return;
        if (bolSettings._StepButtonPosition == "left") ele.className = 'bol-stepbtn-inactive-left'; else ele.className = 'bol-stepbtn-inactive';
        if (bolSettings._StepButtonImage) ele.style.backgroundImage = this.ButtonImage()
        ele = document.getElementById("bol_btnStep" + NewNo);
        if (ele == undefined) return;
        if (bolSettings._StepButtonPosition == "left") ele.className = 'bol-stepbtn-active-left'; else ele.className = 'bol-stepbtn-active';
        if (bolSettings._StepButtonImage) ele.style.backgroundImage = this.ButtonImage(true);
        let b = this.Buttons.filter(({page}) => page == NewNo);
        if (b != undefined) if (b[0].percent != "") this.percent = b[0].percent;
        return true;
    }
    Show() {
        this.StyleIt();
        let btn = this.Buttons.filter(({page}) => page == bolPage.active);
        if (btn == undefined) return;
        this.percent = btn[0].percent;
    }
    StyleIt() {
        if (this._obj == undefined) return;
        let cnt = document.getElementById("bolStepButtons");
        if (cnt == undefined) return;
        cnt.innerHTML = "";
        let myColBase = document.createElement("div");
        myColBase.className = "col-lg-12";
        cnt.appendChild(myColBase);

        let btns = this.Buttons.filter(({lang}) => lang == bolSettings._formLanguage);
        if (btns == undefined || btns.length == 0) btns = this.Buttons.filter(({lang}) => lang == "de");
        if (btns == undefined || btns.length == 0) btns = this.Buttons;

        switch (this.layout) {
            case "bip":
                myColBase.appendChild(this.CreateButtons());
                myColBase.appendChild(this.CreateInfo());
                myColBase.appendChild(this.CreateProgress());
                break;
            case "ip":
                myColBase.appendChild(this.CreateInfo());
                myColBase.appendChild(this.CreateProgress());
                break;
            case "ib":
                myColBase.appendChild(this.CreateInfo());
                myColBase.appendChild(this.CreateButtons());
                break;
            case "b":
                myColBase.appendChild(this.CreateButtons());
                break;
            default: // ibp
                myColBase.appendChild(this.CreateInfo());
                myColBase.appendChild(this.CreateButtons());
                myColBase.appendChild(this.CreateProgress());
                break;
        }
        cnt.classList.remove("bol-container-hidden");
        cnt.classList.add("bol-stepbar");
    }
}

/***************************************************************************************************
 * BLOCK
 * Form
***************************************************************************************************/
class bolc__Form {
    _obj;
    _Kundenname;
    _Kundenstrasse;
    _KundenPLZ;
    _Kundenort;
    _KundenPerson;
    _Kundentelefon;
    _Kundenmail;
    _Impressum_Link;
    _Kontakt_Link;
    _DSGVO_Link;
    _SidebarText;
    _PageCheck;
    constructor() {
        this._obj = document.getElementsByName('bolForm')[0];
        if (this._obj == undefined) this._obj = document.getElementsByName('WaimeaForm')[0];
        if (this._obj == undefined) return bolDebug(false, "(bolc__Form) no form element!");
        this._Kundenname = "";
        this._Kundenstrasse = "";
        this._Kundenort = "";
        this._KundenPerson = "";
        this._Kundentelefon = "";
        this._Kundenmail = "";
        this._Impressum_Link = "";
        this._Kontakt_Link = "";
        this._DSGVO_Link = "";
        this._SidebarText = "";
        this._PageCheck = [];
        return true;
    }
    get valueTemp() {
        let e = document.getElementById("Form.FormPublish#2.LocalSaveURL#4");
        if (e == undefined) return bolDebug("", "(bolc__Form) no valueTemp element");
        else return e.value.trim();
    }
    get valueTarget() {
        let e = document.getElementById("Form.FormPublish#2.TargetURL#2");
        if (e == undefined) return bolDebug("", "(bolc__Form) no valueTarget element");
        else return e.value.trim();
    }
    PDFfilled() {
        let target4PDF;
        let targetURL = this.valueTarget;
        if (targetURL.indexOf("/Process") > -1) {
            target4PDF = targetURL.substring(0, targetURL.indexOf("/Process")) + "/DisplayPDF?action=getnowpdfa";
        } else { // fallback
            target4PDF = "https://formular-demo.de/NetGateway/DisplayPDF?action=getnowpdfa";
        }
        this._obj.target = '_blank';
        let tempAction = this._obj.action;
        this._obj.action = target4PDF;
        this._obj.submit();
        this._obj.target = '_self';
        this._obj.action = tempAction;
    }
    RestoreTemp() {
        let e = document.getElementById("act_form_saved");
        if (e != undefined && e.value != "") {
            try {bolProject_RestoreFromTemp()} catch(err) {}
            e.value = "";
        }
    }
    SaveTemp() {
        if (this.valueTemp == "") return false;
        bolSettings.TimeStampSave = "";
        try {bolProject_SaveForTemp()} catch(err) {}
        switch (bolSettings.TempMode) {
            case 2:
                break;
            case 1:
            default:
                this.SubmitForm(this.valueTemp, true);
                break;
        }
        return true;
    }
    Send() {
        let targetURL = this.valueTarget;
        if (targetURL == "") return false;
        bolSettings.TimeStampSend = "";
        bolSettings.Save();
        if (bolSettings._modeJSON4Send) getField(bolSettings.FieldNameConfigJSON).value = JSON.stringify(getField(bolSettings.FieldNameConfigJSON).value);
        this.SubmitForm(targetURL, true);
        return true;
    }
    StyleIt(Mode) {
        if (this._obj == undefined) return false;
        // wenn vorhanden, Wappen anpassen
        let e = document.getElementById('WAPPEN');
        if (e != undefined) {
            e.setAttribute('class','bol-emblem');
            e.removeAttribute('style');
            e.removeAttribute('width');
            e.removeAttribute('height');
            if (e.getAttribute('src') == 'xxxWAPPENxxx') e.setAttribute('src','logo-ozg.jpg');
        }
        // bol Logo Bar anzeigen?
        if (Mode != undefined) return;
        let colfg = getComputedStyle(document.body).getPropertyValue('--bol-bar-fg');
        const bol__logo = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
                          '<svg width="30px" height="30px" viewBox="0 0 542 509" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:2;" id="svg44" sodipodi:docname="bol-logo.svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">' +
                          '<defs id="defs48"></defs><sodipodi:namedview id="namedview46" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" showgrid="false" /><g>' +
                          '<rect x="375.82635" y="10.090681" width="16.984541" height="258.2421"  style="clip-rule:evenodd;fill:' + colfg + ';fill-rule:nonzero;stroke-width:4.0289;stroke-miterlimit:2" />' +
                          '<ellipse cx="290.06082" cy="204.9071" rx="59.615677" ry="59.807922"    style="clip-rule:evenodd;fill:none;fill-rule:evenodd;stroke:' + colfg + ';stroke-width:14.7777;stroke-miterlimit:2;stroke-dasharray:none;stroke-opacity:1" />' +
                          '<rect x="70.294197" y="10.832104" width="16.984541" height="258.2421"  style="clip-rule:evenodd;fill:' + colfg + ';fill-rule:nonzero;stroke:none;stroke-width:4.0289;stroke-miterlimit:2;stroke-opacity:1" />' +
                          '<ellipse cx="139.46097" cy="209.25656" rx="59.615677" ry="59.807922"   style="clip-rule:evenodd;fill:none;fill-rule:evenodd;stroke:' + colfg + ';stroke-width:14.7777;stroke-miterlimit:2;stroke-dasharray:none;stroke-opacity:1" />' +
                          '<rect x="419.08875" y="295.46732" width="66.611778" height="16.065193" style="clip-rule:evenodd;fill:' + colfg + ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
                          '<rect x="375.86157" y="338.65915" width="16.065193" height="66.611778" style="clip-rule:evenodd;fill:' + colfg + ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
                          '<rect x="10.464635" y="295.47906" width="338.23895" height="16.065193" style="clip-rule:evenodd;fill:' + colfg + ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
                          '</g><text xml:space="preserve" style="font-style:normal;font-stretch:normal;font-size:56px;line-height:1.25;font-family:\'Times New Roman\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:' + colfg + ';fill-opacity:1;stroke:none" x="5.9804988" y="454.479" id="text4634"><tspan sodipodi:role="line" id="tspan4632" x="5.9804988" y="454.479">S Y S T E M H A U S</tspan></text></svg>';
        let myRow = document.createElement('div');
        myRow.className = "row bol-bar-row";
        myRow.id = "bolFooterBarLogo";
        myRow.innerHTML = '<div class="col-4"><button type="button" id="bol__btn_up" class="bi-arrow-up-circle bol-bar-button" onclick="window.scrollTo(0,0);" title="' + bolSettings.GetMsgString("btn_up_title") + '"></button></div>';
        let s;
        {try {s = geField("bol.formVersion").value} catch (err) {}}
        if (s != undefined && s != "") {
            myRow.innerHTML = myRow.innerHTML + '<div class="col-4 bol-container-center"><span style="font-size: 70%;"> ' + s + '</span></div>';
        } else {
            myRow.innerHTML = myRow.innerHTML + '<div class="col-4">&nbsp;</div>';
        }
        myRow.innerHTML = myRow.innerHTML + '<div class="col-4 bol-bar-text">powered by <a href="https://www.bol-systemhaus.de/" target="_blank" rel="nofollow noreferrer">' + bol__logo + '</a></div>';
        this._obj.parentNode.appendChild(myRow);
    }
    SubmitForm (url, noValidation) {
        let currentAction = this._obj.action;
        if (window.onsubmit && OnSubmit(noValidation) === false) return false;
        this._obj.action = url;
        this._obj.submit();
        this._obj.target = currentAction;
    }
    Summary() {
        function FieldNotInSummary(fd) {
            if (fd == undefined || fd == "") return false;
            for (let i = 0; i < bolSettings.fieldsNotInSummary.length; i++) {
                let s = "";
                if (fd.id == undefined || fd.id == "") s = fd.name.toLowerCase(); else s = fd.id.toLowerCase();
                if (s == bolSettings.fieldsNotInSummary[i].toLowerCase()) return true;
            }
            return false;
        }
        function FieldInSummary(fd) {
            if (fd == undefined || fd == "") return false;
            for (let i = 0; i < bolSettings.fieldsInSummary.length; i++) {
                let s = "";
                if (fd.id == undefined || fd.id == "") s = fd.name.toLowerCase(); else s = fd.id.toLowerCase();
                if (s == bolSettings.fieldsInSummary[i].toLowerCase()) return true;
            }
            return false;
        }

        let cntOutput = document.getElementById("bolSummaryContainer");
        if (cntOutput == undefined) cntOutput = document.getElementById("control_page");
        if (cntOutput == undefined) return bolDebug(false, '(bolc__Form) kein container fuer "control_page"');
        cntOutput.innerHTML = "";
        let cntOutputPage = bol_getObjectPage(cntOutput);
        let page = parseInt(cntOutputPage.id.substring(4));

        let ProjectOutput;
        try {ProjectOutput = bolProject_Summary(page);} catch(err) {}
        if (ProjectOutput != undefined) {
            if (ProjectOutput.trim() == "") cntOutput.style.display = 'none'; else cntOutput.innerHTML = ProjectOutput;
            bolPage.goTo(page);
            return;
        }
        // pruefen, ob im globalen Script alternative Feldnamen vergeben wurden
        let a;
        try {a = bol__control_names; } catch(err) {} // Version 1.0
        if (a == undefined) try {a = contoll_names; } catch(err) {} // bol OZG Original
        if (a != undefined) bolSettings.FieldNamesAlternative = a;
        // pruefen, ob im globalen Script Feldnamen angegeben wurden, welche nicht in der Zusammenfassung auftauchen sollen
        a = undefined;
        try {a = bol__notInSummary; } catch(err) {} // Version 1.0
        if (a != undefined) bolSettings.fieldsNotInSummary = a;

        let fieldset = "", fieldset_active ="", stringOutput = "", fieldname;
        let field, fieldvalue = "", linealternate = true;
        // numFields = WAIMEA: this.numFields
        // getField = WAIMEA: this.getField
        // getNthFieldName = WAIMEA: this.getNthFieldName
        for (let i = 0; i < numFields; i++) {
            fieldname =getNthFieldName(i);
            field = getField(fieldname);
            if (field == undefined) continue;
            // wenn es nicht in der Summary auftauchen soll, Pruefung auf diese Klasse
            if (FieldNotInSummary(field)) continue;
            if (field.id == bolSettings.FieldNameConfigJSON) continue;
            // nur sichtbare und befuellte Felder verwenden
            if (field.value == undefined || field.value == "" || field.type == "hidden" || field.type == "button" || field.type == "submit") {
                if (!FieldInSummary(field)) continue;
            }

            switch (field.type) {
                case "text":
                case "textarea":
                    field.value = field.value.trim();
                    fieldvalue = field.value;
                    if (field.type == "textarea") fieldvalue = '<pre>' + fieldvalue + '</pre>';
                    break;
                case "file":
                    fieldvalue = field.value.replace("C:\\fakepath\\", "");
                    break;
                case "select":
                    fieldvalue = field.value;
                    break;
                default:
                    fieldvalue = field.value;
            }

            // aktuellen Fieldset Titel ermitteln
            fieldset_active = bol_getFieldsetLegend(field);
            // wenn das aktuelle Fieldset nicht gleich dem vorherigen und keine page ist, erfolgt eine Ausgabe der Zeile
            if (fieldset_active != fieldset && fieldset_active != "page") {
                stringOutput = stringOutput + '<div class="row"><div class="col-sm-12 bol-table-header">' + fieldset_active + '</div></div>';
                fieldset = fieldset_active;
            }
            if (linealternate) {
                stringOutput = stringOutput + '<div class="row">' +
                        '<div class="col-sm-5 bol-table-cellleft1">' + bol_GetFieldTitle(field) + '</div>' +
                        '<div class="col-sm-7 bol-table-cellright1">' + fieldvalue + '</div></div>';
                linealternate = false;
            } else {
                stringOutput = stringOutput + '<div class="row">' +
                        '<div class="col-sm-5 bol-table-cellleft2">' + bol_GetFieldTitle(field) + '</div>' +
                        '<div class="col-sm-7 bol-table-cellright2">' + fieldvalue + '</div></div>';
                linealternate = true;
            }
        }
        cntOutput.innerHTML = stringOutput;
        bolPage.goTo(page);
    }
    GetSidebarValues() {
        let ele;
        ele = document.getElementById("Kundenname");
        if (ele != undefined && ele.value != "") this._Kundenname = ele.value.trim();
        ele = document.getElementById("Kundenstrasse");
        if (ele != undefined && ele.value != "") this._Kundenstrasse = ele.value.trim();
        ele = document.getElementById("KundenPLZ");
        if (ele != undefined && ele.value != "") this._KundenPLZ = ele.value.trim();
        ele = document.getElementById("Kundenort");
        if (ele != undefined && ele.value != "") this._Kundenort = ele.value.trim();
        ele = document.getElementById("Kundentelefon");
        if (ele != undefined && ele.value != "") this._Kundentelefon = ele.value.trim();
        ele = document.getElementById("Kundenmail");
        if (ele != undefined && ele.value != "") this._Kundenmail = ele.value.trim();
        ele = document.getElementById("Impressum_Link");
        if (ele != undefined && ele.value != "") this._Impressum_Link = ele.value.trim();
        ele = document.getElementById("Kontakt_Link");
        if (ele != undefined && ele.value != "") this._Kontakt_Link = ele.value.trim();
        ele = document.getElementById("DSGVO_Link");
        if (ele != undefined && ele.value != "") this._DSGVO_Link = ele.value.trim();
        ele = document.getElementById("SidebarText");
        if (ele != undefined && ele.value != "") this._SidebarText = ele.value.trim();
    }
    CreateSideBar(DontLoadFields) {
        let ele, s = "";
        if (DontLoadFields != undefined) this.GetSidebarValues();
        if (this._SidebarText != "") s = s + '<span style="font-size: 0.8em;">' + this._SidebarText + '</span><br><br>';
        if (this._Kundenname != "") s = s + '<b>' + this._Kundenname + '</b>';

        if (this._Kundenstrasse != "") s = s + '<br>' + this._Kundenstrasse;
        if (this._KundenPLZ == undefined || this._KundenPLZ == "") {
            if (this._Kundenort != "") s = s + '<br>' + this._Kundenort + '<br>';
        } else {
            if (this._Kundenort != "") s = s + '<br>' + this._KundenPLZ + ' ' + this._Kundenort + '<br>';
        }
        if (this._Kundentelefon != "") s = s + '<br><span class="bi-telephone bol-sidebar-link" ></span>&nbsp;<span style="font-size: 0.8em;">' + this._Kundentelefon + '</span>';
        if (this._Kundenmail != "") s = s + '<br><span class="bi-mailbox bol-sidebar-link"></span>&nbsp;<span style="font-size: 0.8em;">' + this._Kundenmail + '</span>';

        if (this._Impressum_Link != "") s = s + '<br><br><a href="' + this._Impressum_Link + '" target="_blank" class="bol-sidebar-link">' + bolSettings.GetMsgString("txt_impress_link") +'</a>';
        if (this._Kontakt_Link != "") s = s + '<br><br><a href="' + this._Kontakt_Link + '" target="_blank" class="bol-sidebar-link">' + bolSettings.GetMsgString("txt_kontakt_link") +'</a>';
        if (this._DSGVO_Link != "") s = s + '<br><br><a href="' + this._DSGVO_Link + '" target="_blank" class="bol-sidebar-link">' + bolSettings.GetMsgString("txt_dsgvo_link") +'</a>';

        ele = document.getElementById("bolSideBar");
        if (ele == undefined) ele = document.getElementById("adresse_rechts");
        if (ele == undefined) return;
        if (s != "") {
            s = '<div class="col"><span class="bol-h2">' + bolSettings.GetMsgString("txt_sidebar_questions") + '</span><br><br>' + s + '</div>';
            if (ele != undefined) ele.innerHTML = s;
            bolShow("bolSideBar");
        } else {
            if (ele != undefined) ele.innerHTML = "";
            bolHide("bolSideBar");
        }
    }
}


/***************************************************************************************************
 * BLOCK
 * Page
***************************************************************************************************/
class bolc__Page {
    get active() {
        let i = bolSettings.page;
        if (i != 0) return i; else return 1;
        // Kompatibilaet zur alten Version
        // let e = document.getElementById('akt_page_number');
        // if (e == undefined) e = document.getElementById('act_page_number');
        // if (e == undefined || e.value == "") return 1;
        // else return parseInt(e.value);
    }
    set active(pageNumber) {
        bolSettings.page = pageNumber;
        return;
        // Kompatibilaet zur alten Version
        // let e = document.getElementById('act_page_number');
        // if (e == undefined) e = document.getElementById('akt_page_number');
        // if (e == undefined) return;
    }
    get max() {
        let e = document.querySelectorAll("div.row[id^=page]");
        if (e == undefined) return 0;
        else return e.length;
    }
    get pageContainer() {
        let s = 'div.row[id=page' + this.active + ']';
        let e = document.querySelectorAll(s);
        return e[0];
    }
    async goTo(pgNo) {
        if (pgNo > this.max) return this.active;
        if (pgNo < 1) return 1;
        let pgnr = pgNo;
        if (pgNo > this.active) {
            if (bolSettings._usablePages[pgNo - 1]) pgnr = pgNo;
            else {
                for (let i = pgNo; i <= bolPage.max; i++) {
                    if (bolSettings._usablePages[i - 1]) {
                        pgnr = i;
                        break;
                    }
                }
            }
        }

        let oldPgNo = this.active;
        this.Hide();
        this.active = pgnr;
        this.Show();
        // window.scrollTo(0, 0);

        try {await bolProject_DoSomethingOnPage(this.active)} catch(err) {}

        bolSteps.Update(oldPgNo, this.active);

        // pruefen, ob im globalen Script alternative Focus-Feldnamen vergeben wurden
        let arrayFocus, s, fd, fdColl;
        try {arrayFocus = bol__page_focus; } catch(err) {} // Version 1.0
        if (arrayFocus == undefined) try {arrayFocus = page_focus; } catch(err) {} // bol OZG Original
        if (arrayFocus != undefined) bolSettings.pageFocus = arrayFocus;

        if (bolSettings.pageFocus.length > 0) {
            {try {s = bolSettings.pageFocus[(this.active - 1)][1];} catch(err) {}}
            if (s != undefined) {try {fd = document.getElementById(s)} catch(err) {}}
        }

        if (fd == undefined) {
            fdColl = this.pageContainer.querySelectorAll("input, select, textarea");
            for (let i = 0; i < fdColl.length; i++) {
                s = fdColl[i].name.toLowerCase();
                if (s.indexOf("js_") >= 0) continue;
                else if (s.indexOf("bol.") >= 0) continue;
                else if (s.indexOf("bol.js_") >= 0) continue;
                else {fd = fdColl[i]; break;}
            }
        }


        if (fd != undefined) {
            window.scroll(0,0);
            // console.log(fd.id);
            fd.focus();
        }
        return true;
    }
    Hide() {
        this.pageContainer.style.display = 'none';
    }
    Show() {
        this.pageContainer.style.display = 'flex';
    }
    Next() {
        let customResult;
        try {customResult = bolProject_CheckPageBeforeLeave(this.active);} catch(err) {}
        if (customResult == false) return false;
        if (!this.Check()) return this.active;
        this.Summary();
        return this.goTo((this.active) + 1);
    }
    Prev() {
        let pgnr = 1;
        if (this.active > 1) {
            for (let i = (bolPage.active -1); i >= 1; i--) {
                if (bolSettings._usablePages[i - 1]) {
                    pgnr = i;
                    break;
                }
            }
            return this.goTo((pgnr));
        }
    }
    Switch(pgNo) {
        let customResult;
        if (pgNo < this.active && pgNo > 0) return this.goTo(pgNo);
        if (pgNo == (this.active + 1)) return this.Next();
        try {customResult = bolProject_CheckPageBeforeLeave(this.active);} catch(err) {}
        if (customResult == false) return this.active;
        if (!this.Check()) return this.active;
        // if (bolSettings._checkPage) {
        //     for (let i = this.active; i < pgNo; i++) {
        //         if (!bolSettings._usablePages[i - 1]) continue;
        //         if (!bolSettings._CheckedPages[i - 1]) {
        //             bolDialog.ShowErrorPages();
        //             return this.active;
        //         }
        //     }
        // }
        if ((pgNo) >= this.max && (bolSettings._modeSummary)) this.Summary(pgNo);
        return this.goTo(pgNo);
    }
    Check(pgNo) {
        let b;
        if (pgNo == undefined) pgNo = this.active;
        if (!bolSettings._checkPage) return true;
        b = bol_BlockCheck("page" + pgNo);
        bolSettings.PageChecked = b;
        if (!b) {
            let pe = document.getElementById(bolSettings._fdsError[0].name);
            if (pe == undefined) pe = document.getElementsByName(bolSettings._fdsError[0].name)[0];
        }
        return b;
    }
    Summary(pgNo) {
        if (pgNo == undefined) pgNo = this.active + 1;
        if (pgNo == this.max && (bolSettings._modeSummary)) bolForm.Summary();
    }
    StringOfFields(BlockOfFields, theKey, Mode, NameReplacement) {
        let s = "", fname, fstrings = "", obj, fdsInp;
        if (BlockOfFields == undefined || BlockOfFields == "") {
            fdsInp = this.pageContainer.querySelectorAll("input, select, textarea");
        } else fdsInp = document.getElementById(BlockOfFields).querySelectorAll("input, select, textarea");
        if (fdsInp.length <= 0) return bolDebug("", "(bolc_Page.StringOfFields) no objects");

        if (Mode == undefined) Mode = "j";
        else Mode = Mode.toLowerCase().substr(0,1);

        for (var i = 0; i < fdsInp.length; i++) {
            let f = getField(fdsInp[i].name);
            if (f == undefined) continue;
            if (f.id == undefined) fname = f.name; else fname = f.id;
            if (fname.toLowerCase().substring(0,3) == "js_") continue;
            if (fstrings.indexOf(fname) >= 0) continue;
            fstrings = fstrings + fname + ';';

            let e = document.getElementById(fname);
            // Sonderbehandlung radio
            if (e == undefined) e = document.getElementsByName(fname)[0];
            if (e == undefined) continue;

            obj = new bolc__Object(e);
            if (obj == undefined) continue;
            switch (Mode) {
                case "i": //input objects
                    // if (e.type == "radio") break;
                    s = s + obj.value2INPUT(theKey, NameReplacement);
                    break;
                case "x": // xml structure
                    s = s + obj.value2XML(theKey);
                    break;
                case "j":
                default: // json structure
                    s = s + obj.value2JSON() + ', ';
                    break;
            }
        }
        return s;
    }
}


/***************************************************************************************************
 * BLOCK
 * Fieldset
***************************************************************************************************/
class bolc__Fieldset {
    _obj;
    // TODO: Pass refresh and clear functions in constructor as optional
    constructor(objId) {
        if (objId == undefined) return;
        this._obj = document.getElementById(objId);
        let l = this._obj.getElementsByTagName("legend");
        if (this._obj.id == "") if (l.length > 0) this._obj.id = "fs." + l[0].id;
    }
    get title() {
        let ln = document.getElementById(this._obj.id + '.fstext');
        if (ln != undefined) return ln.innerText;
        let l = this._obj.getElementsByTagName("legend");
        if (l != undefined) return l[0].innerText;
        return "";
    }
    set title(newValue) {
        let ln = document.getElementById(this._obj.id + '.fstext');
        if (ln != undefined) {ln.innerText = newValue; return}
        let l = this._obj.getElementsByTagName("legend");
        if (l != undefined) l[0].innerText = newValue;
        return;
    }
    StyleIt() {
        function btnstring(btype, bname) {
            let btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("bol-fs-button");
            switch (btype) {
                case "togglepart":
                    btn.classList.add(bolSettings.symbol_up);
                    btn.id = "btntp." + bname;
                    btn.title = bolSettings.GetMsgString("fieldset_btn_togglepart");
                    // TODO: Pass refresh as argument
                    btn.addEventListener("onclick", "bolFieldsetTogglePart(this);");
                    btn.value = "down";
                    break;
                case "bol-fs-down":
                case "toggleup":
                    btn.classList.add(bolSettings.symbol_down);
                    btn.id = "btnt." + bname;
                    btn.title = bolSettings.GetMsgString("fieldset_btn_toggle");
                    btn.setAttribute("onclick", "bolFieldsetToggle(this);");
                    btn.value = "up";
                    break;
                case "bol-fs-erase":
                case "erase":
                    btn.classList.add(bolSettings.symbol_erasek);
                    btn.id = "btne." + bname;
                    btn.title = bolSettings.GetMsgString("fieldset_btn_check");
                    btn.setAttribute("onclick", "bolFieldsetCheck(this);");
                    break;
                case "bol-fs-check":
                case "check":
                    btn.classList.add(bolSettings.symbol_check);
                    btn.id = "btnc." + bname;
                    btn.title = bolSettings.GetMsgString("fieldset_btn_check");
                    btn.setAttribute("onclick", "bolFieldsetCheck(this);");
                    break;
                case "bol-fs-toggle":
                case "toggle":
                    btn.classList.add(bolSettings.symbol_up);
                    btn.id = "btnt." + bname;
                    btn.title = bolSettings.GetMsgString("fieldset_btn_toggle");
                    btn.setAttribute("onclick", "bolFieldsetToggle(this);");
                    btn.value = "down";
                    break;
            }
            return btn;
        }
        if (this._obj == undefined) return;

        let fsID, fsLegend, fsInner, fsShow;
        let myClasses = [], myFunctions = [], newStyle, lRow, lColL, lColR;
        let legendText, legendHelp;

        // pruefen, ob das FS Legende und Body hat
        try {fsLegend = this._obj.getElementsByTagName("legend")[0];} catch(err) {}
        try {fsInner = this._obj.querySelectorAll("div.fieldset-inner-bs")[0];} catch(err) {}

        if (fsLegend == undefined) return;
        if (fsInner == undefined) return;

        // gibt es bereits eine ID oder neu anlegen
        if (this._obj.id == undefined || this._obj.id == "") fsID = fsLegend.id;
        else fsID = this._obj.id;
        this._obj.id = fsID;
        fsLegend.id = fsID + ".legend";
        fsInner.id = fsID + ".inner";
        if (this._obj.style.display != undefined) {
            if (this._obj.style.display == "") fsShow = false; else fsShow = true;
        }
        myClasses = this._obj.className.split(" ");

        for (let i = 0; i < myClasses.length; i++) {
            if (myClasses[i].indexOf("bol-fs-s") >= 0) {newStyle = myClasses[i]; continue}
            if (myClasses[i] == "bol-fs-f1" || myClasses[i] == "bol-fs-v1") {myFunctions.push("bol-fs-toggle"); continue}
            if (myClasses[i] == "bol-fs-f2" || myClasses[i] == "bol-fs-v2") {myFunctions.push("bol-fs-erase"); continue}
            if (myClasses[i] == "bol-fs-f3" || myClasses[i] == "bol-fs-v3") {myFunctions.push("bol-fs-check"); continue}
            if (myClasses[i] == "bol-fs-f10" || myClasses[i] == "bol-fs-v10") {myFunctions.push("bol-fs-down"); continue}
            if (myClasses[i] == "bol-fs-toggle") {myFunctions.push("bol-fs-toggle"); continue}
            if (myClasses[i] == "bol-fs-erase") {myFunctions.push("bol-fs-erase"); continue}
            if (myClasses[i] == "bol-fs-check") {myFunctions.push("bol-fs-check"); continue}
            if (myClasses[i] == "bol-fs-down") {myFunctions.push("bol-fs-down"); continue}
            if (myClasses[i] == "bol-fs-help") {myFunctions.push("bol-fs-help"); continue}

        }
        if (fsLegend.innerText.indexOf("@") > 0) {
            legendText = fsLegend.innerText.substring(0, fsLegend.innerText.indexOf("@"));
            legendHelp = fsLegend.innerText.substring(fsLegend.innerText.indexOf("@") + 1);
        } else {
            legendText = fsLegend.innerText;
            legendHelp = "";
        }

        if (fsID == "zone.F2") {
            console.log("UHU");
        }
        // gibt es Funktions-Button?
        if (myFunctions.length > 0) {
            lRow = document.createElement("div");
            lRow.className = "row " + newStyle + "legendrow";
            lColL = document.createElement("div");
            lColL.className = "col-" + (11 - myFunctions.length);
            if (legendHelp != "") lColL.innerHTML = legendText + bol_MakeInfoButton(legendHelp);
            else lColL.innerHTML = fsLegend.innerText;
            if (newStyle != "") {
                lColL.removeAttribute("style");
                lColL.classList.add(newStyle + "legend");
            }

            lRow.appendChild(lColL);
            lColR = document.createElement("div");
            lColR.className = "col-" + (myFunctions.length + 1) + " bol-fs-colright";
            for (let i = 0; i < myFunctions.length; i++) {
                lColR.innerHTML = lColR.innerHTML + "&nbsp;";
                lColR.appendChild(btnstring(myFunctions[i], fsID));
                if (myFunctions[i] == "bol-fs-down") this.SwitchOnOff();
            }
            lRow.appendChild(lColR);
            if (newStyle != "") {
                lRow.removeAttribute("style");
                lRow.classList.add(newStyle + "legendrow");
            }
            fsLegend.innerHTML = "";
            fsLegend.appendChild(lRow);
        } else {
            if (newStyle != "") {}
            if (legendHelp != "") fsLegend.innerHTML = legendText + bol_MakeInfoButton(legendHelp);
        }
        if (newStyle != "") {
            this._obj.removeAttribute("style");
            this._obj.classList.add(newStyle);
            fsLegend.removeAttribute("style");
            fsLegend.removeAttribute("class");
            if (myFunctions.length <= 0) {
                fsLegend.setAttribute("class", newStyle + "legendrow");
                fsLegend.classList.add(newStyle + "legend");
            }
            fsInner.removeAttribute("style");
            fsInner.className = newStyle + "inner";
        }
        if (fsShow != undefined) {
            if (fsShow) this._obj.style.display = "none"; else this._obj.style.display = "";
        }
    }
    SwitchOnOff(Mode) {
        let fsbody;
        fsbody = document.getElementById(this._obj.id + '.inner');
        if (fsbody == undefined) return false;
        if (!Mode) fsbody.style.display = 'none';
        else fsbody.style.display = '';
    }
    Toggle(Button) {
        if (Button.value == "up") {
            Button.classList.remove(bolSettings.symbol_down);
            Button.classList.add(bolSettings.symbol_up);
            Button.value = "down";
            this.SwitchOnOff(true);
        } else {
            Button.classList.remove(bolSettings.symbol_up);
            Button.classList.add(bolSettings.symbol_down);
            Button.value = "up";
            this.SwitchOnOff();
        }
        return true;
    }
    IsCollapsed() {
        let e = document.getElementById("btnt." + this._obj.id);
        if (e == undefined) return false;
        if (e.value == "down") return false;
        return true;
    }
    Collapse() {
        if (!this.IsCollapsed()) {
            let e = document.getElementById("btnt." + this._obj.id);
            this.Toggle(e);
        }
    }
    Expand() {
        if (this.IsCollapsed()) {
            let e = document.getElementById("btnt." + this._obj.id);
            this.Toggle(e);
        }
    }
}


/***************************************************************************************************
 * BLOCK
 * Object
***************************************************************************************************/
class bolc__Object {
    _obj;
    _label;
    type;
    radioName;
    constructor(obj) {
        this._label = undefined;
        this.type = "";
        this.radioName = "";
        if (obj == undefined || obj == "") {
            this._obj = undefined;
            return;
        }
        if (typeof obj === 'undefined') return;
        if (typeof obj === "object") {
            this._obj = obj;
            this.type = bol_GetObjectType(this._obj);
            if (this.type == "hidden") return;
            if (this.type == "radio") this.radioName = this.name;
            try {this._label = bol_LabelGet(this._obj.id)} catch(err) {}
        }
    }
    get valueClean() {
        if (this._obj == undefined) return "";
        let s = this._obj.value;
        s = s.replace("&#8203;", " ");
        s = s.replace("&#8210;", " - ");
        s = s.replace("&#8211;", " - ");
        s = s.replace("&#8212;", " -- ");
        s = s.replace("&#8216;", "'");
        s = s.replace("&#8217;", "'");
        s = s.replace("&#8218;", "'");
        s = s.replace("&#8219;", "'");
        return s;
    }
    FormatAsDate() {
        if (this._obj == undefined) return false;
        let dFormat = "%D2.%M2.%Y2";
        let nDate = this._obj.value;
        let oDate = new DataClassDate ();
        if (oDate.Scan(nDate, dFormat) != true) {
            InputError(this._obj, bolSettings.GetMsgString("error_notadate"), 1 ,0);
            return false;
        }
        return oDate.Format(dFormat);
    }
    CheckDateBirth() {
        let nDate = this.FormatAsDate();
        if ((new Date()).valueOf() < bol_CalcDate(nDate, 0, 0, 0).valueOf()) {
            InputError(this._obj, bolSettings.GetMsgString("error_birthdatefuture"), 1 ,0);
            return false;
        }
        if (bol_CalcDate(nDate, 0, 0, 0).valueOf() < (new Date(1900, 0, 1)).valueOf()) {
            InputError(this._obj, bolSettings.GetMsgString("error_birthdatepast"), 1 ,0);
            return false;
        }
        return true;
    }
    CheckLegalAge() {
        if (!this.CheckDateBirth()) return false;
        if (bol_CalcDate(this.FormatAsDate(), 0, 0, 0).valueOf() > bol_CalcDate(new Date, -18, 0, 0).valueOf()) {
            InputError (this._obj, bolSettings.GetMsgString("error_notlegalage"), 1 ,0);
            return false;
        }
        return true;
    }
    CheckOlder(Years) {
        if ((new Date()).valueOf() < bol_CalcDate(this.FormatAsDate(), Years, 0, 0).valueOf()) return false;
        return true;
    }
    CheckYounger(Years) {
        if ((new Date()).valueOf() > bol_CalcDate(this.FormatAsDate(), Years, 0, 1).valueOf()) return false;
        return true;
    }
    value2Date() {
        return this.FormatAsDate();
    }
    value2DateString(FormatType) {
        if (this._obj == undefined) return "";
        return bol_DateString(this._obj.value, FormatType);
    }
    CalcDate(YearsToChange, MonthsToChange, DaysToChange, FirstDay) {
        let d = bol_CalcDate(this._obj.value, YearsToChange, MonthsToChange, DaysToChange, FirstDay);
        if (d == undefined) return "";
        return d;
    }
    value2INPUT(key, NameReplacement) {
        if (this._obj == undefined) return "";
        let valString = "";
        if (this.type == "radio") {
            valString = getField(this.radioName).value;
        } else {
            valString = this._obj.value.trim();
        }
        let nn;
        if (NameReplacement != undefined) nn = this.name.replace(NameReplacement, ""); else nn = this.name;
        return '<input type="hidden" id="' + key + '.' + nn + '" name="' + key + '.' + nn + '" value="' + valString + '"></input>';
    }
    value2JSON(key) {
        if (this._obj == undefined) return "";
        if (this.type == "radio") {
            return '"' + this.radioName.replace(".", "_") + '": ' + JSON.stringify(getField(this.radioName).value.trim()) + '';
        } else {
            return '"' + this._obj.name.replace(".", "_") + '": ' + JSON.stringify(this._obj.value.trim()) + '';
        }
    }
    value2XML(key) {
        if (this._obj == undefined) return "";
        let s;
        if (this.type == "radio") {
            s = this.radioName.replace(".", "_");
            return '<' + key + "_" + s + '>' + getField(this.radioName).value.trim() + '</' + key + "_" + s + '>';
        } else {
            s = this._obj.name.replace(".", "_");
            return '<' + key + "_" + s + '>' + this._obj.value.trim() + '</' + key + "_" + s + '>';
        }
    }
    JSON2value(key, value) {
        let xx, skey = key.replace("_", ".");
        try {xx = getField(skey).type} catch(err) {}
        if (xx != undefined) {
            if (xx.substring(0,5) == "radio") {
                this._obj = document.getElementsByName(skey);

            } else {
                this._obj = document.getElementById(skey);
            }
            getField(skey).value = value;
        }
    }
    Show() {
        if (this._obj == undefined) return;
        switch (this._obj.type) {
            case "checkbox":
                this._obj.style.display = '';
                this._obj.parentNode.style.display = '';
                break;
            case "radio":
                for (let i = 0; i < document.getElementsByName(this._obj.name).length; i++) {
                    document.getElementsByName(this._obj.name)[i].parentNode.style.display = '';
                }
            case "text":
            case "textarea":
            case "file":
                this._obj.parentNode.style.display = '';
                break;
            case "select":
            case "select-multiple":
                this._obj.style.display = '';
                break;
            default:
                this._obj.style.display = '';
        }
        if (this._label != undefined) this._label.style.display = '';
    }
    Hide() {
        if (this._obj == undefined) return;
        switch (this._obj.type) {
            case "checkbox":
                this._obj.style.display = 'none';
                this._obj.parentNode.style.display = 'none';
                break;
            case "radio":
                for (let i = 0; i < document.getElementsByName(this._obj.name).length; i++) {
                    document.getElementsByName(this._obj.name)[i].parentNode.style.display = 'none';
                }
            case "text":
            case "textarea":
            case "file":
                this._obj.parentNode.style.display = 'none';
                break;
            case "select":
            case "select-multiple":
                this._obj.style.display = 'none';
                break;
            default:
                this._obj.style.display = 'none';
        }
        if (this._label != undefined) this._label.style.display = 'none';
    }
    get visible() {
        if (this._obj == undefined) return false;
        if (this._obj.style.display == '') return true; else return false;
    }
    set visible(newMode) {
        switch (newMode) {
            case "Ja":
            case "ja":
            case "j":
            case "yes":
            case true:
            case 1:
                this.Show();
                break;
            default:
                this.Hide();
        }
    }
    get name() {
        if (this._obj == undefined) return "";
        return this._obj.name;
    }
    get id() {
        if (this._obj == undefined) return "";
        return this._obj.id;
    }
    get value() {
        if (this._obj == undefined) return "";
        return this._obj.value;
    }
    get required() {
        if (this._obj == undefined) return "";
        return this._obj.required;
    }
    get label() {
        if (this._obj == undefined) return undefined;
        return this._obj.title;
    }
    set label(newValue) {
        if (this._obj == undefined) return;
        this._obj.title = newValue;
    }
    get isEmpty() {
        if (this._obj == undefined) return;
        switch (this.type) {
            case "checkbox":
                return this._obj.checked; break;
            case "radio":
                if (getField(this.name).value.trim() == "") return true; break;
            case "text":
            case "password":
            case "textarea":
            case "file":
                if (this.value.trim() == "") return true; break;
            case "select":
            case "select-one":
            case "select-multiple":
                if (this.value.trim() == "" || this.value == "0") return true; break;
            default:
                return false;
        }
    }
    get pageNo() {
        if (this._obj == undefined) return undefined;
        return bol_getPage4Object(this._obj.id);
    }
    Clear() {
        function ResetField(f) {
            let ndtype = bol_GetObjectType(f);
            if (ndtype == 'checkbox' || ndtype == 'radio') f.checked = false;
            if (ndtype == 'text'  || ndtype == 'file' || ndtype == 'textarea' || ndtype == 'password') f.value = '';
            if (ndtype == 'select') {
                f.value = '';
                f.selectedIndex = -1;
            }
        }

        if (this._obj == undefined) return false;
        switch (this.type) {
            case "container":
            case "div":
            case "fieldset":
                let ndl = this._obj.querySelectorAll("input");
                for (let i = 0; i < ndl.length; i++) {ResetField(ndl[i])}

                ndl = this._obj.querySelectorAll("textarea");
                for (let i = 0; i < ndl.length; i++) {ResetField(ndl[i])}

                ndl = this._obj.querySelectorAll("select");
                for (var i = 0; i < ndl.length; i++) {if (ndl[i][0] != undefined) ndl[i][0].selected = true;}
                bolSettings._fdsError = []; // Liste der fehlerhaften Felder zuruecksetzen
                let flist = this._obj.querySelectorAll("input, select, textarea");
                for (let i = 0; i < flist.length; i++) {
                    if (flist[i].type == "radio") flist[i].parentNode.style.color = "inherit"; else clearInputError(flist[i]);
                }
                break;
            default:
                ResetField(this._obj);
                clearInputError(this._obj);
        }
    }
    StyleIt() {
        let textlabel, texttooltip, texthelp;
        function SplitEformsTitle(original) {
            if (original == undefined) return;
            textlabel = "";
            texttooltip = "";
            texthelp = "";
            let pt = original.indexOf("#");
            let ph = original.indexOf("@");
            if (ph == -1) ph = original.indexOf("^");
            if (ph != -1) {
                if (pt != -1) {
                    if (ph > pt) texthelp = original.substring(ph + 1).trim();
                    else texthelp = original.substring(ph + 1, pt).trim();
                } else texthelp = original.substring(ph + 1).trim();
                if (pt == -1 || pt > ph) texttooltip = textlabel = original.substring(0, ph).trim();
                else textlabel = original.substring(0, pt).trim();
            }
            if (pt != -1) {
                if (ph != -1) {
                    if (pt > ph) texttooltip = original.substring(pt + 1).trim();
                    else texttooltip = original.substring(pt + 1, ph).trim();
                } else texttooltip = original.substring(pt + 1).trim();
                if (ph == -1 || ph > pt) textlabel = original.substring(0, pt).trim();
                else textlabel = original.substring(0, ph).trim();
            }
            if (textlabel == "") {
                if (ph > 0) textlabel = original.substring(0, ph).trim();
                else if (pt > 0) textlabel = original.substring(0, pt).trim();
                else texttooltip = textlabel = original.trim();
            }
        }
        function HTMLRequired(MyLabel) {
            if (bolSettings._useStar4required) MyLabel.innerText = MyLabel.innerText + ' *';
            else MyLabel.innerHTML = MyLabel.innerHTML + '&nbsp;<span class="bol-field-required ' + bolSettings.symbol_fieldrequired + '" title="' + bolSettings._ttRequired + '" alt="Symbol ' + bolSettings._ttRequired + '"></span>';
        }
        function HTMLRequiredRadio(MyLabel) {
            if (bolSettings._useRadioRequired) {
                if (bolSettings._useStar4required) MyLabel.innerText = MyLabel.innerText + ' *';
                else MyLabel.innerHTML = MyLabel.innerHTML + '&nbsp;<span class="bol-field-required ' + bolSettings.symbol_radiorequired + '" title="' + bolSettings._ttRadioRequired + '" alt="Symbol ' + bolSettings._ttRequired + '"></span>';
            }
        }
        function HTMLInfo(MyLabel) {
            if (bolSettings._useLink4Info) {
                MyLabel.innerHTML = MyLabel.innerHTML +
                    ' <a title="' + bolSettings._ttInfo +
                    '" onclick="bolDialog.Show(`' + bolSettings._ttDlgInfoTitle + '`, `' + texthelp + '`)">(i)</a>';
            } else {
                MyLabel.innerHTML = MyLabel.innerHTML +
                    '&nbsp;<button type="button" class="bol-field-info ' + bolSettings.symbol_fieldinfo +
                    '" title="' + bolSettings._ttInfo +
                    '" onclick="bolDialog.Show(`' + bolSettings._ttDlgInfoTitle + '`, `' + texthelp + '`)"></button>';
            }

         }
        if (this._obj == undefined) return;
        if (this.type == "hidden") return;
        if (this._obj.className.toLowerCase().indexOf('bol-nolabel') != -1) return;

        switch (this.type) {
            case "checkbox":
                if (this._obj.getAttribute("bolTitle") == undefined) this._obj.setAttribute("bolTitle", this._obj.title);
                SplitEformsTitle(this._obj.title);
                if (texttooltip != "") this._obj.title = texttooltip;
                let e = this._obj.parentNode.getElementsByTagName("SPAN");
                if (e[0] != undefined) {
                    if (this._obj.required) HTMLRequired(e[0]);
                    if (texthelp != "") HTMLInfo(e[0]);
                }
                break;
            case "radio":
                if (this._obj.getAttribute("bolTitle") == undefined) this._obj.setAttribute("bolTitle", this._obj.title);
                SplitEformsTitle(this._obj.title);
                if (texttooltip != "") this._obj.title = texttooltip;
                let r = this._obj.parentNode.getElementsByTagName("SPAN");
                if (r[0] != undefined) {
                    if (this._obj.required) HTMLRequiredRadio(r[0]);
                    if (texthelp != "") HTMLInfo(r[0]);
                }
                break;
            case "file" :
                    if (bolSettings.useLoad4Files) this._obj.setAttribute("onchange", "bol_FileLoad(this);");
                    if (bolSettings.useAccept4Files) this._obj.setAttribute("accept", bolSettings.fileTypes);
            case "text":
            case "textarea":
            case "select":
                if (this._label != undefined) SplitEformsTitle(this._label.innerText);
                else if (this._obj.parentNode.className.toLowerCase().indexOf("infieldlabel") != -1) {
                    if (this._obj.getAttribute("bolTitle") == undefined) this._obj.setAttribute("bolTitle", this._obj.title);
                    if (this._obj.getAttribute("bolTitle") != undefined) SplitEformsTitle(this._obj.getAttribute("bolTitle"))
                    else SplitEformsTitle(this._obj.title);
                    this._label = document.createElement("label");
                    this._label.setAttribute("for", this._obj.id);
                    this._obj.parentNode.appendChild(this._label);
                }
                if (this._label != undefined) {
                    if (textlabel != "") this._label.innerHTML = textlabel;
                    if (texttooltip != "") this._obj.title = texttooltip;
                    if (this._obj.required) HTMLRequired(this._label);
                    if (texthelp != "") HTMLInfo(this._label);
                }
                break;
            default:
                break;
        }
    }
}


/***************************************************************************************************
 * BLOCK
 * global helper functions
***************************************************************************************************/

/*----- Field / Element --------------------------------------------------------------------------*/
function bol_GetObjectType(e) {
    if (e == undefined || e == null) return undefined;
    switch (e.tagName.toLowerCase()) {
        case "div":
            return "container";
        case "input":
            return e.type.toLowerCase();
        case "select-one":
        case "select":
            return "select";
        case "textarea":
            return "textarea";
        case "fieldset":
            return "fieldset";
        default:
            return null;
    }
}

function bol_LabelGet(fname) {
    let e = document.getElementById(fname);
    let l = document.querySelectorAll("label[for='" + fname + "']");
    if (l.length > 0) return l[0];
    else return undefined;
}
function bol_UpdateLabel(fname, text) {
    let l = bol_LabelGet(fname);
    if (l == undefined) return;
    let i = l.innerHTML.indexOf("<span");
    if (i > 0) {
        let s = text + l.innerHTML.substring(i);
        l.innerHTML = s;
    } else l.innerText = text;
}
function bol_GetFieldTitle(obj) {
    function getAlternative(key) {
        if (bolSettings.FieldNamesAlternative == undefined) return "";
        for (var i = 0; i < bolSettings.FieldNamesAlternative.length; i++) {
            if (bolSettings.FieldNamesAlternative[i][0] == key) return bolSettings.FieldNamesAlternative[i][1];
        }
        return "";
    }

	let s = "";
	if (obj.type == "radio" || obj.type == "radiobutton") obj = document.getElementsByName(obj.name)[0];
	if (obj == null) return "";
	s = getAlternative(obj.name);
	if (s == "") s = obj.title;
	if (s == "") s = obj.id;
	return s;
}
/*----- Styling ----------------------------------------------------------------------------------*/
function bol_StyleFields(BlockOfFields) {
    let elist, e;

    if (BlockOfFields == undefined || BlockOfFields == "") {
        elist = document.querySelectorAll("input, select, textarea");
    } else {
        e = document.getElementById(BlockOfFields);
        if (e == undefined) return;
        elist = e.querySelectorAll("input, select, textarea");
    }
    if (elist.length <= 0) return;

    elist.forEach( function(e) {
        let MyObj = new bolc__Object(e);
        MyObj.StyleIt();
    })
}

// TODO: Add refresh and clear arguments here
function bol_StyleFieldsets(BlockOfFields) {
    let e, fs, fslist;
    if (BlockOfFields == undefined || BlockOfFields == "") {
        e = document;
    } else {
        e = document.getElementById(BlockOfFields);
    }
    if (e == undefined) return;
    fslist = e.getElementsByTagName("FIELDSET");
    if (fslist.length > 0) {
        for (let i = 0; i < fslist.length; i++) {
            // TODO: Pass refresh and clear here
            fs = new bolc__Fieldset();
            fs._obj = fslist[i];
            fs.StyleIt();
        }
    }
}
function bol_StylePages() {
    let pg = document.querySelectorAll("div.row[id^=page]");
    for (let i = 0; i < pg.length; i++) {
        pg[i].className = "row bol-pagestyle";
        pg[i].style.display = 'none';
    }
}

function bol_MakeInfoButton(helpMsg) {
    let txt;
    if (bolSettings._useLink4Info) {
        txt = '&nbsp;<a title="' + bolSettings._ttInfo +
              '" onclick="bolDialog.Show(`' + bolSettings._ttDlgInfoTitle + '`, `' + helpMsg + '`)">(i)</a>';
    } else {
       txt = '&nbsp;<button type="button" class="bol-field-info ' + bolSettings.symbol_fieldinfo +
             '" title="' + bolSettings._ttInfo + '" onclick="bolDialog.Show(`' + bolSettings._ttDlgInfoTitle + '`, `' + helpMsg + '`)"></button>';
    }
    return txt;
}
/*----- fieldset button interaction --------------------------------------------------------------*/
function bolFieldsetToggle(Button) {
    let fs_id = Button.id.substring(Button.id.indexOf(".") + 1);
    let e = document.getElementById(fs_id + '.inner');
    (new bolc__Fieldset(fs_id).Toggle(Button));
    try {bolProject_Refresh(bol_getObjectPage(e).id.substring(4))} catch(err) {}
}
function bolFieldsetTogglePart(Button) {
    let fs_id = Button.id.substring(Button.id.indexOf(".") + 1);
    let e = document.getElementById(fs_id);
    (new bolc__Fieldset(fs_id).Toggle(Button, true));
    try {bolProject_Refresh(bol_getObjectPage(e).id.substring(4))} catch(err) {}
}
function bolFieldsetCheck(Button) {
    let fs_id = Button.id.substring(Button.id.indexOf(".") + 1);
    let e = document.getElementById(fs_id);
    if (e == undefined) return;
    bol_BlockCheck(e.id);
    try {bolProject_Refresh(bol_getObjectPage(e).id.substring(4), fs_id)} catch(err) {}
}
function bolFieldsetClear(Button) {
    let fs_id = Button.id.substring(Button.id.indexOf(".") + 1);
    (new bolc__Object(document.getElementById(fs_id))).Clear();
    try {bolProject_Clear(bol_getObjectPage(e).id.substring(4), fs_id)} catch(err) {}
}
function bolFieldsetDelete(Button) {
    let fs_id = Button.id.substring(Button.id.indexOf(".") + 1);
    let e = document.getElementById(fs_id);
    if (e == undefined) return;
    e.parentNode.removeChild(e);
    try {bolProject_Clear(bol_getObjectPage(e).id.substring(4), fs_id)} catch(err) {}
}
function bolFieldsetCollapse(fname) {
    let fs = new bolc__Fieldset(fname);
    if (fs == undefined) return;
    fs.Collapse();
}
function bolFieldsetExpand(fname) {
    let fs = new bolc__Fieldset(fname);
    if (fs == undefined) return;
    fs.Expand();
}

/*----- finding objects recursive ----------------------------------------------------------------*/
function bol_CheckObjectVisibility(obj) {
	if (obj == undefined) return undefined;
	if ((obj.type == "radio" || obj.type == "radiobutton")) obj = this.getField(obj.name)[0];
	if (obj.style.visibility == "hidden" || obj.style.display == 'none' || obj.type == "hidden") return false;
	else if (obj.getAttribute('class') == "page" || obj.getAttribute('class') == "bootstrap-page") return true;
	else return bol_CheckObjectVisibility (obj.parentNode);
}
function bol_getObjectPage(obj) {
    if (obj == null) return "";
    if (obj.tagName == "DIV" && obj.id.substring(0,4) == "page") return obj;
    else return bol_getObjectPage (obj.parentNode);
}
function bol_getFieldsetLegend(obj) {
    if (obj == null) return "";
    if ((obj != null) && (obj.type == "radio" || obj.type == "radiobutton")) obj = document.getElementsByName(obj.name)[0];
    if (obj.tagName == "FIELDSET") {
        var lgd = obj.querySelectorAll("legend");
        return lgd[0].innerText;
    }
    else return bol_getFieldsetLegend(obj.parentNode);
}
function bol_getPage4Object(oname) {
    let p = bol_getObjectPage(document.getElementById(oname));
    if (p == undefined || p == "") return 0;
    return parseInt(p.id.substring(4));
}

/*----- file upload ------------------------------------------------------------------------------*/
function bol_FileLoad(e) {
	if (e == undefined) return;
	if (e.value == "") return;

    let r = bol_FileCheck(e.name, bolSettings.fileTypes, bolSettings.FileMaxSize);
    switch (r) {
        case 4:
        case 3:
            bolDialog.ShowErrorFile(2);
            e.value = "";
            break;
        case 5:
        case 2:
        case 1:
            bolDialog.ShowErrorFile(1);
            e.value = "";
            break;
        default:
            break;
    }
}

function bol_FileDelete(fieldId) {
    if (fieldId == undefined) return;
    bolSettings.UpdateFiles(fieldId, undefined, undefined);
    getField(fieldId).value = "";
}

function bol_FileCheck(fieldname, fileTypes, fileMaxSize) {
	function GetFileSize(f) {
		fSizes = fSizes + f.size;
		if (fileMaxSize < (f.size / 1024 / 1024)) return false;
		else return true;
	}
	function IsTypeValid(f) {
        let fext = "", ft = "", b = false;
        fext = f.name.split(".");
        fext = "." + fext[fext.length - 1].toLowerCase().trim();
        ft = fileTypes.toLowerCase();
        // zunaechst Uberpruefung auf Dateinamenserweiterung
        if (ft.indexOf(fext) >= 0) return true;
        // keine Erweiterung, dann MIME-Type Pruefung
        if (ft.indexOf(f.type) >= 0) return true;
        return false;
	}
	let myError = 0, myErrorFile = "", fSizes = 0, fTypes = fileTypes.split(",");
	let field = getField(fieldname);
	if (field == undefined) return false;
	let fileCount = field.files.length;
	for (let i = 0; i < fileCount; i++) {
		if (!GetFileSize(field.files[i])) {
			if (fileCount > 1) myError = 2; else myError = 1;
			myErrorFile = field.files[i].name;
			break;
		}
		if (!IsTypeValid(field.files[i])) {
			if (fileCount > 1) myError = 4; else myError = 3;
			myErrorFile = field.files[i].name;
			break;
		}
	}
	if (fileMaxSize < (fSizes / 1024 / 1024)) myError = 5;
    if (myError == 0) bolSettings.UpdateFiles(fieldname, field.files[0].name, fSizes);
    return myError;
}



/*----- check inputs -----------------------------------------------------------------------------*/
function bol_BlockCheck(eleid) {
	let pe = document.getElementById(eleid);
    if (pe == undefined) return false;

	bolSettings._fdsError = []; // Liste der fehlerhaften Felder zuruecksetzen
    let flist = pe.querySelectorAll("input, select, textarea");
    let radiogrp = "";

    for (let i = 0; i < flist.length; i++) {
        let obj = new bolc__Object(document.getElementById(flist[i].id));
        if (!bol_CheckObjectVisibility(obj._obj)) continue; // Feld nicht sichtbar
        if (!obj.required) continue; // Eingabe nicht notwendig
		if (obj.type == "button") continue; // Button nicht pruefen

        // Sonderbehandlung Radio-Gruppen
		if (obj.type == "radio") { if (obj.name != radiogrp) radiogrp = obj.name;} else radiogrp = "";

        switch (obj.type) {
            case "radio":
				if (this.getField(radiogrp).value == "") {
                    // nur der 1. radio Eintrag zur Fehlerliste
                    if (bolSettings._fdsError.filter(({name}) => name == obj.name).length <= 0) bolSettings._fdsError.push({name: obj.name, title: obj.label});
					obj._obj.parentNode.style.color = bolSettings._colorErrorBg;

				} else {
                    obj._obj.parentNode.style.color = "inherit";
				}
				break;
            case "checkbox":
                if (!obj._obj.checked) {
                    bolSettings._fdsError.push({name: obj.id, title: obj.label})
                    obj._obj.parentNode.style.color = bolSettings._colorErrorBg;
                } else {
                    obj._obj.parentNode.style.color = "inherit";
                }
                break;
            case "text":
            case "textarea":
            case "password":
            case "file":
                if (obj.isEmpty) {
                    bolSettings._fdsError.push({name: obj.id, title: obj.label});
                    InputError(obj._obj, bolSettings.GetMsgString("error_text"), 0 ,0);
                } else {
                    clearInputError(obj._obj);
                }
                break;
            case "listbox":
            case "select":
            case "select-one":
            case "select_multiple":
                if (obj.isEmpty) {
                    bolSettings._fdsError.push({name: obj.id, title: obj.label});
                    InputError(obj._obj, bolSettings.GetMsgString("error_select"), 0 ,0);
                } else {
                    clearInputError(obj._obj);
                }
                break;
            default:
        }
    }
    if (bolSettings._fdsError.length > 0) {
        pe = document.getElementById(bolSettings._fdsError[0].name);
        if (pe == undefined) pe = document.getElementsByName(bolSettings._fdsError[0].name)[0];
        bolDialog.ShowError();
        if (bolSettings._modeError != 3) {
            // window.location = window.location + "#" + pe.id;
            pe.focus();
        }
        // window.scrollTo(0,0);
        return false;
    } else return true;
}

/*----- date & time ------------------------------------------------------------------------------*/
function bol_CalcDate(SourceDate, YearsToChange, MonthsToChange, DaysToChange, FirstDay) {
    let oDate, d, m, y, d2c, m2c, y2c;
    if (SourceDate == undefined) return "";
    if (typeof SourceDate == "object") {
        oDate = SourceDate;
    } else {
        oDate = new DataClassDate();
        if (oDate.Scan(SourceDate, "%Y2, %M2, %D2") != true) return "";
        oDate = new Date(oDate.Format("%Y2, %M2, %D2"));
    }
    y = oDate.getFullYear();
    m = oDate.getMonth() + 1;
    d = oDate.getDate();
    if (DaysToChange == undefined) d2c = 0; else {d2c = DaysToChange}
    if (MonthsToChange == undefined) m2c = 0; else {m2c = MonthsToChange}
    if (YearsToChange == undefined) y2c = 0; else {y2c = YearsToChange}
    d = d + d2c;
    m = m + m2c - 1;
    y = y + y2c;
    if (FirstDay) d = 1;
    return new Date(y, m, d);
}
function bolGetTimeStamp() {
    let s = "";
    let d = new Date();
    s = "" + d.getFullYear();
    if (d.getMonth() < 10) s = s + "0" + (d.getMonth() +1); else s = s + (d.getMonth() +1);
    if (d.getDate() < 10) s = s + "0" + d.getDate(); else s = s + d.getDate();
    if (d.getHours() < 10) s = s + "0" + d.getHours(); else s = s + d.getHours();
    if (d.getMinutes() < 10) s = s + "0" + d.getMinutes(); else s = s + d.getMinutes();
    if (d.getSeconds() < 10) s = s + "0" + d.getSeconds(); else s = s + d.getSeconds();
    return s;
}
function bolGetTimeStampISO8601() {
    let s = "";
    let d = new Date();
    s = "" + d.getFullYear();
    if (d.getMonth() < 10) s = s + "-0" + (d.getMonth() +1); else s = s + "-" + (d.getMonth() + 1);
    if (d.getDate() < 10) s = s + "-0" + d.getDate(); else s = s + "-" + d.getDate();
    if (d.getHours() < 10) s = s + "T0" + d.getHours(); else s = s + "T" + d.getHours();
    if (d.getMinutes() < 10) s = s + ":0" + d.getMinutes(); else s = s + ":" + d.getMinutes();
    if (d.getSeconds() < 10) s = s + ":0" + d.getSeconds(); else s = s + ":" + d.getSeconds();
    s = s + "." + d.getMilliseconds();
    return s;
}
function bolGetDateD(objD) {
    let s = "", d;
    if (objD == undefined) d = new Date(); else d = objD;
    if (d.getDate() < 10) s = "0" + d.getDate() + "."; else s = d.getDate() + ".";
    if (d.getMonth() < 10) s = s + "0" + (d.getMonth() +1) + "."; else s = s + (d.getMonth() +1) + ".";
    s = s + d.getFullYear();
    return s;
}
function bolGetDateDT(objD) {
    let s = "", d;
    if (objD == undefined) d = new Date(); else d = objD;
    if (d.getDate() < 10) s = "0" + d.getDate() + "."; else s = d.getDate() + ".";
    if (d.getMonth() < 10) s = s + "0" + (d.getMonth() +1) + "."; else s = s + (d.getMonth() +1) + ".";
    s = s + d.getFullYear() + " ";
    if (d.getHours() < 10) s = s + "0" + d.getHours() + ":"; else s = s + d.getHours() + ":";
    if (d.getMinutes() < 10) s = s + "0" + d.getMinutes() + ":"; else s = s + d.getMinutes() + ":";
    if (d.getSeconds() < 10) s = s + "0" + d.getSeconds(); else s = s + d.getSeconds();
    return s;
}
function bol_DateString(SourceDate, FormatType) {
	const wd = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let d;
    if (SourceDate == undefined) d = new Date();
    else d = bol_CalcDate(SourceDate, 0, 0, 0);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	switch (FormatType) {
		case "de-ts": // Timestamp deutsch, Datum und Uhrzeit mit Sekunden
			if (d.getHours() < 10) h = "0" + d.getHours(); else {h = "" + d.getHours()}
			if (d.getMinutes() < 10) m = "0" + d.getMinutes(); else {m = "" + d.getMinutes()}
			if (d.getSeconds() < 10) s = "0" + d.getSeconds(); else {s = "" + d.getSeconds()}
			return ('0' + d.getDate()).slice(-2) + "." + ('0' + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear() + " " + h + ":" + m + ":" + s;
		case "de-wahlfux": // Datum deutsch, lang, Wochentag und 10 Stellen mit Punkttrenner
			return "" + wd[d.getDay()] + ", der "+ ('0' + d.getDate()).slice(-2) + "." + ('0' + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
		case "de-6":  // Datum deutsch, kurz, 6 Stellen ohne Trenner
			return ('0' + d.getDate()).slice(-2) + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + (d.getFullYear())).slice(-2);
		case "de-8": // Datum deutsch, kurz, 8 Stellen mit Punkttrenner
			return ('0' + d.getDate()).slice(-2) + "." + ('0' + (d.getMonth() + 1)).slice(-2) + "." + ('0' + (d.getFullYear())).slice(-2);
		case "de-10t": // alternativer Timestamp
			if (d.getHours() < 10) h = "0" + d.getHours(); else {h = "" + d.getHours()}
			if (d.getMinutes() < 10) m = "0" + d.getMinutes(); else {m = "" + d.getMinutes()}
			return ('0' + d.getDate()).slice(-2) + "." + ('0' + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear() + " " + h + ":" + m;
		case "de-10": //Datum deutsch, 10 Stellen mit Punkttrenner
        default:
            return ('0' + d.getDate()).slice(-2) + "." + ('0' + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
    }
}
function bolDateOlder(fname, Years) {
    return (new bolc__Object(document.getElementById(fname)).CheckOlder(Years));
}
function bolDateYounger(fname, Years) {
    return (new bolc__Object(document.getElementById(fname)).CheckYounger(Years));
}
function bolDateIsLegalAge(fname) {
    return (new bolc__Object(document.getElementById(fname)).CheckLegalAge());
}
function bolDateIsBirthdate(fname) {
    return (new bolc__Object(document.getElementById(fname)).CheckDateBirth());
}
function bolFieldCalcFirstDayOfMonth(fname, YearsToChange, MonthsToChange, DaysToChange, FormatType) {
    let d = new bolc__Object(document.getElementById(fname));
    let dd = d.CalcDate(YearsToChange, MonthsToChange, DaysToChange, true);
	return bol_DateString(dd, FormatType);
}
function bolFieldCalcNewDate(fname, YearsToChange, MonthsToChange, DaysToChange, FormatType) {
    let d = new bolc__Object(document.getElementById(fname));
    let dd = d.CalcDate(YearsToChange, MonthsToChange, DaysToChange, false);
	return bol_DateString(dd, FormatType);
}
function bolCalcNewDate(SourceValue, YearsToChange, MonthsToChange, DaysToChange, FirstDay, FormatType) {
    let d = bol_CalcDate(SourceValue, YearsToChange, MonthsToChange, DaysToChange, FirstDay);
    return bol_DateString(d, FormatType);
}


/*----- Form -------------------------------------------------------------------------------------*/
function bol_InitForm(configJSON, bolBarStyle) {
    bolSettings = new bolc__Settings(configJSON);
    let pg = bolSettings.page;
    // let e = document.getElementById('akt_page_number');
    // if (e == undefined) e = document.getElementById('act_page_number');
    // if (e == undefined || e.value == "") pg = 1;
    // else pg = parseInt(e.value);
    // if (e != undefined) e.value = pg;

    bolForm = new bolc__Form;
    bolPage = new bolc__Page;
    bolDialog = new bolc__Dialog;
    bolSteps = new bolc__Steps;
    bolForm.StyleIt(bolBarStyle);
    bol_StylePages();
    bol_StyleFieldsets();
    bol_StyleFields();
    bolPage.goTo(pg);
}

/***************************************************************************************************
 * BLOCK 9
 * "one-liner", functions for public usage
***************************************************************************************************/
function bolDebugOn(newValue) {
	if (newValue == undefined) bolSettings._modeDebug = true; else bolSettings._modeDebug = newValue;
}
function bolDebug(anyStuff, msg) {
    if (bolSettings._modeDebug) console.log(msg);
	return anyStuff;
}
function bolNoPageCheck(newMode) {
	if (newMode == undefined || newMode == false) bolSettings.PageCheck = false; else bolSettings.PageCheck = true;
}
function bolSetErrorMode(mode) {
    if (mode == undefined) mode = 1;
    bolSettings._ModeError = mode;
}
function bolMessageBox(newTitle, newMessage) {
    bolDialog.Show(newTitle, newMessage);
}

/*----- Form -------------------------------------------------------------------------------------*/
// TODO: Method does not seem to be used anywhere
function bolFormInit(bolBarStyle) {
    bol_InitForm(bolBarStyle);
}
// TODO: This is where it starts
// Here pass in callbacks
function bolInitForm(bolBarStyle) {
    bol_InitForm(bolBarStyle);
}
function bolFormSave() {
    bolForm.SaveTemp();
}
function bolSaveTemp() {
    bolForm.SaveTemp();
}
function bolRestoreTemp() {
    bolForm.RestoreTemp();
}
function bolFormSend(button) {
    if (button != undefined) bolHide(button);
    bolForm.Send();
}
function bolSendForm(button) {
    bolFormSend(button);
}
function bolForm2PDF() {
    bolForm.PDFfilled();
}
function bolPrintForm() {
    bolForm.PDFfilled();
}

/*----- Page -------------------------------------------------------------------------------------*/
function bolPageSetActive() {
    bolPage.goTo(bolSettings.page);
}
function bolPageNext() {
    bolPage.Next();
}
function bolPagePrev() {
    bolPage.Prev();
}
function bolPageSummary(objName) {
    bolPage.Summary();
}
function bolPageSwitch(NewNo, ignorePageChecks) {
    bolPage.Switch(NewNo, ignorePageChecks);
}
function bolIsObjectPage(oname) {
    if (bolPage.active == (new bolc__Object(oname)).pageNo) return true; else return false;
}
function bolPageActivate(pageNo) {
    if (pageNo < 1 || pageNo > bolPage.max) return;
    bolSettings._usablePages[pageNo - 1] = true;
    try {bolSteps.buttonShow(pageNo)} catch(err) {}
}
function bolPageDeactivate(pageNo, clearPage) {
    if (pageNo < 1 || pageNo > bolPage.max) return;
    bolSettings._usablePages[pageNo - 1] = false;
    try {bolSteps.buttonHide(pageNo)} catch(err) {}
    if (clearPage) bolClear("page" + pageNo);
}

/*----- objects ----------------------------------------------------------------------------------*/
function bolCheck(objId) {
    return bol_BlockCheck(objId);
}
function bolShow(objId) {
    (new bolc__Object(document.getElementById(objId))).visible = true;
}
function bolHide(objId) {
    (new bolc__Object(document.getElementById(objId))).visible = false;
}
function bolClear(objId) {
    (new bolc__Object(document.getElementById(objId))).Clear();
}
function bolHideClear(oname1, oname2, val2Show) {
    if (oname2 == undefined) {
        bolHide(oname1);
        bolClear(oname1);
        return;
    }
    let e = document.getElementById(oname1);
    if (e == undefined) {
        e = getField(oname1);
        if (e == undefined) return;
    } else {
        if ((e.tagName.toLowerCase() == "div" || e.tagName.toLowerCase() == "fieldset") && oname2 == undefined) {
            bolHide(oname1);
            bolClear(oname1);
            return;
        }
    }
    if (e.type == "checkbox") {
        if (e.checked) {
            if (val2Show == undefined) bolShow(oname2); else {bolHide(oname2); bolClear(oname2)}
        } else {
            if (val2Show == undefined) {bolHide(oname2); bolClear(oname2)} else bolShow(oname2);
        }
    }
    else {
        if (val2Show == undefined) return;
        if (e.value.toLowerCase() == val2Show.toLowerCase()) bolShow(oname2); else {bolHide(oname2); bolClear(oname2)}
    }
}
function bolDisplayObject(ename, newMode) {
    (new bolc__Object(document.getElementById(ename))).visible = newMode;
}
function bolBlockFieldsClear(BlockID) {
    (new bolc__Object(document.getElementById(BlockID))).Clear();
}

/*----- step buttons/progress --------------------------------------------------------------------*/
function bolCreateStepButtons(Pages, InfoText) {
    for (let i = 0; i < bolSteps.Buttons.length; i++) bolSteps.buttonHide(bolSteps.Buttons[i].page);
    for (let i = 0; i < Pages.length; i++) {
        let b = bolSteps.Buttons.filter(({page}) => page == Pages[i]);
        if (b != undefined) bolSteps.buttonShow(Pages[i]);
    }
    if (InfoText == undefined) bolSteps.infoText = ""; else bolSteps.infoText = InfoText;
}
function bolUpdateStepButtonMsg(InfoText) {
    bolSteps.infoText = InfoText;
}

/*----- URL stuff -----------------------------------------------------------------------------*/
function bolURLParameter(para) {
    let val = "", s;
    let paraString = location.href.split("?")[1];
    if (paraString == undefined) return "";
    let paraList = paraString.split("&");
    if (paraList == undefined || paraList.length == 0) return "";
    if (para != undefined && para != "") {
        for (let i = 0; i < paraList.length; i++) {
            s = paraList[i].toLowerCase();
            if (s.indexOf(para.toLowerCase()) >= 0) {
                val = paraList[i].split("=")[1];
                return val;
            }
        }
    }
    return "";
}


/*----- fieldset functions --------------------------------------------------------------------*/
function bolFieldsetSetLegend(oname, newText) {
    let e = new bolc__Fieldset(oname);
    e.title = newText;
}
function SetText2Label(labelId, newText) {
    let e = document.getElementById(labelId);
    if (e == undefined) return;
    if (newText == undefined || newText == "") e.style.display = 'none';
    else {
        let s = bolDialog.Project_String(newText);
        if (s == undefined || s == "") s = newText;
        e.innerHTML = s;
        e.style.display = '';
    }
}

/*----- hidden fields in form --------------------------------------------------------------------*/
function bol_HiddenFieldCreate(fname, fvalue) {
    let r = document.getElementById("bolHiddenFields");
    if (r == undefined) {
        let elist = document.getElementsByName("bolForm");
        if (elist == undefined || elist.length == 0) elist = document.getElementsByName("WaimeaForm");
        if (elist == undefined || elist.length == 0) return bolDebug(false, "(bol_CreateHiddenField) keine gueltige <form> gefunden!");
        let newElement = document.createElement("div");
        newElement.id = "bolHiddenFields";
        newElement.style.display = "none";
        elist[0].appendChild(newElement);
        r = document.getElementById("bolHiddenFields");
    }
    if (r == undefined) return false;
    let e = document.getElementById(fname);
    if (e == undefined) {
        e = document.createElement("input");
        e.id = fname;
        e.name = fname;
        // e.type = "text";
        e.type = "hidden";
        e.class = "form-control";
        e.setAttribute("value", fvalue);
        r.appendChild(e);
    } else {
        e.value = fvalue;
    }
    return true;
}
function bol_HiddenFieldRemove(fname) {
    let r = document.getElementById("bolHiddenFields");
    if (r == undefined) {
        let elist = document.getElementsByName("bolForm");
        if (elist == undefined || elist.length == 0) elist = document.getElementsByName("WaimeaForm");
        if (elist == undefined || elist.length == 0) return bolDebug(false, "(bol_CreateHiddenField) keine gueltige <form> gefunden!");
        let newElement = document.createElement("div");
        newElement.id = "bolHiddenFields";
        newElement.style.display = "none";
        elist[0].appendChild(newElement);
        r = document.getElementById("bolHiddenFields");
    }
    if (r == undefined) return false;
    let e = document.getElementById(fname);
    if (e == undefined) return false;
    for (let i = 0; i < r.childNodes.length; i++) {
        if (r.childNodes[i].id == fname) {
            r.removeChild(r.childNodes[i]);
            break;
        }
    }
    return true;
}




/*----- ServiceKonto functions --------------------------------------------------------------------*/
function bolBSKInit() {
    bolBSK = new bolc__BSK();
}
function bolBSKRun(URLpart) {
    bolBSK.Run(URLpart);
}

/********************* Buergerservice Konto ************************/
class bolc__BSK {
    authenticated;
    localStoreHeader;
	constructor(newMode, URLpart) {
        let e = document.getElementById("Form.FormGenerate#1.FormType#1");
        this.localStoreHeader = "bolSK_" + e.value + ".";
        if (localStorage.getItem(this.localStoreHeader + '_FormFieldList') != undefined) {
            this.authenticated = true;
            this.MapValues();
        } else this.authenticated = false;
        if (this.authenticated) this.LocalStoreInit();
	}
    RunSK_KAAW() {
        //console.log(this.getField( "NetFillerConfiguration" ).value)
        var url = this.getField( "Form.FormPublish#2.NetFillerURL#7" ).value;
        var findform = this.getField( "Form.FormPublish#2.FindformURL#6" ).value;
        findform = encodeURIComponent(findform);
        url = url + "/NetFiller?_ID_=" + this.getField("NetFillerConfiguration").value + "&sendRedirect=true&htmlValue=" + findform;
        LocalStoreSave();
        window.open(url,"_self");
    }
    Run(ServiceURL) {
        if (location.href.indexOf("file://") >= 0) {
            this.LocalStoreSave();
            window.location.reload();
        } else {
            if (ServiceURL == undefined) return;
            let url = getField("Form.FormPublish#2.NetFillerURL#7").value;
            let findform = getField("Form.FormPublish#2.FindformURL#6").value;
            findform = encodeURIComponent(findform);
            url = url + ServiceURL + findform;
            if (url !="") {
                this.LocalStoreSave();
                window.open(url,"_self");
            }
        }
    }
    LocalStoreInit() {
        // gibt es bereits gespeicherte Daten?
        let fieldlist = localStorage.getItem(this.localStoreHeader + '_FormFieldList');
        // nein, dann verlassen
        if (fieldlist == undefined) return;
        if (fieldlist.length == 0) return;
        // es gibt gespeicherte Daten, dann lade diese
        this.LocalStoreLoad();
        // lösche den lokalen Zwischenspeicher
        this.LocalStoreReset();
    }
    // Speichern aller Feldinhalte im localStorage
    LocalStoreSave() {
        let field, fieldlist = [];
        // Schleife durch alle Felder
        for (let i = 0; i < numFields; i++) {
            // ermittle den Feldnamen
            field = getField(getNthFieldName(i));
            // es werden nur befüllte und sichtbare Felder gespeichert
            if (field.value == undefined || field.value == "" || field.type == "button" || field.type == "submit") continue;
            if (field.name == "") continue;
            if (field.type == "text" || field.type == "textarea") field.value = field.value.trim();
            if (field.value != "") {
                // OK, dann Wert speichern
                localStorage.setItem(this.localStoreHeader + field.name, field.value);
                // Feldliste ergänzen
                fieldlist.push(field.name);
            }
        }
        localStorage.setItem(this.localStoreHeader + "_active_page", bolPage.active);
        fieldlist.push("active_page");
        // Feldliste speichern
        localStorage.setItem(this.localStoreHeader + '_FormFieldList', fieldlist);
    }
    // lädt die Werte vom lokalen Zwischenspeicher
    LocalStoreLoad() {
        let field;
        // Lade die Liste der Feldnamen
        let fieldlist = localStorage.getItem(this.localStoreHeader + '_FormFieldList').split(",");
        if (fieldlist == undefined) return;
        let pg = localStorage.getItem(this.localStoreHeader + '_active_page');
        if (pg == undefined) pg = 1;
        bolPage.Switch(parseInt(pg));
        for (let i = 0; i < fieldlist.length; i++) {
            field = getField(fieldlist[i]);
            // Werte wieder in das Feld speichern
            if (field != undefined) field.value = localStorage.getItem(this.localStoreHeader + fieldlist[i]);
        }
        let fds = bol__SKFieldMapping;
        if (fds == undefined) return;
        if (location.href.indexOf("file://") >= 0) {
            for (let i = 0; i < fds.length; i++) {
                if (fds[i].fdTec) continue;
                if (fds[i].fdForm == undefined) continue;
                if (fds[i].fdForm == "") continue;
                let e = document.getElementById(fds[i].fdSK);
                if (e == undefined) continue;
                switch (fds[i].fdSK) {
                    case "Nachname":
                        e.value = "Mustermann-SK"; break;
                    case "Vorname":
                        e.value = "Max-SK"; break;
                    case "Telefonnummer":
                        e.value = "01-234567"; break;
                    case "AdressePLZ":
                        e.value = "12345"; break;
                    case "AdresseOrt":
                        e.value = "Musterdorf"; break;
                    case "AdresseStrasseHnr":
                        e.value = "Musterweg 21"; break;
                    case "Geburtsdatum":
                        e.value = "01.01.2001"; break;
                    default:
                        e.value = "V " + i;
                }
            }
        }
        this.MapValues();
    }
    // löscht alle lokal zwischengespeicherten Daten
    LocalStoreReset() {
        let fieldlist = localStorage.getItem(this.localStoreHeader + '_FormFieldList').split(",");
        if (fieldlist == undefined) return;
        for (let i = 0; i < fieldlist.length; i++) {
            localStorage.removeItem(this.localStoreHeader + fieldlist[i]);
        }
        localStorage.removeItem(this.localStoreHeader + '_active_page');
        localStorage.removeItem(this.localStoreHeader + '_FormFieldList');
    }
    MapValues() {
        function SplitStreet(fBoth, fStreet, fNo) {
            let sh = getField(fBoth.trim());
            let s = getField(fStreet.trim());
            let h = getField(fNo.trim());
            if (sh == undefined) return;
            if (s == undefined) return;
            if (h == undefined) return;
            let str ="";
            let hn = "";
            let a = sh.value.split(" "); // Array leerzeichengetrennt
            for (let i = a.length - 1; i>0; i--) {
            if (Number(a[i]) > 0) {
                str = a[0];
                for (var j =1; j < i; j++) str = str + " " + a[j];
                s.value = str;
                for (var j = i; j<a.length-1;j++) hn = hn + a[j] + " ";
                hn = hn + a[a.length-1];
                h.value = hn;
                i = 0;
                }
            }
            getField(fStreet).value = str;
            getField(fNo).value = hn;
        }

        let fds = bol__SKFieldMapping;
        if (fds == undefined) return;
        for (let i = 0; i < fds.length; i++) {
            if (fds[i].fdTec) continue;
            if (fds[i].fdForm == undefined || fds[i].fdForm == "") continue;
            // if (fds[i].fdForm == "") continue;
            let e = document.getElementById(fds[i].fdSK);
            if (e == undefined) continue;
            let f = document.getElementById(fds[i].fdForm);
            if (f == undefined) continue;
            if (fds[i].splitInto != undefined) {
                SplitStreet(fds[i].fdSK, fds[i].splitInto.split(",")[0], fds[i].splitInto.split(",")[1]);
            }
            getField(fds[i].fdForm).value = e.value;
            if (e.value != "") getField(fds[i].fdForm).readonly = fds[i].disabled;
        }
        let msgf = "bol.textSK_LoggedIn";
        let e = document.getElementById(msgf);
        if (e == undefined) {
            msgf = "BSK_textLoggedIn";
            e = document.getElementById(msgf);
        }
        if (e != undefined) getField(msgf).value = "mittels Servicekonto authentifiziert";
    }
}
