/***************************************************************************************
 * helper functions
 *
***************************************************************************************/
function MapField(fJSON, fForm) {
    let v = fJSON, f;
    f = getField(fForm);
    if (f == undefined) return;
    if (v != undefined) getField(fForm).value = v; else getField(fForm).value = "";
}


function FillList_AddOption(code, text) {
    let option = document.createElement("option");
    if (code != "") option.text = text; else option.text = "";
    option.value = code;
    return option; 
}
function FillList_ClearOptions(lb) {
    lb.innerHTML = "";
    lb.options.add(FillList_AddOption("", ""));
    getField(lb.id).value = "";
}

/******************************************************************/
async function LoadList_FederalStates(listname) {
    if (md_FederalStates.length == 0) {
        if (BImSch_FormMode != 0) await svcData_FederalStates();
        else _local_FederalStates();
    }
    if (md_FederalStates.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_FederalStates.length; i++) lb.options.add(FillList_AddOption(md_FederalStates[i]["name"], md_FederalStates[i]["name"]));
}
/*----------------------------------------------------------------*/
async function LoadList_Authorities(listname) {
    if (md_Authorities.length == 0) {
        if (BImSch_FormMode != 0) await svcData_Authorities();
        else _local_Authorities();
    }
    if (md_Authorities.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_Authorities.length; i++) lb.options.add(FillList_AddOption(md_Authorities[i]["shortText"], md_Authorities[i]["shortText"]));
}
/*----------------------------------------------------------------*/
async function LoadList_CombustionPlantTypes(listname) {
    if (md_CombustionPlantTypes.length == 0) {
        if (BImSch_FormMode != 0) await svcData_CombustionPlantTypes();
        else _local_CombustionPlantTypes();
    }    
    if (md_CombustionPlantTypes.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_CombustionPlantTypes.length; i++) lb.options.add(FillList_AddOption(md_CombustionPlantTypes[i]["shortText"] + "", md_CombustionPlantTypes[i]["shortText"]));
}
/***************************************************************************************/
async function FillList_Persons(listname) {
    if (md_FormData == undefined || md_FormData.length == 0) return;
    if (md_Persons.length == 0) md_Persons = md_FormData.contactPersons;
    if (md_Persons.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_Persons.length; i++) {
        lb.options.add(FillList_AddOption(md_Persons[i]["id"], md_Persons[i]["firstName"] + " " + md_Persons[i]["lastName"]  + ", " + md_Persons[i]["funktion"]));
    }
}
function dlgPerson(Modus) {
    let e = document.getElementById('dlgPerson');
    if (e == undefined) {
        e = document.createElement("div");
        e.id = "dlgPerson";
        e.classList.add("modal");
        e.tabindex = -1;
        e.role = "dialog";
        e.setAttribute("aria-hidden", "true");
        document.body.children[0].appendChild(e);
    }         
    let s = '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">' +
            '  <div class="modal-content"><div id="bolDialogHeader" class="modal-header bol-dialog-header">' +
            '    <h5 class="modal-title" id="bolDialogTitle"> Person ändern/auswählen</h5><button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '    </div><div class="modal-body" id="bolDialogMessage" style="margin: 5px;background-color: rgb(240, 240, 240);">' +
            'Wählen Sie aus der Liste der bekannten Ansprechpersonen aus:' + 
            '      <div class="cc-obj cc-combo infieldlabel">' +
            '        <select class="combobox input-large form-control" id="list_contact" aria-describedby="list_contact-infield-error" title="Ansprechpersonen" name="list_contact"></select>' +
            '        <div class="infielderror" id="list_contact-infield-error"></div> <label for="list_contact">Ansprechpersonen</label></div>' +
            '      </div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn cc-button " data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgPersonClose(`' + Modus + '`);">übernehmen</button>'+
            '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgPersonCancel(`' + Modus + '`);">abbrechen</button></div></div></div>';
    e.innerHTML = s;
    let dlg = new bootstrap.Modal(e); 
    FillList_Persons("list_contact");
    dlg.show();
    document.getElementById("list_contact").focus();
}
function dlgPersonClose(Modus) {
    let f = this.getField("list_contact");
    if (f.value == "") return;
    if (Modus == "") return;

    let o = md_Persons.filter(({id}) => id == parseInt(f.value));
    if (o == undefined) return;

    if (Modus.indexOf("report") >= 0) {
        getField(Modus + ".id").value = o[0].id;
        getField(Modus + ".firstName").value = o[0].firstName;
        getField(Modus + ".lastName").value = o[0].lastName;
        getField(Modus + ".funktion").value = o[0].funktion;
        getField(Modus + ".phone").value = o[0].phone;
        getField(Modus + ".email").value = o[0].email;
    } else {
        getField(Modus + ".contactPerson.id").value = o[0].id;
        getField(Modus + ".contactPerson.firstName").value = o[0].firstName;
        getField(Modus + ".contactPerson.lastName").value = o[0].lastName;
        getField(Modus + ".contactPerson.funktion").value = o[0].funktion;
        getField(Modus + ".contactPerson.phone").value = o[0].phone;
        getField(Modus + ".contactPerson.email").value = o[0].email;
        dlgPersonCancel(Modus);
    }
}
function dlgPersonCancel(Modus) {
    document.getElementById(Modus + ".contactPerson.funktion").focus();
}
/***************************************************************************************/
async function FillDataList_NACE(listname) {
    if (md_NACE.length == 0) {
        if (BImSch_FormMode != 0) await svcData_NACE();
        else _local_NACE();
    } 
    if (md_NACE.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    let dl = document.createElement("datalist");
    dl.id = "list-of-naceCodes";
    for (let i = 0; i < md_NACE.length; i++) {
        let o = document.createElement("option");
        o.value = md_NACE[i]["code"];
        dl.appendChild(o);
    }
    lb.setAttribute("list", "list-of-naceCodes" );
    lb.appendChild(dl);
}
async function Lookup_NACEtext(fieldCode, fieldText) {
    if (md_NACE.length == 0) {
        if (BImSch_FormMode != 0) await svcData_NACE();
        else _local_NACE();
    } 
    if (md_NACE.length == 0) return;
    if (getField(fieldCode).value == "") {getField(fieldText).value = ""; return}
    let o = md_NACE.filter(({code}) => code.indexOf(getField(fieldCode).value) >= 0);
    if (o == undefined || o.length == 0) getField(fieldText).value = "";
    else getField(fieldText).value = o[0].shortText;
}

async function FillList_NACE(listname) {
    if (md_NACE.length == 0) {
        if (BImSch_FormMode != 0) await svcData_NACE();
        else _local_NACE();
    } 
    if (md_NACE.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_NACE.length; i++) lb.options.add(FillList_AddOption(md_NACE[i]["code"],  md_NACE[i]["code"] + " - " + md_NACE[i]["shortText"]));
}
function dlgNACE(Modus) {
    let e = document.getElementById('dlgNACE');
    if (e == undefined) {
        e = document.createElement("div");
        e.id = "dlgNACE";
        e.classList.add("modal");
        e.tabindex = -1;
        e.role = "dialog";
        e.setAttribute("aria-hidden", "true");
        document.body.children[0].appendChild(e);
    }         
    let s = '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">' +
    '  <div class="modal-content"><div id="bolDialogHeader" class="modal-header bol-dialog-header">' +
    '    <h5 class="modal-title" id="bolDialogTitle"> NACE ändern/auswählen</h5><button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" style="color: white;">x</button>' +
    '    </div><div class="modal-body" id="bolDialogMessage" style="margin: 5px;background-color: rgb(240, 240, 240);">' +
    '      <div class="row" style="margin: 5px;background-color: rgb(240, 240, 240);">' + 
    '       <div class="cc-obj cc-edit infieldlabel">' + 
    '         <input id="filter.NACE" aria-describedby="filter.NACE-infield-error" class="form-control" type="text" name="filter.NACE" title="NACE filtern nach" onkeyup="FilterNACE(`list.NACE`, `filter.NACE`);" value="" required="">' +
    '            <div class="infielderror" id="filter.NACE-infield-error"></div>' +
    '            <label for="filter.NACE">filtern nach</label></div>' +
    '        <select class="listbox form-control" id="list.NACE" title="NACE" size="8"></select>' +
    '      </div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn cc-button " data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgNACEClose(`' + Modus + '`);">übernehmen</button>'+
    '<button type="button" class="btn cc-button" data-dismiss="modal" data-bs-dismiss="modal" onclick="dlgNACEcancel();">abbrechen</button></div></div></div>';
    e.innerHTML = s;
    let dlg = new bootstrap.Modal(e); 
    FillList_NACE("list.NACE");
    if (dlg != undefined) dlg.show();    
    document.getElementById("filter.NACE").focus();
}
function FilterNACE(listname, filtername) {
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    let fv = getField(filtername).value;
    if (fv == "") return;
    let o;
    o = md_NACE.filter(({shortText}) => shortText.toLowerCase().indexOf(fv.toLowerCase()) >= 0);
    if (o == undefined || o.length == 0) o = md_NACE.filter(({code}) => code.indexOf(fv) >= 0);
    FillList_ClearOptions(lb);
    for (let i = 0; i < o.length; i++) lb.options.add(FillList_AddOption(o[i]["code"], o[i]["code"] + " - " + o[i]["shortText"]));
}
function dlgNACEClose(Modus) {
    let f = this.getField("list.NACE");
    if (f.value == "") return;
    let o = md_NACE.filter(({code}) => code == parseInt(f.value));
    if (o == undefined) return;
    this.getField("operatingSite.naceCode.code").value = o[0].code;
    this.getField("operatingSite.naceCode.shortText").value = o[0].shortText;
    dlgNACEcancel();
}
function dlgNACEcancel() {
    document.getElementById("btnNACE").focus();
}
/***************************************************************************************/
async function FillList_EmissionControlSystems(listname) {
    if (md_EmissionControlSystems.length == 0) {
        if (BImSch_FormMode != 0) await svcData_EmissionControlSystems();
        else _local_EmissionControlSystems();
    } 
    if (md_EmissionControlSystems.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_EmissionControlSystems.length; i++) lb.options.add(FillList_AddOption(md_EmissionControlSystems[i]["ident"], md_EmissionControlSystems[i]["shortText"]));
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
    FillList_EmissionControlSystems("list.EmissionControlSystems");
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
async function FillList_Fuels(listname) {
    if (md_Fuels.length == 0) {
        if (BImSch_FormMode != 0) await svcData_Fuels();
        else _local_Fuels();
    } 
    if (md_Fuels.length == 0) return;
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    FillList_ClearOptions(lb);
    for (let i = 0; i < md_Fuels.length; i++) {
        lb.options.add(FillList_AddOption(lb.name, md_Fuels[i]["id"], md_Fuels[i]["shortText"]));
    }
}
function SetText_Fuels(listname) {
    let lb = document.getElementById(listname);
    if (lb == undefined) return;
    let s;
    for (let i = 0; i < lb.options.length; i++) {
        if (lb.options[i].value == getField("Anlage.BrennstoffNeu").value) getField("Anlage.BrennstoffNeuText").value = lb.options[i].innerText;
    }
}

//Export all functions and variables so that they can be used elsewhere
export {
    MapField,
    FillList_AddOption,
    FillList_ClearOptions,
    LoadList_FederalStates,
    LoadList_Authorities,
    LoadList_CombustionPlantTypes,
    FillList_Persons,
    dlgPerson,
    dlgPersonClose,
    dlgPersonCancel,
    FillDataList_NACE,
    Lookup_NACEtext,
    FillList_NACE,
    dlgNACE,
    FilterNACE,
    dlgNACEClose,
    dlgNACEcancel,
    FillList_EmissionControlSystems,
    dlgEmissionControlSystems,
    MakeValues_EmissionControlSystems,
    dlgEmissionControlSystemsClose,
    FillList_Fuels,
    SetText_Fuels
  };