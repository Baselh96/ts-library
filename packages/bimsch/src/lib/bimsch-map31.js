function setupForm() {
    let url = '<a href="' + getField("fgMetaData.urlPortal").value + 'de/datenschutz" target="_blank" rel="noreferrer,nofollow">Details zum Datenschutz</a>';
    {try {document.getElementById("bol.txtDSGVOlink").innerHTML = url} catch(err) {}}
}

function SendForm31(mode) {
    let s1, s2, s3;
    if (mode == 1) {
        getField("fgMetaData.submissionType").value = "1";
        getField("BImSch_SubmissionType").value = "1";
        s1 = ""; 
    } else if (mode == 2) {
        getField("fgMetaData.submissionType").value = "2";
        getField("BImSch_SubmissionType").value = "2";
        s1 = "I: "; 
    } else return;
    s2 = " von <operator/name>";
    getField("fgMetaData.timeStamp").value = bolGetTimeStampISO8601();
    if (getField("fgMetaData.processNr").value != "") {
        s3 = s1 + getField("fgMetaData.processNr").value + s2;
        getField("fgMetaData.fileName").value = getField("fgMetaData.processNr").value + "_" + bolGetTimeStamp();
    } else {
        s3 = s1 + "Bericht" + s2;
        getField("fgMetaData.fileName").value = "Form_" + getField("fgMetaData.formName").value + "_" + bolGetTimeStamp(); 
    }
    getField("Form.FormProcess#3.FormatString#8").value = s3;
    bolDialog.ShowInfo("Datenübertragung", "Die Daten des Formulars werden übertragen!");
    if (mode == 1) bolSendForm("btnSend"); else bolSendForm("btnSave");    
}

// Loads Data for Form 
async function LoadDataForm31(mode) {
    setupForm();
    // get data object for this form
    await GetFormData(bolFormShortname);
    // fill catalogs
    await LoadList_FederalStates("operator.address.federalState");
    await LoadList_FederalStates("operatingSite.address.federalState");
    await LoadList_Authorities("operatingSite.competentAuthority");

    MapAccount31();
    MapOperator31();
    MapOperatingSite31();
    MapPlant31();

    if (BImSch_FormMode == 2) MapData31();

    UpdateHiddenAccount();
    UpdateHiddenOperator();
    UpdateHiddenAuthority();
    UpdateHiddenAddress();
    UpdateHiddenPlant();

    if (getField("report.date").value == "") getField("report.date").value = bolGetDateD();

    // UpdateFormFields31();
}

function map(source, fname, ro) {
    let s, f;
    {try {s = source} catch(err) {}}
    {try {f = getField(fname)} catch(err) {}}
    if (f == undefined) return;
    if (s != undefined) getField(fname).value = s; else getField(fname).value = "";
    if (ro) getField(fname).readonly = true; else getField(fname).readonly = false;
}

