/********************************************************************
 * @summary
 *
 *  betreiber.id, plant.id
 *
 */

let useLocalData = false;

/*** URLs to call portal services */
let md_URL_portal = "";
let md_URL_resolver = ""; // stores the URL, loaded by the portal

let md_FormData = []; // data of the active form in JSON, loaded by the portal
let md_UUID = ""; // stores a given UUID from the URL
let md_processNr = ""; // stores a given processNr from the URL

// objects for catalogs
let md_Authorities = [];
let md_Fuels = [];
let md_NACE = [];
let md_EmissionControlSystems = [];
let md_CombustionPlantTypes = [];
let md_Persons = [];
let md_FederalStates = [];
let md_PlantTypes = [];

// Modus, wie das Formular geöffnet wurde
// 0 = local, 1 = neues Formular übers Portal, 2 = Zwischenspeicherung vom Portal öffnen, 4 = lokale Zwischenspeicherung, 5 = leeres Formular über URL
let BImSch_FormMode = undefined;

// load  form data
async function GetFormData(formName) {
  let theId = "";
  // get the base URL for REST services from the form, value should be replaced by 'replacement element'
  md_URL_portal = getField("fgMetaData.urlPortal").value;

  // check for opening the form on local sys (dev/debug)
  if (location.href.indexOf("file://") >= 0) {
    BImSch_FormMode = 0;
  } else {
    // ok, call via findform from FS
    // is UUID part of the URL?
    md_UUID = bolURLParameter("UUID");
    if (md_UUID == undefined || md_UUID == "") {
      // no UUID, an empty form is openend
      // check, if a TimeStampValue exists in bol.FormSettings
      if (bolSettings.TimeStampSave != "") {
        // yes, the form is a local saved HTML file (done by bol NetSave)
        BImSch_FormMode = 4;
      } else {
        // no, so an empty form will be loaded
        BImSch_FormMode = 5;
      }
    } else {
      // UUID exists, so the form is opened with a valid URL from the portal
      // 1. try to get data for a already submitted form (re-open)
      md_URL_resolver =
        getField("fgMetaData.urlResolve").value + "process_data/" + md_UUID;
      {
        try {
          await svcData_FormData4431(md_URL_resolver);
        } catch (err) {}
      }
      // check, if we have a result and in the result we have a operator ID
      if (md_FormData.length != 0) {
        {
          try {
            theId = md_FormData.operator.id;
          } catch (err) {}
        }
        if (theId != undefined || theId != "") BImSch_FormMode = 2;
      }
      if (BImSch_FormMode != 2) {
        // 2. no result from previous call, now try to open a 'empty' form
        md_URL_resolver =
          getField("fgMetaData.urlResolve").value + "master_data/" + md_UUID;
        await svcData_FormData4431(md_URL_resolver);
        if (md_FormData.length != 0) BImSch_FormMode = 1;
      }
      // try to get a processNr from URL, given by the portal
      md_processNr = bolURLParameter("processNr");
    }
  }
  // do we have a processNr then set field values else remove values
  if (md_processNr != undefined && md_processNr != "") {
    getField("fgMetaData.processNr").value = md_processNr;
    getField("BImSch_processNr").value = md_processNr;
    getField("fgMetaData.fileName").value = md_processNr;
  } else {
    getField("fgMetaData.processNr").value = "";
    getField("fgMetaData.fileName").value = "";
  }
  switch (BImSch_FormMode) {
    case 5:
    case 4:
      // hat die URL einen parameter sim||test?
      if (bolURLParameter("sim") != undefined) {
        _local_DataForm();
        BImSch_FormMode = BImSch_FormMode + 10;
      }
      break;
    case 2:
    case 1:
      break;
    case 0:
      if (useLocalData) _local_DataForm();
      break;
    default:
      break;
  }
  // for debugging
  console.log(BImSch_FormMode, md_URL_resolver, location.href);
}

async function svcData_FormData4431(url) {
  if (md_FormData.length != 0) return;
  if (url == undefined || url == "") return;
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_FormData = await response.json();
  }
}

