/***************************************************************************************
 * BImSch helper functions
 * @version     1.1, 2023-05
 * @author		bol, werther
***************************************************************************************/


function setSaveData(newValue) {
    if (newValue != undefined) {
        if (newValue) getField("fgMetaData.saveData").value = "1"; else getField("fgMetaData.saveData").value = "0";
    } else if (getField("Formular.Datenspeicherung").checked) getField("fgMetaData.saveData").value = '1'; else getField("fgMetaData.saveData").value = '0';
    if (getField("fgMetaData.saveData").value == '1') {getField("Formular.Datenspeicherung").checked = true; bolShow("btnSave")}
    else {getField("Formular.Datenspeicherung").checked = false; bolHide("btnSave")}
}


function SaveFormLocal() {
    bolSaveTemp();
}
function SaveFormPortal() {
    SendForm(2);
}

function SendForm(submissionType) {
    // update the hidden fields for account;
    getField("fgMetaData.contactLastName").value = getField("account.lastName").value;
    getField("fgMetaData.contactFirstName").value = getField("account.firstName").value;
    getField("fgMetaData.contactPhone").value = getField("account.contactNr").value;
    getField("fgMetaData.contactEmail").value = getField("account.email").value;
    // update hidden fields for operator
    getField("fgMetaData.operatorId").value = getField("operator.id").value;
    getField("fgMetaData.operatorName").value = getField("operator.name").value;
    // remove the disabled attribute, because these fields will not transmitted
    document.getElementById("operator.address.federalState").removeAttribute("disabled");
    // update hidden fields for address, depends on each form
    {try {UpdateHiddenFormFields()} catch(err) {}}
    // set timestamp for OSCI
    getField("fgMetaData.timeStamp").value = bolGetTimeStampISO8601();
    if (BImSch_FormMode == "portalNew" || BImSch_FormMode == "portalOpen") {
        if (submissionType == 2) {
            getField("fgMetaData.submissionType").value = "2"; // intermediate submission
            // change the inbox string to marker for submission via portal
            getField("Form.FormProcess#3.FormatString#8").value = "IP: " + _sInbox;
        } else {
            getField("fgMetaData.submissionType").value = "1"; // final submission
            // change the inbox string to marker for submission via portal
            getField("Form.FormProcess#3.FormatString#8").value = _sInbox;
        }
    } else if (BImSch_FormMode == "findform" || BImSch_FormMode == "localSaved") {
        getField("fgMetaData.submissionType").value = "3"; // final submission and no save to portal
        // change the inbox string to marker for submission via findform/local save
        getField("Form.FormProcess#3.FormatString#8").value = "FF: " + _sInbox;
    } else return;

    bolDialog.ShowInfo("Datenübertragung", "Die Daten des Formulars werden übertragen!");
    bolSendForm("btnSend");
}


/***************************************************************************************
 * @name		mapField
 * @summary		checks content and existence of form fields and maps their values
 * @param		{string}	sourceValue	    name/id or value of the source field
 * @param       {string}    destinationFieldName name or id of the destination field
 * @param       {boolean}   destinationFieldReadonly    sets the readonly flag of an element (true locks the field)
 * @returns		nothing
***************************************************************************************/
function mapField(sourceValue, destinationFieldName, destinationFieldReadonly) {
    let f;
    {try {f = getField(destinationFieldName)} catch(err) {}}
    if (f == undefined) return;
    if (sourceValue == undefined) sourceValue = "";
    getField(destinationFieldName).value = sourceValue;
    if (destinationFieldReadonly) getField(destinationFieldName).readonly = true; else getField(destinationFieldName).readonly = false;
}