function MapAccount31() {
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

    if (BImSch_FormMode == 2 || BImSch_FormMode == 1) {
        if (md_FormData == undefined || md_FormData.length == 0) return;   
        let md = md_FormData, s;
        map(md.account.id, "account.id", true);
        map(md.account.firstName, "account.firstName", true);
        map(md.account.lastName, "account.lastName", true);
        map(md.account.contactNr, "account.contactNr", true);
        map(md.account.email, "account.email", true);
        SetELSTERtest(md.account.elsterTest) 
    } else {
        getField("account.id").value = "";
        getField("account.firstName").value = ""; getField("account.firstName").readonly = false;
        getField("account.lastName").value = ""; getField("account.lastName").readonly = false;
        getField("account.contactNr").value = ""; getField("account.contactNr").readonly = false;
        getField("account.email").value = ""; getField("account.email").readonly = false;
        SetELSTERtest(false);
    }

    getField("Formular.Datum").value = bolGetDateD();
    document.getElementById("bol.txtFormDate").innerText = "Datum: " + getField("Formular.Datum").value;
    switch (BImSch_FormMode) {
        case 2:
            {try {document.getElementById("bol.txtInternalNr").innerText = "intern: " + md_FormData.formId + " / " + md_FormData.processId} catch(err) {}}
            map(md_FormData.processId, "fgMetaData.processId");
        case 1:
            document.getElementById("bol.txtProcessNr").innerText = "ProcessNr.: " + getField("fgMetaData.processNr").value;
            break;
        default:
            document.getElementById("bol.txtInternalNr").innerText = "";
            document.getElementById("bol.txtProcessNr").innerText = "";
            document.getElementById("bol.txtOSCIzipCode").innerText = "";            
    }
}
function MapOperator31() {
    let md;
    if (md_FormData == undefined || md_FormData.length == 0) return;   
    if (BImSch_FormMode == 2) md = md_FormData.formContent.operator; else md = md_FormData.operator;
    if (md == undefined) return; 

    map(md.id, "operator.id");
    map(md.name, "operator.name");

    map(md.address.id, "operator.address.id");
    map(md.address.street, "operator.address.street");
    map(md.address.houseNr, "operator.address.houseNr");
    map(md.address.zipCode, "operator.address.zipCode");
    map(md.address.city, "operator.address.city");
    map(md.address.federalState, "operator.address.federalState");
    map(md.address.district, "operator.address.district");
    UpdateHiddenAddress();

    // not required for Form 31
    // map(md.contactPerson.id, "operator.contactPerson.id");
    // map(md.contactPerson.title, "operator.contactPerson.title");
    // map(md.contactPerson.firstName, "operator.contactPerson.firstName");
    // map(md.contactPerson.lastName, "operator.contactPerson.lastName");
    // map(md.contactPerson.funktion, "operator.contactPerson.funktion");
    // map(md.contactPerson.phone, "operator.contactPerson.phone");
    // map(md.contactPerson.email, "operator.contactPerson.email");
}
function MapOperatingSite31() {
    let md;
    if (md_FormData == undefined || md_FormData.length == 0) return;   
    if (BImSch_FormMode == 2) md = md_FormData.formContent.operatingSite; else md = md_FormData.operatingSite;

    map(md.id, "operatingSite.id");
    map(md.name, "operatingSite.name");
    map(md.nr, "operatingSite.nr");
    map(md.naceCode.code, "operatingSite.naceCode.code");
    map(md.naceCode.shortText, "operatingSite.naceCode.shortText");

    map(md.competentAuthority, "operatingSite.competentAuthority");

    map(md.address.id, "operatingSite.address.id");
    map(md.address.street, "operatingSite.address.street");
    map(md.address.houseNr, "operatingSite.address.houseNr");
    map(md.address.zipCode, "operatingSite.address.zipCode");
    map(md.address.city, "operatingSite.address.city");
    map(md.address.federalState, "operatingSite.address.federalState");
    map(md.address.district, "operatingSite.address.district");
    map(md.building, "operatingSite.building");
    map(md.address.YN,"operatingSite.address.YN");
    bolHideClear("operatingSite.address.YN", "zone.operatingSite.address", "ja");
    UpdateHiddenAddress();

    // not required for Form 31
    // map(md.contactPerson.id, "operatingSite.contactPerson.id");
    // map(md.contactPerson.title, "operatingSite.contactPerson.title");
    // map(md.contactPerson.firstName, "operatingSite.contactPerson.firstName");
    // map(md.contactPerson.lastName, "operatingSite.contactPerson.lastName");
    // map(md.contactPerson.funktion, "operatingSite.contactPerson.funktion");
    // map(md.contactPerson.phone, "operatingSite.contactPerson.phone");
    // map(md.contactPerson.email, "operatingSite.contactPerson.email");
    // bolHideClear("operatingSite.person.YN", "zone.operatingSite.person", "ja");
}
function MapPlant31(PlantID) {
    let md;
    if (PlantID == undefined) PlantID = 0;
    if (md_FormData == undefined || md_FormData.length == 0) return;   
    if (BImSch_FormMode == 2) md = md_FormData.formContent.plant; else md = md_FormData.plants[PlantID];
    if (md == undefined) return;

    map(md.id, "plant.id");
    map(md.name, "plant.name");
    map(md.nr, "plant.nr");

    map(md.approvalNumber67, "plant.approvalNumber67");
    map(md.nrAccordingToAppendix1Of4BImSchV, "plant.nrAccordingToAppendix1Of4BImSchV");
    map(md.nrAccordingToIEDirective, "plant.nrAccordingToIEDirective");
    map(md.nrAccordingToPRTR, "plant.nrAccordingToPRTR");
    map(md.registryCode, "plant.registryCode");
    map(md.referenceIE, "plant.referenceIE");

    // not required for Form 31
    // map(md.address.id, "plant.address.id");
    // map(md.address.street, "plant.address.street");
    // map(md.address.houseNr, "plant.address.houseNr");
    // map(md.address.zipCode, "plant.address.zipCode");
    // map(md.address.city, "plant.address.city");
    // map(md.address.federalState, "plant.address.federalState");
    // map(md.address.district, "plant.address.district");
    // map(md.building, "plant.building");
    // map(md.address.YN,"plant.address.YN");
    // bolHideClear("plant.address.YN", "zone.plant.address", "ja");
    // Update_OSCIzipCode();

    // map(md.contactPerson.id, "plant.contactPerson.id");
    // map(md.contactPerson.title, "plant.contactPerson.title");
    // map(md.contactPerson.firstName, "plant.contactPerson.firstName");
    // map(md.contactPerson.lastName, "plant.contactPerson.lastName");
    // map(md.contactPerson.funktion, "plant.contactPerson.funktion");
    // map(md.contactPerson.phone, "plant.contactPerson.phone");
    // map(md.contactPerson.email, "plant.contactPerson.email");
    // bolHideClear("plant.person.YN", "zone.plant.person", "ja");

    // map(md.competentAuthority, "plant.competentAuthority");

    map(md.eastValue, "plant.eastValue");
    map(md.northValue, "plant.northValue");
    map(md.district, "plant.district");
    map(md.corridor, "plant.corridor");
    map(md.parcel, "plant.parcel");
    map(md.outdoorPlant, "plant.outdoorPlant");
    Show_outdoorPlant();
}
function Show_outdoorPlant(value){
    if (getField("plant.outdoorPlant").value == "ja") bolShow("zone.outdoorPlant"); else bolHideClear("zone.outdoorPlant");
}