async function svcData_Authorities() {
  if (md_Authorities.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "authorities";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_Authorities = await response.json();
  }
}
async function svcData_FederalStates() {
  if (md_FederalStates.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "federal-states";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_FederalStates = await response.json();
  }
}
async function svcData_Fuels() {
  if (md_Fuels.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "fuels";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_Fuels = await response.json();
  }
}
async function svcData_NACE() {
  if (md_NACE.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "nace-codes";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_NACE = await response.json();
  }
}
async function svcData_PlantTypes() {
  if (md_PlantTypes.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "plant-types";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_PlantTypes = await response.json();
  }
}
async function svcData_CombustionPlantTypes() {
  if (md_CombustionPlantTypes.length != 0) return;
  let url = getField("fgMetaData.urlCatalogs").value + "combustion-plant-types";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_CombustionPlantTypes = await response.json();
  }
}
async function svcData_EmissionControlSystems() {
  if (md_EmissionControlSystems.length != 0) return;
  let url =
    getField("fgMetaData.urlCatalogs").value + "emission-control-systems";
  let response = await fetch(url, {
    mode: "cors",
    "Content-Type": "application/json",
  });
  if (response.ok) {
    md_EmissionControlSystems = await response.json();
  }
}

function _local_DataForm() {
  md_FormData = {
    account: {
      id: 0,
      firstName: "Tik",
      lastName: "Tak",
      email: "tiktak@operator.de",
      contactNr: "+49987654323",
    },
    operator: {
      id: 0,
      name: "tiktak AG",
      address: {
        id: 0,
        street: "Straße 1",
        houseNr: "27",
        zipCode: "56521",
        city: "jhbjlhvvvvvvvvvvvvv",
        federalState: "BE",
        district: "hjlgjlhgbvjlkhvvvvvvvvvvvvvvvvv",
      },
      contactPerson: {
        id: 0,
        firstName: "Max",
        lastName: "Mustermann",
        funktion: "Betreiber",
        phone: "123456",
        email: "max@betreiber.de",
      },
    },
    operatingSite: {
      id: 0,
      name: "Testbetriebsstätte",
      nr: "123",
      naceCode: {
        id: 0,
        code: "1251",
        shortText: "Anbau von Erdbeeren",
        longText: "01251 - Anbau von Erdbeeren",
      },
      building: null,
      address: {
        id: 0,
        street: "Betriebsstättenstr.",
        houseNr: "2",
        zipCode: "55130",
        city: "Wiesbaden",
        federalState: "HE",
        district: "Eppsch Seit'",
      },
      contactPerson: {
        id: 0,
        firstName: "Sven",
        lastName: "Schneider",
        funktion: "Betriebsstättenchef",
        phone: "234567",
        email: "sven@betriebsstaette.de",
      },
      competentAuthority: {
        id: 2,
        ident: "RP 20",
        shortText: "SGD Süd",
      },
      siteAccordingTo12BImSchV: false,
    },
    plants: [
      {
        id: 4,
        plantType: "1",
        name: "Dampfmaschine",
        nr: "4711",
        address: {
          id: 56,
          street: "Betriebsstättenstr.",
          houseNr: "2",
          zipCode: "55130",
          city: "Wiesbaden",
          federalState: "HE",
          district: "Eppsch Seit'",
        },
        contactPerson: {
          id: 40,
          firstName: "Jörg",
          lastName: "Jung",
          funktion: "Anlagentester",
          phone: "345678",
          email: "joerg@anlagentester.de",
        },
        plantSection: "Nebenanlage",
        requiresBImSchGApproval: true,
        approvalReferenceNumber: "1",
        nrAccordingToAppendix1Of4BImSchV: "2",
        nrAccordingToIEDirective: "3",
        nrAccordingToPRTR: "4",
        outdoorPlant: true,
        eastValue: "7",
        northValue: "8",
        district: "9",
        corridor: "10",
        parcel: "11",
        operationalUnit: "5",
        commissioningDate: "27.11.2022",
        competentAuthority: {
          id: 2,
          ident: "RP 20",
          shortText: "SGD Süd",
        },
        operatingSiteId: 6,
        pollutionSources: [
          {
            id: 0,
            nr: "S007",
            name: "EMSourceTEST",
            eastValue: 12,
            northValue: 14,
            geometricHeight: 300,
          },
          {
            id: 0,
            nr: "S0211",
            name: "Schornstein 2",
            eastValue: 25,
            northValue: 20,
            geometricHeight: 15,
          },
        ],
      },
    ],
    contactPersons: [
      {
        id: 40,
        firstName: "Jörg",
        lastName: "Jung",
        funktion: "Anlagentester",
        phone: "345678",
        email: "joerg@anlagentester.de",
      },
      {
        id: 38,
        firstName: "Max",
        lastName: "Mustermann",
        funktion: "Betreiber",
        phone: "123456",
        email: "max@betreiber.de",
      },
      {
        id: 11,
        firstName: "Anna",
        lastName: "Zervakis",
        funktion: "Produktionsleiter",
        phone: "0987654321",
        email: "12345@67890.de",
      },
      {
        id: 2,
        firstName: "Hans",
        lastName: "Wurst",
        funktion: "Abteilungsleiter Technik",
        phone: "49835549352",
        email: "hans.wurst@test.de",
      },
      {
        id: 39,
        firstName: "Sven",
        lastName: "Schneider",
        funktion: "Betriebsstättenchef",
        phone: "234567",
        email: "sven@betriebsstaette.de",
      },
      {
        id: 1,
        firstName: "Thomas",
        lastName: "Muller",
        funktion: "Umweltbeauftragter",
        phone: "049987654321",
        email: "tm@tmag.de",
      },
    ],
  };
}
function _local_f44a() {
  md_FormData1 = [
    {
      account: {
        id: 4,
        firstName: "Serge David",
        lastName: "Gnabry",
        email: "serge@operator.de",
        contactNr: "+49987654323",
      },
      formId: 381,
      processId: 114,
      formContent: {
        fuel_5: { new: "" },
        fuel_6: { new: "" },
        fuel_3: { new: "" },
        fuel_4: { YN: "ja", new: "80" },
        fuel_1: { YN: "ja", new: "20" },
        fuel_2: { new: "" },
        Formular: {
          Datum: "13.02.2023",
          processNr: "BIS23HE_000071_123",
          Datenschutz: "ja",
          Bemerkung: "sgvrtn trtrjrtbm zrt",
          EMailWeitere: "aa@aa.aa;bb@bb.bb",
        },
        operatingSite: {
          id: "6",
          name: "Testbetriebsstätte",
          nr: "123",
          naceCode: {
            id: "18",
            longText: "01251 - Anbau von Erdbeeren",
            code: "1251",
            shortText: "Anbau von Erdbeeren",
          },
          address: {
            id: "56",
            street: "Betriebsstättenstr.",
            houseNr: "2",
            zipCode: "55130",
            city: "Wiesbaden",
            federalState: "HE",
            federalState_shortText: "Hessen",
            district: "Eppsch Seit'",
          },
          building: "Haus27",
          competentAuthority: { id: "2", shortText: "SGD Süd" },
          contactPerson: {
            id: "39",
            firstName: "Sven",
            lastName: "Schneider",
            funktion: "Betriebsstättenchef",
            phone: "234567",
            email: "sven@betriebsstaette.de",
          },
        },
        operator: {
          id: "1",
          name: "TEST ipsm dolor sit amet,, no sea taki",
          address: {
            id: "55",
            street: "Betreiberstr.",
            houseNr: "1",
            zipCode: "55122",
            city: "Mainz",
            federalState: "RP",
            federalState_shortText: "Rheinland-Pfalz",
            district: "Mainz-Bingen",
          },
          contactPerson: {
            id: "38",
            firstName: "Max",
            lastName: "Mustermann",
            funktion: "Betreiber",
            phone: "123456",
            email: "max@betreiber.de",
          },
        },
        plant: {
          commissioningDate: "01.01.2023",
          reportType: "bestehende Anlage",
          id: "4",
          plantType: "1",
          competentAuthority: { id: "2", shortText: "SGD Süd" },
          name: "Dampfmaschine",
          nr: "4711",
          plantSection: "Nebenanlage",
          address: {
            id: "56",
            street: "Betriebsstättenstr.",
            houseNr: "2",
            zipCode: "55130",
            city: "Wiesbaden",
            federalState: "HE",
            federalState_shortText: "Hessen",
            district: "9",
          },
          contactPerson: {
            id: "40",
            firstName: "Jörg",
            lastName: "Jung",
            funktion: "Anlagentester",
            phone: "345678",
            email: "joerg@anlagentester.de",
          },
          requiresBImSchGApproval: "ja",
          approvalReferenceNumber: "1",
          nrAccordingToAppendix1Of4BImSchV: "2",
          nrAccordingToIEDirective: "3",
          nrAccordingToPRTR: "4",
          outdoorPlant: "ja",
          eastValue: "7",
          northValue: "8",
          district: "9",
          corridor: "10",
          parcel: "11",
          partOfBImSchV124plant: "ja",
          mainPlantName: "Anlage1",
          combustionType: { id: "2", shortText: "Gasturbine" },
          power: "12",
          operatingHours: "13",
          operatingLoad: "14",
          emissionControlSystem: {
            YN: "ja",
            names: "Adsorber/Filternde Abgasreinigung",
            codes: "852",
          },
          combustionMode: "ja",
          aggregated: { YN: "ja", count: "22", name: "23", power: "24" },
          fewOperatingHours: { YN: "ja", date: "04.04.2004" },
          emergencyOperations: {
            YN: "ja",
            date: "05.05.2005",
            file: { YN: "ja" },
          },
          fuels: { mixNew: "100" },
          pollutionSource: {
            nr: "qq1",
            id: "",
            name: "qq2",
            eastValue: "12345",
            northValue: "222",
            geometricHeight: "111",
          },
        },
        bol: {
          FormSettings:
            '[{"id":"active_page_number","value":6},{"id":"ModeCheckPage","value":true},{"id":"FileExtensions","value":"pdf"},{"id":"FileMaxSize","value":10},{"id":"StepButtonImage","value":false},{"id":"StepButtonCounter","value":true},{"id":"StepButtonLayout","value":"b"},{"id":"StepButtonPosition","value":"left"},{"id":"useStar4required","value":true},{"id":"usablePages","value":[true,true,true,true,true,true,true]},{"id":"checkedPages","value":[true,true,true,true,true,false,false]},{"id":"NavigatorString","value":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0"},{"id":"TimeStampLoad","value":"20230213132126"},{"id":"TimeStampSend","value":"20230213132236"}]',
          js_Page2: "",
          js_Notbetrieb: "",
          js_fuels: "",
          NoPageCheck: "ja",
        },
        account: {
          id: "4",
          firstName: "Serge David",
          lastName: "Gnabry",
          contactNr: "+49987654323",
          email: "serge@operator.de",
        },
        BImSch_urlPortal: "https://rlp.formular-demo.de/",
        BImSch_urlCatalogs: "https://rlp.formular-demo.de/UserPortal/catalogs/",
        BImSch_urlResolve: "https://rlp.formular-demo.de/UserPortal/resolve/",
        BImSch_urlSubmission: "https://rlp.formular-demo.de/ProcessManager/",
        BImSch_SubmissionType: "2",
        BImSch_TimeStamp: "20230213132236",
        BImSch_ProcessId: "114",
        BImSch_processNr: "BIS23HE_000071_123",
      },
      contactPersons: [
        {
          id: 38,
          firstName: "Max",
          lastName: "Mustermann",
          funktion: "Betreiber",
          phone: "123456",
          email: "max@betreiber.de",
        },
        {
          id: 40,
          firstName: "Jörg",
          lastName: "Jung",
          funktion: "Anlagentester",
          phone: "345678",
          email: "joerg@anlagentester.de",
        },
        {
          id: 50,
          firstName: "fhd",
          lastName: "fgh",
          funktion: "fgh",
          phone: "fd34",
          email: "54qjkfdk@k.de",
        },
        {
          id: 11,
          firstName: "Anna",
          lastName: "Zervakis",
          funktion: "Produktionsleiter",
          phone: "0987654321",
          email: "12345@67890.de",
        },
        {
          id: 2,
          firstName: "Hans",
          lastName: "Wurst",
          funktion: "Abteilungsleiter Technik",
          phone: "49835549352",
          email: "hans.wurst@test.de",
        },
        {
          id: 39,
          firstName: "Sven",
          lastName: "Schneider",
          funktion: "Betriebsstättenchef",
          phone: "234567",
          email: "sven@betriebsstaette.de",
        },
        {
          id: 1,
          firstName: "Thomas",
          lastName: "Muller",
          funktion: "Umweltbeauftragter",
          phone: "049987654321",
          email: "tm@tmag.de",
        },
      ],
    },
  ];
}