/**** Mapping *************************************************************************************** */
function mapTecFields() {
    // create and set the link for data privacy proclamation
    SetText2Label("bol.txtDSGVOlink", '<a href="' + getField("fgMetaData.urlPortal").value + 'de/datenschutz" target="_blank" rel="noreferrer,nofollow">Details zum Datenschutz</a>')

    // Update current date in field and label
    getField("Formular.Datum").value = bolGetDateD();
    SetText2Label("bol.txtFormDate", getField("Formular.Datum").value);
    // read the value for the LEIKA nr and display
    SetText2Label("bol.txtLEIKANr", "LEIKA: " + getField("fgMetaData.leikaNr").value);
    SetText2Label("bol.txtFormVersion", _FormVersion);

    if (getField("fgMetaData.saveData").value == '1') setSaveData(true); else setSaveData(false);
}
function MapAccount() {
    function SetELSTERtest(mode) {
        if (mode) {
            getField("fgMetaData.elsterTest").value = "true";
            getField("fgMetaData.elsterTestMsg").value = "Achtung! Login mit ELSTER Testzertifikat!";
            document.getElementById("bol.txtELSTER_Test").innerText = getField("fgMetaData.elsterTestMsg").value;
        } else {
            getField("fgMetaData.elsterTest").value = "false";
            getField("fgMetaData.elsterTestMsg").value = "";
            document.getElementById("bol.txtELSTER_Test").innerText = "";
        }
    }
    let md, s, s2, lockMode;
    if (BImSch_FormMode == "portalOpen" || BImSch_FormMode == "portalNew") {
        if (md_FormData == undefined || md_FormData.length == 0) return;
        md = md_FormData;
        lockMode = true;
    } else {
        lockMode = true;
        md = md_FormData;
    }
    {try {s = md.account.id} catch(err) {}} mapField(s, "account.id", lockMode);
    {try {s = md.account.title} catch(err) {}} mapField(s, "account.title", lockMode);
    {try {s = md.account.firstName} catch(err) {}} mapField(s, "account.firstName", lockMode);
    {try {s = md.account.lastName} catch(err) {}} mapField(s, "account.lastName", lockMode);
    {try {s = md.account.funktion} catch(err) {}} mapField(s, "account.funktion", lockMode);
    {try {s = md.account.contactNr} catch(err) {}} mapField(s, "account.contactNr", lockMode);
    {try {s = md.account.email} catch(err) {}} mapField(s, "account.email", lockMode);
    {try {s = md.account.elsterTest} catch(err) {}}
    if (s == undefined || s == false) SetELSTERtest(false); else SetELSTERtest(true);

    {try {s = md.formId} catch(err) {}}
    if (s != undefined) {
        {try {s2 = md.processId} catch(err) {}}
        if (s2 != undefined) SetText2Label("bol.txtInternalNr", s + " / " + s2);
        else SetText2Label("bol.txtInternalNr", undefined);
    } else SetText2Label("bol.txtInternalNr", undefined);
}

function MapOperator() {
    let md, s, lockMode;
    if (BImSch_FormMode == "portalOpen") {
        {try {md = md_FormData.formContent} catch(err) {}}
        lockMode = true;
    } else if (BImSch_FormMode == "portalNew") {
        {try {md = md_FormData} catch(err) {}}
        lockMode = true;
    } else {
        lockMode = true;
        md = md_FormData;
    }
    if (md_FormData == undefined || md_FormData.length == 0) return;

    {try {s = md.operator.id} catch(err) {}} mapField(s, "operator.id", lockMode);
    {try {s = md.operator.name} catch(err) {}} mapField(s, "operator.name", lockMode);
    {try {s = md.operator.address.id} catch(err) {}} mapField(s, "operator.address.id", lockMode);
    {try {s = md.operator.address.street} catch(err) {}} mapField(s, "operator.address.street", lockMode);
    {try {s = md.operator.address.houseNr} catch(err) {}} mapField(s, "operator.address.houseNr", lockMode);
    {try {s = md.operator.address.zipCode} catch(err) {}} mapField(s, "operator.address.zipCode", lockMode);
    {try {s = md.operator.address.city} catch(err) {}} mapField(s, "operator.address.city", lockMode);
    {try {s = md.operator.address.federalState} catch(err) {}} mapField(s, "operator.address.federalState", lockMode);
    {try {s = md.operator.address.district} catch(err) {}} mapField(s, "operator.address.district", lockMode);
    {try {listGetShortText("operator.address.federalState")} catch(err) {}}
    // set the combobox of states to disabled
    document.getElementById("operator.address.federalState").setAttribute("disabled", "");
}