// map data for Form § 1 der 31. BImSchG - Jaehrliche Auskunft
async function MapData31() {
    function MapFields(baseName, fieldname) {
        {try {getField(baseName + "." + fieldname + ".partName").value = md[baseName][fieldname]["partName"];} catch(err) {}}
        getField(baseName + "." + fieldname + ".comment").value = md[baseName][fieldname]["comment"];
        getField(baseName + "." + fieldname + ".report").value = md[baseName][fieldname]["report"];
        getField(baseName + "." + fieldname + ".YN").value = md[baseName][fieldname]["YN"];
        if (getField(baseName + "." + fieldname + ".YN").value == "ja") bolShow("zone." + baseName + "." + fieldname);   
    }
    function MapFiles(baseName, counter) {
        {try {getField(baseName + ".file" + counter + ".title").value = md[baseName]["file" + counter]["title"]} catch(err) {}}
        if (getField(baseName + ".file" + counter + ".title").value != "") {
            getField(baseName + ".file" + counter + ".comment").value = md[baseName]["file" + counter]["comment"];
            getField(baseName + ".file" + counter + ".report").value = md[baseName]["file" + counter]["report"];
            document.getElementById(baseName + ".file" + counter + ".comment").rows = "5";
            bolShow("zone." + baseName + ".file" + counter);
        } else {bolHide("zone." + baseName + ".file" + counter); bolClear("zone." + baseName + ".file" + counter)}
    }


    let md;
    if (md_FormData == undefined || md_FormData.length == 0) return;   
    md = md_FormData.formContent;
    if (md == undefined) return; 

    map(md.Formular.Datenschutz, "Formular.Datenschutz");
    map(md.Formular.Bemerkung, "Formular.Bemerkung");
    map(md.report.year, "report.year");
    map(md.report.date, "report.date");

    for (let i =1; i < 6; i++) {
        map(md.report["contactPerson" + i]["title"], "report.contactPerson" + i + ".title");
        map(md.report["contactPerson" + i]["firstName"], "report.contactPerson" + i + ".firstName");
        map(md.report["contactPerson" + i]["lastName"], "report.contactPerson" + i + ".lastName");
        map(md.report["contactPerson" + i]["funktion"], "report.contactPerson" + i + ".funktion");
        map(md.report["contactPerson" + i]["phone"], "report.contactPerson" + i + ".phone");
        map(md.report["contactPerson" + i]["email"], "report.contactPerson" + i + ".email");
        if (getField("report.contactPerson" + i + ".lastName").value != "") bolShow("zone.report.contactPerson" + i); else bolHideClear("zone.report.contactPerson" + i);
    }
    for (let i = 0; i < fields_measurement.length; i++) {
        map(md.measurement[fields_measurement[i]]["partName"], "measurement." + fields_measurement[i] + ".partName");
        map(md.measurement[fields_measurement[i]]["fileCount"], "measurement." + fields_measurement[i] + ".fileCount");
        map(md.measurement[fields_measurement[i]]["comment"], "measurement." + fields_measurement[i] + ".comment");
        map(md.measurement[fields_measurement[i]]["YN"], "measurement." + fields_measurement[i] + ".YN");
    }
    for (let i = 1; i < 11; i++) map(md.measurement["file" + i]["title"], "measurement.file" + i + ".title");
    map(md.measurement.files.fileCount, "measurement.files.fileCount");
    Form31Page_measurement();

    for (let i = 0; i < fields_maintenance.length; i++) {
        map(md.maintenance[fields_maintenance[i]]["partName"], "maintenance." + fields_maintenance[i] + ".partName");
        map(md.maintenance[fields_maintenance[i]]["fileCount"], "maintenance." + fields_maintenance[i] + ".fileCount");
        map(md.maintenance[fields_maintenance[i]]["comment"], "maintenance." + fields_maintenance[i] + ".comment");
        map(md.maintenance[fields_maintenance[i]]["YN"], "maintenance." + fields_maintenance[i] + ".YN");
    }
    Form31Page_maintenance();

    for (let i = 0; i < fields_selfControl.length; i++) {
        map(md.selfControl[fields_selfControl[i]]["partName"], "selfControl." + fields_selfControl[i] + ".partName");
        map(md.selfControl[fields_selfControl[i]]["fileCount"], "selfControl." + fields_selfControl[i] + ".fileCount");
        map(md.selfControl[fields_selfControl[i]]["comment"], "selfControl." + fields_selfControl[i] + ".comment");
        map(md.selfControl[fields_selfControl[i]]["YN"], "selfControl." + fields_selfControl[i] + ".YN");
    }
    Form31Page_selfControl();

    for (let i = 0; i < fields_cycleWaste.length; i++) {
        map(md.cycleWaste[fields_cycleWaste[i]]["partName"], "cycleWaste." + fields_cycleWaste[i] + ".partName");
        map(md.cycleWaste[fields_cycleWaste[i]]["fileCount"], "cycleWaste." + fields_cycleWaste[i] + ".fileCount");
        map(md.cycleWaste[fields_cycleWaste[i]]["comment"], "cycleWaste." + fields_cycleWaste[i] + ".comment");
        map(md.cycleWaste[fields_cycleWaste[i]]["YN"], "cycleWaste." + fields_cycleWaste[i] + ".YN");
    }
    Form31Page_cycleWaste();

    for (let i = 0; i < fields_other.length; i++) {
        map(md.other[fields_other[i]]["partName"], "other." + fields_other[i] + ".partName");
        map(md.other[fields_other[i]]["fileCount"], "other." + fields_other[i] + ".fileCount");
        map(md.other[fields_other[i]]["comment"], "other." + fields_other[i] + ".comment");
        map(md.other[fields_other[i]]["YN"], "other." + fields_other[i] + ".YN");
    }
    for (let i = 1; i < 11; i++) map(md.other["file" + i]["title"], "other.file" + i + ".title");
    map(md.other.files.fileCount, "other.files.fileCount");
    Form31Page_other();

    map(md.measurement.fulfillRequirements.YN, "measurement.fulfillRequirements.YN");
    map(md.measurement.fulfillRequirements.comment, "measurement.fulfillRequirements.comment");

    for (let i =1; i < 6; i++) {
        map(md.events["event" + i]["comment"], "events.event" + i + ".comment");
        map(md.events["event" + i]["cause"], "events.event" + i + ".cause");
        map(md.events["event" + i]["timeframe"], "events.event" + i + ".timeframe");
        map(md.events["event" + i]["action"], "events.event" + i + ".action");
        map(md.events["event" + i]["complaint"], "events.event" + i + ".complaint");
        if (getField("events.event" + i + ".comment").value != "") bolShow("zone.events.event" + i); else bolHideClear("zone.events.event" + i);
    }
    map(md.events.YN, "events.YN");

    map(md.events.deviation.date, "events.deviation.date");
    map(md.events.deviation.nr, "events.deviation.nr");
    map(md.events.deviation.justification, "events.deviation.justification");
    map(md.events.deviation.info.date, "events.deviation.info.date");
    map(md.events.deviation.info.YN, "events.deviation.info.YN");
    map(md.events.deviation.YN, "events.deviation.YN");
    Form31Page_events();
}