function _local_PlantTypes() {
  md_PlantTypes = [
    { id: 1, code: "1", name: "Mittelgroße Feuerungsanlage" },
    { id: 2, code: "2", name: "Tankstelle" },
    { id: 3, code: "3", name: "Krematorium" },
    { id: 4, code: "4", name: "Tanklager" },
  ];
}
function _local_Persons() {
  md_Persons = [
    {
      id: 23456,
      lastname: "Schmidt",
      firstname: "Julia",
      funktion: "Abteilungsleiter Produktion",
      phone: "+49 40 50 27 02",
      email: "Julia.Schmidt@email.com",
    },
    {
      id: 33884,
      lastname: "Mustermann",
      firstname: "Max",
      funktion: "Vorstand",
      phone: "+49 (1234) 5678",
      email: "mustermann@email.com",
    },
    {
      id: 55441,
      lastname: "Müller",
      firstname: "Hans",
      funktion: "Anlagenfahrer",
      phone: "+49 1234-5678",
      email: "",
    },
  ];
}
function _local_Authorities() {
  md_Authorities = [
    {
      id: 1,
      ident: "RP 10",
      shortText: "Struktur- und Genehmigungsdirektion Nord",
    },
    {
      id: 2,
      ident: "RP 12",
      shortText: "Struktur- und Genehmigungsdirektion Süd",
    },
    { id: 3, ident: "BUND", shortText: "weitere Genehmigungsdirektion" },
    { id: 4, ident: "BY 1", shortText: "weiß-blaues Gremium" },
    { id: 11, ident: "HH 1", shortText: "Hansecontrol" },
  ];
}
function _local_Fuels() {
  md_Fuels = [
    { id: 1, code: "1", shortText: "Biobrennstoffe (feste Biomasse)" },
    { id: 2, code: "2", shortText: "Andere feste Brennstoffe" },
    { id: 3, code: "3", shortText: "Gasöl" },
    { id: 4, code: "4", shortText: "Andere flüssige Brennstoffe" },
    { id: 5, code: "5", shortText: "Erdgas" },
    { id: 6, code: "6", shortText: "Andere gasförmige Brennstoffe" },
    { id: 7, code: "7", shortText: "Gasöl (Diesel)" },
    { id: 8, code: "8", shortText: "Gasöl (Heizöl EL)" },
    { id: 9, code: "9", shortText: "Biogas" },
    { id: 10, code: "10", shortText: "Klärgas" },
    { id: 11, code: "11", shortText: "Deponiegas" },
  ];
}
function _local_FederalStates() {
  md_FederalStates = [
    { code: "BW", name: "Baden-Württemberg" },
    { code: "BY", name: "Bayern" },
    { code: "BE", name: "Berlin" },
    { code: "BB", name: "Brandenburg" },
    { code: "HB", name: "Bremen" },
    { code: "HH", name: "Hamburg" },
    { code: "HE", name: "Hessen" },
    { code: "MV", name: "Mecklenburg-Vorpommern" },
    { code: "NI", name: "Niedersachsen" },
    { code: "NRW", name: "Nordrhein-Westfalen" },
    { code: "RP", name: "Rheinland-Pfalz" },
    { code: "SL", name: "Saarland" },
    { code: "SN", name: "Sachsen" },
    { code: "ST", name: "Sachsen-Anhalt" },
    { code: "SH", name: "Schleswig-Holstein" },
    { code: "TH", name: "Thüringen" },
  ];
}
function _local_NACE() {
  md_NACE = [
    {
      id: 0,
      code: "24540",
      shortText: "Buntmetallgießereien",
      longText: "Buntmetallgießereien",
    },
    { id: 0, code: "25110", shortText: "Herstellung von Metallkonstruktionen" },
    {
      id: 0,
      code: "25120",
      shortText: "Herstellung von Ausbauelementen aus Metall",
    },
    {
      id: 0,
      code: "25210",
      shortText:
        "Herstellung von Heizkörpern und -kesseln für Zentralheizungen",
    },
    {
      id: 0,
      code: "25290",
      shortText:
        "Herstellung von Sammelbehältern, Tanks u. ä. Behältern aus Metall",
    },
    {
      id: 0,
      code: "25300",
      shortText: "Herstellung von Dampfkesseln (ohne Zentralheizungskessel)",
    },
    { id: 0, code: "25400", shortText: "Herstellung von Waffen und Munition" },
    {
      id: 0,
      code: "25500",
      shortText:
        "Herstellung von Schmiede-, Press-, Zieh- und Stanzteilen, gewalzten Ringen und pulvermetallurgischen Erzeugnissen",
    },
    {
      id: 0,
      code: "25501",
      shortText: "Herstellung von Freiformschmiedestücken",
    },
    { id: 0, code: "25502", shortText: "Herstellung von Gesenkschmiedeteilen" },
    { id: 0, code: "25503", shortText: "Herstellung von Kaltfließpressteilen" },
    {
      id: 0,
      code: "26119",
      shortText: "Herstellung von sonstigen elektronischen Bauelementen",
    },
    {
      id: 0,
      code: "26120",
      shortText: "Herstellung von bestückten Leiterplatten",
    },
    {
      id: 0,
      code: "26200",
      shortText:
        "Herstellung von Datenverarbeitungsgeräten und peripheren Geräten",
    },
    {
      id: 0,
      code: "26510",
      shortText:
        "Herstellung von Mess-, Kontroll-, Navigations- u. ä. Instrumenten und Vorrichtungen",
    },
  ];
}
function _local_EmissionControlSystems() {
  md_EmissionControlSystems = [
    { id: 1, ident: "12", shortText: "Absetzkammer (z.B. Staubsack)" },
    { id: 2, ident: "500", shortText: "Adsorber" },
    { id: 3, ident: "856", shortText: "Adsorber/Elektrische Abgasreinigung" },
    { id: 4, ident: "852", shortText: "Adsorber/Filternde Abgasreinigung" },
    { id: 5, ident: "853", shortText: "Adsorber/Flüssigkeitsabgasreinigung" },
    { id: 6, ident: "854", shortText: "Adsorber/Kondensationsabscheidung" },
    {
      id: 7,
      ident: "851",
      shortText: "Adsorber/Mechanische Flüss.- Abscheidung",
    },
    {
      id: 8,
      ident: "850",
      shortText: "Adsorber/Mechanische Trockenabscheidung",
    },
    {
      id: 0,
      ident: "857",
      shortText: "Adsorber/Oxidations-, Reduktionsverfahren",
    },
    { id: 0, ident: "511", shortText: "Aktivkoks(Kohle)-Festbett-Adsorber" },
    { id: 0, ident: "32", shortText: "Axial-Zyklon" },
    { id: 0, ident: "314", shortText: "Besprühen mit Wasser" },
    { id: 0, ident: "752", shortText: "Biofilter (Etagenfilter)" },
    { id: 0, ident: "751", shortText: "Biofilter (Flächenfilter)" },
    {
      id: 0,
      ident: "753",
      shortText: "Biofilter Landwirtschaft (Abscheidegrad Staub 80%)",
    },
    { id: 0, ident: "750", shortText: "Biologische Verfahren" },
    { id: 0, ident: "760", shortText: "Biowäscher" },
  ];
}
function _local_CombustionPlantTypes() {
  md_CombustionPlantTypes = [
    { id: 1, ident: "1", shortText: "Dieselmotor" },
    { id: 2, ident: "2", shortText: "Gasturbine" },
    { id: 3, ident: "3", shortText: "Zweistoffmotor" },
    { id: 4, ident: "4", shortText: "Sonstiger Motor" },
    { id: 5, ident: "5", shortText: "Sonstige Feuerungsanlage" },
  ];
}

//Export all functions and variables so that they can be used elsewhere
export {
  _local_CombustionPlantTypes,
  _local_EmissionControlSystems,
  _local_NACE,
  _local_FederalStates,
  _local_Fuels,
  _local_Authorities,
  _local_Persons,
  _local_PlantTypes,
  _local_f44a,
  _local_DataForm,
  svcData_EmissionControlSystems,
  svcData_CombustionPlantTypes,
  svcData_PlantTypes,
  svcData_NACE,
  svcData_Fuels,
  svcData_FederalStates,
  svcData_Authorities,
  svcData_FormData4431,
  GetFormData,
  BImSch_FormMode,
  md_PlantTypes,
  md_FederalStates,
  md_Persons,
  md_CombustionPlantTypes,
  md_EmissionControlSystems,
  md_NACE,
  md_Fuels,
  md_Authorities,
  md_processNr,
  md_UUID,
  md_FormData,
  md_URL_resolver,
  md_URL_portal,
  useLocalData,
};