/***************************************************************************************
 * @name		listClearOptions
 * @summary		clears the options of a select or listbox element
 * @param		{object}	lb	    object of list element
 * @returns		nothing
***************************************************************************************/
function listClearOptions(lb) {
    lb.innerHTML = "";
    // add an empty option
    lb.options.add(listAddOption("", ""));
    // clear eforms value of the field
    getField(lb.id).value = "";
}
/***************************************************************************************
 * @name		listAddOption
 * @summary		adds a option of a select or listbox element
 * @param		{string}	code	the value of option
 * @param       {string}    text    the text value to display
 * @returns		{option}
***************************************************************************************/
function listAddOption(code, text) {
    let option = document.createElement("option");
    // if text is empty, use code for value and text
    if (text != undefined && text != "") option.text = text; else option.text = code;
    option.value = code;
    return option;
}
function listGetShortText(listname) {
    let lb = getField(listname);
    if (lb == undefined) return;
    let e = getField(listname + "_shortText");
    if (e == undefined) return;
    if (lb.value == "") e.value = "";
    else for (let i = 0; i < lb.options.length; i++) if (lb.options[i].value == lb.value) {e.value = lb.options[i].innerText; break}
}


/******************************************************************/
// interactive stuff


/***************************************************************************************
 * @name		loadList_FederalStates
 * @summary		fills a select or listbox element with names of federal states
 * @param		{string}	listname	name or id of the select element
 * @returns		nothing
***************************************************************************************/
async function loadList_FederalStates(listname) {
    // list already filled?
    if (md_FederalStates.length == 0) {
        // not filled, and if it's not running locally - fetch data from REST or use local object
        if (BImSch_FormMode != "local") await svcData_FederalStates();
        else _local_FederalStates();
    }
    if (md_FederalStates.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    listClearOptions(lb);
    for (let i = 0; i < md_FederalStates.length; i++) lb.options.add(listAddOption(md_FederalStates[i]["name"]));
}
function list_FederalStates_shortText(listname) {
    let lb = getField(listname);
    if (lb == undefined) return;
    let e = getField(listname + "_shortText");
    if (lb.value == "") e.value = "";
    else {
        for (let i = 0; i < lb.options.length; i++) if (lb.options[i].value == lb.value) {e.value = lb.options[i].innerText; break}
    }
}
/***************************************************************************************
 * @name		loadList_Authorities
 * @summary		fills a select or listbox element with names of authorities
 * @param		{string}	listname	name or id of the select element
 * @returns		nothing
***************************************************************************************/
async function loadList_Authorities(listname) {
    if (md_Authorities.length == 0) {
        if (BImSch_FormMode != "local") await svcData_Authorities();
        else _local_Authorities();
    }
    if (md_Authorities.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    listClearOptions(lb);
    for (let i = 0; i < md_Authorities.length; i++) lb.options.add(listAddOption(md_Authorities[i]["ident"], md_Authorities[i]["shortText"]));
}







async function loadList_CombustionPlantTypes(listname) {
    if (md_CombustionPlantTypes.length == 0) {
        if (BImSch_FormMode != "local") await svcData_CombustionPlantTypes();
        else _local_CombustionPlantTypes();
    }
    if (md_CombustionPlantTypes.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    listClearOptions(lb);
    for (let i = 0; i < md_CombustionPlantTypes.length; i++) lb.options.add(listAddOption(md_CombustionPlantTypes[i]["shortText"]));
}

/***************************************************************************************/
// manage contact Persons
/***************************************************************************************
 * @name		loadList_Persons
 * @summary		fills a select or listbox element with names of persons
 * @param		{string}	listname	name or id of the select element
 * @returns		nothing
***************************************************************************************/
async function loadList_Persons(listname) {
    // at the moment, contact persons are part of the main data of the form
    // if no data are loaded = exit
    if (md_FormData == undefined || md_FormData.length == 0) return;
    if (md_Persons.length == 0) md_Persons = md_FormData.contactPersons;
    if (md_Persons.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    for (let i = 0; i < md_Persons.length; i++) {
        lb.options.add(listAddOption(md_Persons[i]["id"], md_Persons[i]["firstName"] + " " + md_Persons[i]["lastName"]  + ", " + md_Persons[i]["funktion"]));
    }
}
/***************************************************************************************
 * @name		dlgPerson
 * @summary		creates a bootstrap dialog with a list of persons to select a new contact person
 * @param		{string}	fname	name or id of the source/destination field. fname is used for the button too
 * @returns		nothing
***************************************************************************************/
function dlgPerson(fname) {
    // get the element for dlgPerson
    let e = document.getElementById('dlgPerson');
    if (e == undefined) {
        // if not exists, create a new document element
        e = document.createElement("div");
        e.id = "dlgPerson";
        e.classList.add("modal");
        e.tabindex = -1;
        e.role = "dialog";
        e.setAttribute("aria-hidden", "true");
        document.body.children[0].appendChild(e);
    }
    // build the content of the dialog on-the-fly
    let s = "";
    s = s + '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">';
    s = s + '<div class="modal-content" style="background-color: rgb(240,240,240)">';
    s = s + '<div id="bolDialogHeader" class="modal-header bol-dialog-header"><h5 class="modal-title" id="bolDialogTitle"> Person ändern/auswählen</h5></div>';
    s = s + '<div class="modal-body" id="bolDialogMessage"><div class="row">';
    s = s + '<div class="col-12">';
    s = s + 'Wählen Sie aus der Liste der bekannten Ansprechpersonen aus (Vorname Nachname, Funktion):';
    s = s + '</div><div class="col-12" style="margin-top: 10px">';
    s = s + '<select class="listbox form-control" id="dlgListContact" title="Ansprechpersonen" size="10"></select>';
    s = s + '</div></div>';
    s = s + '<div class="modal-footer">';
    // for the footer buttons set the name of the destination field and button
    s = s + '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgPersonClose(`' + fname + '`);">übernehmen</button>';
    s = s + '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgPersonCancel(`' + fname + '`);">abbrechen</button>';
    s = s + '</div></div></div>';
    e.innerHTML = s;
    let dlg = new bootstrap.Modal(e);
    // fill the person list
    loadList_Persons("dlgListContact");
    dlg.show();
    document.getElementById("dlgListContact").focus();
}
/***************************************************************************************
 * @name		dlgPersonClose
 * @summary		maps the selected content after closing the dialog to the destination fields
 * @param		{string}	fname	name or id of the source/destination field.
 * @returns		nothing
***************************************************************************************/
function dlgPersonClose(fname) {
    let f = this.getField("dlgListContact");
    if (f.value == "" || fname == "") return;
    let o = md_Persons.filter(({id}) => id == parseInt(f.value));
    if (o == undefined) return;
    mapField(o[0].id, fname + ".id");
    mapField(o[0].firstName, fname + ".firstName");
    mapField(o[0].lastName, fname + ".lastName");
    mapField(o[0].funktion, fname + ".funktion");
    mapField(o[0].phone, fname + ".phone");
    mapField(o[0].email, fname + ".email");
    mapField(o[0].title, fname + ".title");
    // set button focus
    dlgPersonCancel(fname);
}
/***************************************************************************************
 * @name		dlgPersonCancel
 * @summary		set the focus to the calling button
 * @param		{string}	fname	name or id of the source/destination button.
 * @returns		nothing
***************************************************************************************/
function dlgPersonCancel(fname) {
    {try {document.getElementById("btn." + fname).focus()} catch(err) {}}
}


/***************************************************************************************/
// manage handling for NACE selection
/***************************************************************************************
 * @name		getListNACE
 * @summary		if the list is not filled, call the REST service or fill with local simulation data
 * @returns		amount of NACE code entries
***************************************************************************************/
async function getListNACE() {
    if (md_NACE.length == 0) {
        if (BImSch_FormMode != 0) await svcData_NACE();
        else _local_NACE();
    }
    return md_NACE.length;
}
/***************************************************************************************
 * @name		loadList_NACE
 * @summary		fills a listbox or select with NACE entries
 * @param		{string}	listname	name or id of the select/listbox element
 * @returns		nothing
***************************************************************************************/
function loadList_NACE(listname) {
    if (getListNACE() == 0) return; // list is empty
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    lb.innerHTML = "";
    for (let i = 0; i < md_NACE.length; i++) lb.options.add(listAddOption(md_NACE[i]["code"], md_NACE[i]["code"] + " - " + md_NACE[i]["shortText"]));
}
/***************************************************************************************
 * @name		lookupNACE
 * @summary		used in the form, when the user enters a nummer in fieldOfCode. looks for assigned NACE text and stores this in fieldOfText
 * @param		{string}	fieldOfCode	name or id of field where lookup the NACE code value
 * @param		{string}	fieldOfText	name or id of field where to store the NACE text
 * @returns		nothing
***************************************************************************************/
function lookupNACE(fieldOfCode, fieldOfText) {
    if (getListNACE() == 0) return;  // list is empty
    // value of source empty, clear destination
    if (getField(fieldOfCode).value == "") {getField(fieldOfText).value = ""; return}
    let o = md_NACE.filter(({code}) => code.indexOf(getField(fieldOfCode).value) >= 0);
    // nothing found, clear destination
    if (o == undefined || o.length == 0) getField(fieldOfText).value = "";
    // or set value
    else getField(fieldOfText).value = o[0].shortText;
}
/***************************************************************************************
 * @name		filterNACE
 * @summary		function used by dlgNACE to filter the content of the listbox
 *              looks for any part of the string
 * @param		{string}	listname	name or id of listbox
 * @param		{string}	filtername	name or id of field where the filter value is enterd
 * @returns		nothing
***************************************************************************************/
function filterNACE(listname, filtername) {
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    let fv = getField(filtername).value;
    if (fv == "") return;
    let o;
    o = md_NACE.filter(({shortText}) => shortText.toLowerCase().indexOf(fv.toLowerCase()) >= 0);
    if (o == undefined || o.length == 0) o = md_NACE.filter(({code}) => code.indexOf(fv) >= 0);
    // ok, som,ething found, clear the listbox and refill with entries matching the filter criteria
    lb.innerHTML = "";
    for (let i = 0; i < o.length; i++) lb.options.add(listAddOption(o[i]["code"], o[i]["code"] + " - " + o[i]["shortText"]));
}
/***************************************************************************************
 * @name		dlgNACE
 * @summary		creates a bootstrap dialog with a list of NACE codes to select a new code
 * @param		{string}	fname	name or id of the source/destination field. fname is used for the button too
 * @returns		nothing
***************************************************************************************/
function dlgNACE(fname) {
    // get the element for dlgNACE
    let e = document.getElementById('dlgNACE');
    if (e == undefined) {
        // if not exists, create a new document element
        e = document.createElement("div");
        e.id = "dlgNACE";
        e.classList.add("modal");
        e.tabindex = -1; // set as top most window
        e.role = "dialog";
        e.setAttribute("aria-hidden", "true");
        document.body.children[0].appendChild(e);
    }
    // build the content of the dialog on-the-fly
    let s = "";
    s = s + '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">';
    s = s + '<div class="modal-content" style="background-color: rgb(240,240,240)">';
    s = s + '<div id="bolDialogHeader" class="modal-header bol-dialog-header"><h5 class="modal-title" id="bolDialogTitle"> NACE-Code ändern/auswählen</h5></div>';
    s = s + '<div class="modal-body" id="bolDialogMessage"><div class="row">';
    s = s + '<div class="col-12">';
    s = s + '<label for="filter.NACE">filtern nach</label>';
    s = s + '<input id="filter.NACE" aria-describedby="filter.NACE-infield-error" class="form-control" type="text" name="filter.NACE" title="NACE filtern nach" onkeyup="filterNACE(`dlgListNACE`, `filter.NACE`);" value="" required=""><div class="infielderror" id="filter.NACE-infield-error"></div>';
    s = s + '</div><div class="col-12" style="margin-top: 10px">';
    s = s + '<select class="listbox form-control" id="dlgListNACE" title="NACE" size="10"></select>';
    s = s + '</div></div>';
    s = s + '<div class="modal-footer">';
    s = s + '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgNACEClose(`' + fname + '`);">übernehmen</button>';
    s = s + '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgNACECancel(`' + fname + '`);">abbrechen</button>';
    s = s + '</div></div></div>';
    e.innerHTML = s;
    let dlg = new bootstrap.Modal(e);
    // fill the listbox with NACE values
    loadList_NACE("dlgListNACE");
    dlg.show();
    // set the focus to filter input field
    document.getElementById("filter.NACE").focus();
}
/***************************************************************************************
 * @name		dlgNACEClose
 * @summary		maps the selected content after closing the dialog to the destination fields
 * @param		{string}	fname	name or id of the source/destination field.
 * @returns		nothing
***************************************************************************************/
function dlgNACEClose(fname) {
    let f = this.getField("dlgListNACE");
    if (f.value == "") return;
    let o = md_NACE.filter(({code}) => code == parseInt(f.value));
    if (o == undefined) return;
    this.getField(fname + ".code").value = o[0].code;
    this.getField(fname + ".shortText").value = o[0].shortText;
    dlgNACEcancel();
}
/***************************************************************************************
 * @name		dlgNACECancel
 * @summary		set the focus to the calling button
 * @param		{string}	fname	name or id of the source/destination button.
 * @returns		nothing
***************************************************************************************/
function dlgNACECancel() {
    {try {document.getElementById("btn." + fname).focus()} catch(err) {}}
}

/***************************************************************************************/
async function loadList_EmissionControlSystems(listname) {
    if (md_EmissionControlSystems.length == 0) {
        if (BImSch_FormMode != 0) await svcData_EmissionControlSystems();
        else _local_EmissionControlSystems();
    }
    if (md_EmissionControlSystems.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    listClearOptions(lb);
    for (let i = 0; i < md_EmissionControlSystems.length; i++) lb.options.add(listAddOption(md_EmissionControlSystems[i]["ident"], md_EmissionControlSystems[i]["shortText"]));
}
function dlgEmissionControlSystems() {
    let e = document.getElementById('dlgEmissionControlSystems');
    if (e == undefined) {
        e = document.createElement("div");
        e.id = "dlgEmissionControlSystems";
        e.classList.add("modal");
        e.tabindex = -1;
        e.role = "dialog";
        e.setAttribute("aria-hidden", "true");
        document.body.children[0].appendChild(e);
    }
    let s = '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">' +
    '  <div class="modal-content"><div id="bolDialogHeader" class="modal-header bol-dialog-header">' +
    '    <h5 class="modal-title" id="bolDialogTitle"> Abgasreinigungseinrichtung(en) auswählen</h5><button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" style="color: white;">x</button>' +
    '    </div><div class="modal-body" id="bolDialogMessage" style="margin: 5px;background-color: rgb(240, 240, 240);">' +
    '      <div class="row" style="margin: 5px;background-color: rgb(240, 240, 240);"><div class="col-12">' +
    '          Wählen Sie die Art der Abgasreinigungseinrichtung(en) aus *<br>' +
    '          <span  style="vertical-align: middle; font-size: 0.7em;">(Mehrfachauswahl möglich durch STRG+Klick bzw. STRG+Leertaste.) </span>' +
    '        <select class="listbox form-control" id="list.EmissionControlSystems" title="EmissionControlSystems" size="8" multiple="" onchange="MakeValues_EmissionControlSystems();"></select>' +
    '        <textarea rows="3" id="list_ArtAbgaseinrichtungCodes" style="display:none; background-color: rgb(240, 240, 240);" class="form-control" title="gewählte Abgaseinrichtung(en)" readonly="" required=""></textarea>' +
    '        <textarea rows="3" id="list_ArtAbgaseinrichtungNamen" style="display:none; background-color: rgb(240, 240, 240);" class="form-control" title="gewählte Abgaseinrichtung(en)" readonly="" required=""></textarea>' +
    '      </div></div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn cc-button " data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgEmissionControlSystemsClose();">übernehmen</button>'+
    '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="document.getElementById(`btnEmissionControl`).focus();">abbrechen</button></div></div></div>';
    e.innerHTML = s;
    let dlg = new bootstrap.Modal(e);
    loadList_EmissionControlSystems("list.EmissionControlSystems");
    if (dlg != undefined) dlg.show();
    document.getElementById("list.EmissionControlSystems").focus();
}
function MakeValues_EmissionControlSystems() {
    let lb = document.getElementById("list.EmissionControlSystems");
    let sc = "", sn = "";
    for (let i = 0; i < lb.options.length; i++) {
        let o = lb.options[i];
        if (o.value == "") continue;
        if (!o.selected) continue;
        if (sc == "") {sc = o.value;} else {sc = sc + ", " + o.value;}
        if (sn == "") {sn = o.innerText;} else {sn = sn + ", " + o.innerText;}
    }
    getField("list_ArtAbgaseinrichtungCodes").value = sc;
    getField("list_ArtAbgaseinrichtungNamen").value = sn;
}
function dlgEmissionControlSystemsClose() {
    getField("plant.emissionControlSystem.codes").value = document.getElementById("list_ArtAbgaseinrichtungCodes").value;
    getField("plant.emissionControlSystem.names").value = getField("list_ArtAbgaseinrichtungNamen").value;
    clearInputError(getField("plant.emissionControlSystem.names"));
    document.getElementById("btnEmissionControl").focus();
}

/***************************************************************************************/