function UpdateHiddenAccount() {
    getField("fgMetaData.contactLastName").value = getField("account.lastName").value;
    getField("fgMetaData.contactFirstName").value = getField("account.firstName").value;
    getField("fgMetaData.contactPhone").value = getField("account.contactNr").value;
    getField("fgMetaData.contactEmail").value = getField("account.email").value;
    getField("fgMetaData.timeStamp").value = bolGetTimeStampISO8601();
}
function UpdateHiddenOperator() {
    getField("fgMetaData.operatorId").value = getField("operator.id").value;
    getField("fgMetaData.operatorName").value = getField("operator.name").value;
}
function UpdateHiddenPlant() {
    let a;
    {try {a = getField("plant.name").value} catch(err) {}}
    if (a != undefined && a != "") getField("fgMetaData.plantName").value = getField("plant.name").value;
}
function UpdateHiddenAuthority() {
    let a;
    {try {a = getField("plant.competentAuthority").value} catch(err) {}}
    if (a != undefined && a != "") getField("fgMetaData.authorityName").value = getField("plant.competentAuthority").value;
    else getField("fgMetaData.authorityName").value = getField("operatingSite.competentAuthority").value;
}
function UpdateHiddenAddress() {
    let YN;
    {try {YN = getField("plant.address.YN").value} catch(err) {}}
    if (YN == "ja") {
        getField("fgMetaData.street").value = getField("plant.address.street").value;
        getField("fgMetaData.houseNr").value = getField("plant.address.houseNr").value;
        getField("fgMetaData.zipCode").value = getField("plant.address.zipCode").value;
        getField("fgMetaData.city").value = getField("plant.address.city").value;
        return;
    }
    {try {YN = getField("operatingSite.address.YN").value} catch(err) {}}
    if (YN == "ja") {
        getField("fgMetaData.street").value = getField("operatingSite.address.street").value;
        getField("fgMetaData.houseNr").value = getField("operatingSite.address.houseNr").value;
        getField("fgMetaData.zipCode").value = getField("operatingSite.address.zipCode").value;
        getField("fgMetaData.city").value = getField("operatingSite.address.city").value;
        return;
    }
    getField("fgMetaData.street").value = getField("operator.address.street").value;
    getField("fgMetaData.houseNr").value = getField("operator.address.houseNr").value;
    getField("fgMetaData.zipCode").value = getField("operator.address.zipCode").value;
    getField("fgMetaData.city").value = getField("operator.address.city").value;
}


