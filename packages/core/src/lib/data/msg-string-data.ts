import { MsgString } from "../model/msg-string.model"

/**
 * this function is used to return a list of standard strings for messages inside the library
 * @returns an array of standard strings for messages inside the library
 */
export function getDefaultMsgStrings(): MsgString[] {
    return [
        new MsgString("de", "error_browser_toold", "Ihr Browser ist leider nicht kompatibel.\n\nBitte verwenden Sie für dieses Formular moderne Browser, z.B.:\n* Chrome/Edge\n* Firefox ab Version 70\n* Safari\n\nDer Internet Explorer wird nicht mehr unterstützt!\n"),
        new MsgString("de", "error_missing_focus", "Kein passender Feldnamen für den Fokus auf Seite "),
        new MsgString("de", "error_text", "Dieses Feld muss einen Wert enthalten"),
        new MsgString("de", "error_select", "Wählen Sie einen Eintrag aus"),
        new MsgString("de", "txt_sidebar_questions", "Haben Sie Fragen?"),
        new MsgString("de", "txt_impress_link", "Impressum"),
        new MsgString("de", "txt_kontakt_link", "Kontakt"),
        new MsgString("de", "txt_dsgvo_link", "Datenschutz"),
        new MsgString("de", "btn_up_title", "nach oben"),
        new MsgString("de", "fieldset_btn_toggle", "Bereich ein-/ausklappen"),
        new MsgString("de", "fieldset_btn_erase", "Eingaben in diesem Bereich löschen/zurücksetzen"),
        new MsgString("de", "fieldset_btn_check", "Eingaben in diesem Bereich überprüfen"),
        new MsgString("de", "fieldset_btn_delete", "diesen Datenblock löschen"),
        new MsgString("de", "fieldset_btn_togglepart", "Bereich teilweise ein-/ausklappen"),
        new MsgString("de", "progress_title", "Fortschrittsanzeige"),
        new MsgString("de", "error_notadate", "Die Eingabe ist kein gültiges Datum!"),
        new MsgString("de", "error_birthdatefuture", "Ein Geburtsdatum kann nicht in der Zukunft liegen!"),
        new MsgString("de", "error_birthdatepast", "Das Geburtsdatum darf nicht vor dem 01.01.1900 liegen!"),
        new MsgString("de", "error_notlegalage", "Sie müssen zum Zeitpunkt der Antragstellung volljährig sein!"),
        new MsgString("de", "error_DlgHeadSingle", "Fehler: es ist 1 Fehler aufgetreten.%1%"),
        new MsgString("de", "error_DlgHead", "Fehler: es sind %1% Fehler aufgetreten.%2%"),
        new MsgString("de", "error_DlgTextTopSingle", "Bitte füllen Sie folgendes Feld aus:"),
        new MsgString("de", "error_DlgTextTop", "Bitte füllen Sie folgende Felder aus:"),
        new MsgString("de", "error_DlgTextPageTop", "Fehler beim Seitenwechsel"),
        new MsgString("de", "error_DlgTextPageText", "Auf den nachfolgenden Seiten wurden nicht alle Pflichtfelder durch Sie ausgefüllt. Ein Sprung über mehrere Seiten ist somit aktuell nicht möglich. Bitte gehen Sie schrittweise im Ausfüllprozess vor."),
        new MsgString("de", "error_FileTitle", "Hochladen einer Datei"),
        new MsgString("de", "error_FileTypeSingle", "Die gewählte Datei ist kein erlaubtes Dateiformat. Es ist nur der Dateityp '%1%' zulässig."),
        new MsgString("de", "error_FileTypes", "Die gewählte Datei ist kein erlaubtes Dateiformat. Zulässige Dateitypen sind '%1%'."),
        new MsgString("de", "error_FileSize", "Die Datei ist größer als die zulässigen %1% MByte."),
        new MsgString("de", "tip_fd_required", "(Pflichtfeld)"),
        new MsgString("de", "tip_fd_radiorequired", "(Pflichtfeld-Auswahl)"),
        new MsgString("de", "tip_fd_info", "Symbol anklicken für mehr Info"),
        new MsgString("de", "tip_fd_infotitle", "Information zum Datenfeld"),
        new MsgString("en", "key", "value")
    ];
}