function UpdateFormFields31() {
        // hide and show fields in summary
        bolSettings.fieldsNotInSummary = [
            "bol.NoPageCheck",
            "operator.address.federalState",
            "operatingSite.address.federalState",
            "operatingSite.competentAuthority.id", 
            "plant.address.federalState", 
            "plant.competentAuthority.id", 
            "plant.combustionType.id",
        ];
        bolSettings.fieldsInSummary = [
            "operator.address.federalState_shortText",
            "operatingSite.address.federalState_shortText",
            "operatingSite.competentAuthority.shortText",
            "plant.address.federalState_shortText", 
            "plant.competentAuthority.shortText",
            "plant.combustionType.shortText",
        ];
        // Update current date in field and label
        getField("Formular.Datum").value = bolGetDateD();
        getField("plant.reportDate").value = bolGetDateD();
        // bolFieldsetSetLegend("zone.infoFMS", getField("Formular.Datum").value);
        document.getElementById("bol.txtFormDate").innerText = "Datum: " + bolGetDateD();
        document.getElementById("bol.txtInternalNr").innerText = "";
        document.getElementById("bol.txtProcessNr").innerText = "";
        bolHide("btnPersonOperatingSite1");
        bolHide("btnPersonOperatingSite2");

        FillDataList_NACE("operatingSite.naceCode.code");
        switch (BImSch_FormMode) {
            case 5:
            case 4:
                // bolShow("btnSaveLocal");
                break;
            case 2:
                {try {document.getElementById("bol.txtInternalNr").innerText = "intern: " + md_FormData.formId + " / " + md_FormData.processId} catch(err) {}}
                getField("BImSch_ProcessId").value =  md_FormData.processId;
            case 1:
                bolShow("btnPersonOperatingSite1");
                bolShow("btnPersonOperatingSite2");
                bolFieldsetCollapse("zone.operator");
                if (getField("BImSch_processNr").value != "") document.getElementById("bol.txtProcessNr").innerText = "Vorgangsnummer:\n" + getField("BImSch_processNr").value;
                bolShow("btnSave");
                bolHide("btnSaveLocal");
                break;
        }
        let e = document.getElementById("bol.txtDSGVOlink");
        if (e != undefined) e.innerHTML = '<a href="' + getField("BImSch_urlPortal").value + 'de/datenschutz" target="_blank" rel="noreferrer,nofollow">Details zum Datenschutz</a>';
}

/*------------------------------------------------------------------------------------*/
/*
 * map fields for a specific form
*
***************************************************************************************/

const fields_measurement = ["discontinuous", "continuous", "calibration", "BImSchV13", "BImSchV17", "BImSchV31", "massBalance", "exhaustClearing", "operatingHours"];
const fields_maintenance = ["book", "testProtocol", "internal"];
const fields_selfControl = ["burner", "fuels", "temperature", "visualInspection", "plantData"];
const fields_cycleWaste = ["BImSchG"];
const fields_other = ["ISO14001", "otherDoc", "education", "ISO50001", "training"];

function Form31Page_measurement() {
    let j;
    for (let i = 0; i < fields_measurement.length; i++) {
        bolHideClear("measurement." + fields_measurement[i] + ".YN", "zone.measurement." + fields_measurement[i], "ja");
        document.getElementById("measurement." + fields_measurement[i] + ".comment").rows = "3";
    }
    j = parseInt(getField("measurement.files.fileCount").value);
    if (j > 0 ) {
        for (let i = 1; i < (j + 1); i++) bolShow("measurement.file" + i + ".title");
        for (let i = (j + 1); i < 11; i++) bolHideClear("measurement.file" + i + ".title");
    } else for (let i = 1; i < 11; i++) bolHideClear("measurement.file" + i + ".title");
    document.getElementById("measurement.fulfillRequirements.comment").rows = "3";
}
function Form31Page_maintenance() {
    for (let i = 0; i < fields_maintenance.length; i++) {
        bolHideClear("maintenance." + fields_maintenance[i] + ".YN", "zone.maintenance." + fields_maintenance[i], "ja");
        document.getElementById("maintenance." + fields_maintenance[i] + ".comment").rows = "3";
    }
}
function Form31Page_selfControl() {
    for (let i = 0; i < fields_selfControl.length; i++) {
        bolHideClear("selfControl." + fields_selfControl[i] + ".YN", "zone.selfControl." + fields_selfControl[i], "ja");
        document.getElementById("selfControl." + fields_selfControl[i] + ".comment").rows = "3";
    }
}
function Form31Page_cycleWaste() {
    for (let i = 0; i < fields_cycleWaste.length; i++) {
        bolHideClear("cycleWaste." + fields_cycleWaste[i] + ".YN", "zone.cycleWaste." + fields_cycleWaste[i], "ja");
        document.getElementById("cycleWaste." + fields_cycleWaste[i] + ".comment").rows = "3";
    }
}
function Form31Page_other() {
    for (let i = 0; i < fields_other.length; i++) {
        bolHideClear("other." + fields_other[i] + ".YN", "zone.other." + fields_other[i], "ja");
        document.getElementById("other." + fields_other[i] + ".comment").rows = "3";
    }
    j = parseInt(getField("other.files.fileCount").value);
    if (j > 0 ) {
        for (let i = 1; i < (j + 1); i++) bolShow("other.file" + i + ".title");
        for (let i = (j + 1); i < 11; i++) bolHideClear("other.file" + i + ".title");
    } else for (let i = 1; i < 11; i++) bolHideClear("other.file" + i + ".title");
}
function Form31Page_events() {
    for (let i = 1; i < 6; i++) {
        document.getElementById("events.event" + i + ".comment").rows = "3";
        document.getElementById("events.event" + i + ".cause").rows = "3";
        document.getElementById("events.event" + i + ".timeframe").rows = "3";
        document.getElementById("events.event" + i + ".action").rows = "3";
        document.getElementById("events.event" + i + ".complaint").rows = "3";
    }
    if (this.getField("events.YN").value == "ja") {
        bolShow("zone.events.event1");
    } else {
        for (let i = 1; i < 6; i++) bolHideClear("zone.events.event" + i);
    }
    if (getField("events.deviation.YN").value == "ja") bolShow("zone.events.deviation");
    else bolHideClear("zone.events.deviation");
    bolHideClear("events.deviation.info.YN", "events.deviation.info.date", "ja");
}

function Form31Page_UploadFields() {
    let fi, fa;

    function FileSingle(gName, fname) {
        if (getField(gName + "." + fname + ".YN").value == "ja") {
            let j = parseInt(getField(gName + "." + fname + ".fileCount").value);
            if (j > 0) {bolShow("Anhang_" + gName + "_" + fname + "_1"); return 1;}
        }
        bolHideClear("Anhang_" + gName + "_" + fname + "_1")
        return 0;
    }
    function FileList(gName, fname) {
        if (getField(gName + "." + fname + ".YN").value == "ja") {
            let j = parseInt(getField(gName + "." + fname + ".fileCount").value);
            if (j > 0) {
                for (let i = 1; i < (j + 1); i++) {bolShow("Anhang_" + gName + "_" + fname + "_" + i);}
                for (let i = (j + 1); i < 20; i++) bolHideClear("Anhang_" + gName + "_" + fname + "_" + i);
                bolShow("zone.Anhang." + gName + "." + fname);
                return 1;
            }
        }
        bolHideClear("zone.Anhang." + gName + "." + fname);
        return 0;
    }
    function FilePlus(gName) {
        let j = parseInt(getField(gName + ".files.fileCount").value);
        if (j > 0) {
            for (let i = 1; i < (j + 1); i++) {
                bol_UpdateLabel("Anhang_" + gName + "_file_" + i, "weiteres Dokument (" + getField(gName + ".file" + i + ".title").value + ") ");
                bolShow("Anhang_" + gName + "_file_" + i);
            }
            for (let i = (j + 1); i < 11; i++) bolHideClear("Anhang_" + gName + "_file_" + i);
            bolShow("zone.Anhang." + gName + ".files");
            return 1;
        } 
        bolHideClear("zone.Anhang." + gName + ".files");
        return 0;
    }

    fa = 0;
    for (let i = 0; i < 3; i++) fa = fa + FileList("measurement", fields_measurement[i]);

    fi = 0;
    for (let i = 3; i < fields_measurement.length; i++) fi = fi + FileSingle("measurement", fields_measurement[i]);
    if (fi > 0) {bolShow("zone.Anhang.measurement.other");fa = fa + fi} else bolHideClear("zone.Anhang.measurement.other");
    fa = fa + FilePlus("measurement");
    if (fa > 0) bolShow("zone.Anhang.measurement"); else bolHideClear("zone.Anhang.measurement");

    fa = 0;
    for (let i = 0; i < fields_maintenance.length; i++) fa = fa + FileList("maintenance", fields_maintenance[i]);
    for (let i = 0; i < fields_selfControl.length; i++) fa = fa + FileList("selfControl", fields_selfControl[i]);
    for (let i = 0; i < fields_cycleWaste.length; i++) fa = fa + FileList("cycleWaste", fields_cycleWaste[i]);
    for (let i = 0; i < fields_other.length; i++) fa = fa + FileList("other", fields_other[i]);
    fa = fa + FilePlus("other");
    if (fa > 0) bolShow("zone.Anhang.otherStuff"); else bolHideClear("zone.Anhang.otherStuff");
}


/***************************************************************************************************
 * CALLBACK Funktionen aus bol-globals.js, welche in diesem Projekt verwendet werden
***************************************************************************************************/
function bolProject_DoSomethingOnPage(PageNo) {
    bolHide("btnSend");
    bolHide("btnPrint");
    bolShow("btnNext");
    bolShow("btnSave");
    // bolShow("btnSaveLocal");
    bolShow("btnPrev");
    // zunaechst abfragen welche Seite aufgerufen wird und damit die Button zum Seitenwechsel anpassen
    switch (PageNo) {
        case bolPage.max:
            bolShow("btnPrint");
            bolShow("btnSend");
            bolHide("btnSave");
            bolHide("btnNext");
            // bolHide("btnSaveLocal");
            break;
        case (bolPage.max - 1):
            Form31Page_UploadFields();
            break;
        case 1:
            bolHide("btnPrev");
            break;
    }
}

//Export all functions and variables so that they can be used elsewhere
export {
    setupForm,
    SendForm31,
    LoadDataForm31,
    map,
    MapAccount31,
    MapOperator31,
    MapOperatingSite31,
    MapPlant31,
    Show_outdoorPlant,
    MapData31,
    UpdateHiddenAccount,
    UpdateHiddenOperator,
    UpdateHiddenAuthority,
    UpdateHiddenPlant,
    UpdateHiddenAuthority,
    UpdateHiddenAddress,
    UpdateFormFields31,
    Form31Page_measurement,
    Form31Page_maintenance,
    Form31Page_selfControl,
    Form31Page_cycleWaste,
    Form31Page_other,
    Form31Page_events,
    Form31Page_UploadFields,
    bolProject_DoSomethingOnPage,
    fields_measurement,
    fields_maintenance,
    fields_selfControl,
    fields_cycleWaste,
    fields_other
  };