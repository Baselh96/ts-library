/***************************************************************************************
 * BImSch functions to load data from REST or forms
 * @version     1.0, 2023-04
 * @author		bol, werther
 ***************************************************************************************/
import {
  bolc__Dialog,
  bolURLParameter,
  ConfigStringValue,
  setText2Label,
} from '@formular-js/core';
import { Storage } from './storage';

// let useSimulation = false; // can be set to true in the case of local simulation. _local_DataForm() will be called
let useLocalSave = false; // can be set to true in the case the data can be saved via bol 'lokales Speichern'

/*** URLs to call portal services */
let md_URL_portal = ''; // stores the URL of the portal
let md_URL_resolver = ''; // URL of resolver, loaded by the portal

// let md_FormData = []; // data of the active form in JSON, loaded by the portal
let md_UUID = ''; // stores a given UUID from the URL
let md_processNr = ''; // stores a given processNr from the URL

// objects for catalogs
let md_Authorities = []; // JSON array of authorities
let md_Fuels = []; // JSON array of fuels
let md_NACE = []; // JSON array of NACE values (code, shortText)
let md_EmissionControlSystems = []; // JSON array of emission control systems
let md_CombustionPlantTypes = []; // JSON array of combustion plant types
let md_Persons = []; // JSON array of contact persons, related to a operator
let md_FederalStates = []; // JSON array of federal states of Germany
let md_PlantTypes = []; // JSON array of plant types (not used so far)

// mode, how the form was called
// 0 = local, 1 = new form called by portal, 2 = re-open a existing form from portal, 4 = re-open a form (previously saved locally), 5 = empty form via findform link
const storage = new Storage();
/***************************************************************************************
 * @name		getFormData
 * @summary		gets and load data for a form, defines BImSch_FormMode
 * @returns		nothing
 ***************************************************************************************/
export async function getFormData(
  timeStampSave: ConfigStringValue,
  bolDialog: bolc__Dialog
) {
  let theId = '',
    s;
  // get the base URL for REST services from the form, value should be replaced by 'replacement element'
  md_URL_portal = getField('fgMetaData.urlPortal').value;
  // is UUID part of the URL?
  md_UUID = bolURLParameter('UUID');
  // try to get a processNr from URL, given by the portal
  md_processNr = bolURLParameter('processNr');
  let md_FormData;

  // check for opening the form on local sys (dev/debug)
  if (location.href.indexOf('file://') >= 0) {
    storage.BImSch_FormMode = 'local';
    useLocalSave = false;
  } else {
    useLocalSave = true;
    // ok, call via findform from FS

    if (md_UUID == undefined || md_UUID == '') {
      // no UUID, an empty form is openend via findform link
      // check, if a TimeStampValue exists in bol.FormSettings
      if (timeStampSave != '') {
        // yes, the form is a local saved HTML file (done by bol NetSave)
        storage.BImSch_FormMode = 'localSaved';
      } else {
        // no, so an empty form will be loaded
        storage.BImSch_FormMode = 'findform';
      }
    } else {
      // UUID exists, so the form is opened with a valid URL from the portal
      // 1. try to get data for a already submitted form (re-open)
      md_URL_resolver =
        getField('fgMetaData.urlResolve').value + 'process_data/' + md_UUID;

      md_FormData = await svcData_Form(md_URL_resolver);
      // check, if we have a result and in the result we have a operator ID
      if (md_FormData.length != 0) {
        // yes, JSON object received
        {
          try {
            theId = md_FormData.operator.id;
            // eslint-disable-next-line no-empty
          } catch (err) {}
        }
        // verify that a operator id is part of data
        if (theId != undefined || theId != '')
          storage.BImSch_FormMode = 'portalOpen';
      }
      if (storage.BImSch_FormMode != 'portalOpen') {
        // 2. no result from previous call, now try to open a 'empty' form from portal
        md_URL_resolver =
          getField('fgMetaData.urlResolve').value + 'master_data/' + md_UUID;
        await svcData_Form(md_URL_resolver);
        if (md_FormData.length != 0) storage.BImSch_FormMode = 'portalNew';
      }
    }
  }
  // do we have a processNr? then set field values else remove values
  if (md_processNr != undefined && md_processNr != '') {
    // store processNr in hidden form field
    getField('fgMetaData.processNr').value = md_processNr;
    // build PDF filename based on processNr, store in hidden form field
    getField('fgMetaData.fileName').value = md_processNr;
    {
      try {
        getField('fgMetaData.processId').value = md_FormData.processId;
      } catch (err) {}
    }
  } else {
    // clear hidden fields
    getField('fgMetaData.processNr').value = '';
    getField('fgMetaData.fileName').value = '';
  }
  setText2Label(
    'bol.txtProcessNr',
    getField('fgMetaData.processNr').value,
    bolDialog
  );
  if (location.href.indexOf('sim=1') >= 0) storage.useSimulation = true;
  if (storage.useSimulation) return _local_DataForm();

  // for debugging
  console.log(
    storage.BImSch_FormMode,
    storage.useSimulation,
    md_URL_resolver,
    location.href
  );
  return md_FormData;
}

/***************************************************************************************
 * @name		svcData_Form
 * @summary		try to call REST service and receive data
 * @param		{string}	url	    url to call the service
 * @returns		nothing
 ***************************************************************************************/
async function svcData_Form(url: string) {
  // if already loaded exit
  if (md_FormData.length != 0) return;
  if (url == undefined || url == '') return;
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

/***************************************************************************************
 * @summary		just a bunch of functions to call REST catalogs and fill variables
 * @returns		nothing
 ***************************************************************************************/
async function svcData_Authorities() {
  // if (md_Authorities.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_Authorities();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'authorities';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_Authorities = await response.json();
  }
}
async function svcData_FederalStates() {
  if (md_FederalStates.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_FederalStates();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'federal-states';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_FederalStates = await response.json();
  }
}
async function svcData_Fuels() {
  if (md_Fuels.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_Fuels();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'fuels';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_Fuels = await response.json();
  }
}
async function svcData_NACE() {
  if (md_NACE.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_NACE();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'nace-codes';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_NACE = await response.json();
  }
}
async function svcData_PlantTypes() {
  if (md_PlantTypes.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_PlantTypes();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'plant-types';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_PlantTypes = await response.json();
  }
}
async function svcData_CombustionPlantTypes() {
  if (md_CombustionPlantTypes.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_CombustionPlantTypes();
    return;
  }
  let url = getField('fgMetaData.urlCatalogs').value + 'combustion-plant-types';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_CombustionPlantTypes = await response.json();
  }
}
async function svcData_EmissionControlSystems() {
  if (md_EmissionControlSystems.length != 0) return;
  if (BImSch_FormMode == 'local' || useSimulation) {
    _local_EmissionControlSystems();
    return;
  }
  let url =
    getField('fgMetaData.urlCatalogs').value + 'emission-control-systems';
  let response = await fetch(url, {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    md_EmissionControlSystems = await response.json();
  }
}

/***************************************************************************************
 * @summary		just a bunch of functions to simulate REST catalogs and fill variables for local development
 * @returns		nothing
 ***************************************************************************************/
function _local_DataForm() {
  return {
    account: {
      id: 2,
      firstName: 'Ulrich',
      lastName: 'Fraus',
      email: 'ulrich.fraus@bol-systemhaus.de',
      contactNr: '089 21 09 67 20',
      elsterTest: false,
    },
    operator: {
      id: 2,
      name: 'bol Behörden Online Systemhaus GmbH',
      address: {
        id: 2,
        street: 'Einsteinstr.',
        houseNr: '14',
        zipCode: '85716',
        city: 'Unterschleißheim',
        federalState: 'BW',
        district: 'München',
      },
      contactPerson: {
        id: 2,
        firstName: 'Ulrich',
        lastName: 'Fraus',
        funktion: 'GF',
        phone: '089 21 09 67 20',
        email: 'ulrich.fraus@bol-systemhaus.de',
      },
      elsterTest: false,
    },
    operatingSite: {
      name: 'Test bol',
      nr: '123456',
      naceCode: {
        id: 361,
        code: '37000',
        shortText: 'Abwasserentsorgung',
        longText: '37000 - Abwasserentsorgung',
      },
      building: null,
      address: {
        id: 2,
        street: 'Einsteinstr.',
        houseNr: '14',
        zipCode: '85716',
        city: 'Unterschleißheim',
        federalState: 'BY',
        district: 'München',
      },
      contactPerson: {
        id: 2,
        firstName: 'Ulrich',
        lastName: 'Fraus',
        funktion: 'GF',
        phone: '089 21 09 67 20',
        email: 'ulrich.fraus@bol-systemhaus.de',
      },
      competentAuthority: { id: 2, ident: 'RP 20', shortText: 'SGD Süd' },
      siteAccordingTo12BImSchV: false,
    },
    plants: [
      {
        plantType: '1',
        name: 'Formularschmiede',
        nr: '233',
        address: {
          id: 2,
          street: 'Einsteinstr.',
          houseNr: '14',
          zipCode: '85716',
          city: 'Unterschleißheim',
          federalState: 'BY',
          district: 'München',
        },
        contactPerson: {
          id: 3,
          firstName: 'Dirk',
          lastName: 'Werther',
          funktion: 'Vertrieb',
          phone: '+49 (89) 2109 67-25',
          email: 'dirk.werther@bol-systemhaus.de',
        },
        plantSection: 'Hauptanlage',
        requiresBImSchGApproval: true,
        approvalReferenceNumber: 'AZ1',
        nrAccordingToAppendix1Of4BImSchV: 'AZ2',
        nrAccordingToIEDirective: 'AZ3',
        nrAccordingToPRTR: 'AZ4',
        outdoorPlant: true,
        eastValue: 12345,
        northValue: 5678,
        district: 'ycvxd s',
        corridor: 'cdsfgb',
        parcel: 'cdsafvghbn',
        operationalUnit: 'Schreibtisch',
        commissioningDate: '12.12.2022',
        competentAuthority: { id: 1, ident: 'RP 10', shortText: 'SGD Nord' },
        operatingSiteId: 1,
        pollutionSources: [
          {
            nr: 'SH1',
            name: 'Schornstein 1',
            eastValue: '1234',
            northValue: '567',
            geometricHeight: '43',
          },
        ],
      },
    ],
    contactPersons: [
      {
        id: 2,
        firstName: 'Ulrich',
        lastName: 'Fraus',
        funktion: 'GF',
        phone: '089 21 09 67 20',
        email: 'ulrich.fraus@bol-systemhaus.de',
      },
      {
        id: 3,
        firstName: 'Dirk',
        lastName: 'Werther',
        funktion: 'Vertrieb',
        phone: '+49 (89) 2109 67-25',
        email: 'dirk.werther@bol-systemhaus.de',
      },
    ],
  };
}

function _local_PlantTypes() {
  md_PlantTypes = [
    { id: 1, code: '1', name: 'Mittelgroße Feuerungsanlage' },
    { id: 2, code: '2', name: 'Tankstelle' },
    { id: 3, code: '3', name: 'Krematorium' },
    { id: 4, code: '4', name: 'Tanklager' },
  ];
}
function _local_Persons() {
  md_Persons = [
    {
      id: 23456,
      lastname: 'Schmidt',
      firstname: 'Julia',
      funktion: 'Abteilungsleiter Produktion',
      phone: '+49 40 50 27 02',
      email: 'Julia.Schmidt@email.com',
    },
    {
      id: 33884,
      lastname: 'Mustermann',
      firstname: 'Max',
      funktion: 'Vorstand',
      phone: '+49 (1234) 5678',
      email: 'mustermann@email.com',
    },
    {
      id: 55441,
      lastname: 'Müller',
      firstname: 'Hans',
      funktion: 'Anlagenfahrer',
      phone: '+49 1234-5678',
      email: '',
    },
  ];
}
function _local_Authorities() {
  md_Authorities = [
    {
      id: 1,
      ident: 'RP 10',
      shortText: 'Struktur- und Genehmigungsdirektion Nord',
    },
    {
      id: 2,
      ident: 'RP 12',
      shortText: 'Struktur- und Genehmigungsdirektion Süd',
    },
    { id: 3, ident: 'BUND', shortText: 'weitere Genehmigungsdirektion' },
    { id: 4, ident: 'BY 1', shortText: 'weiß-blaues Gremium' },
    { id: 11, ident: 'HH 1', shortText: 'Hansecontrol' },
  ];
}
function _local_Fuels() {
  md_Fuels = [
    { id: 1, code: '1', shortText: 'Biobrennstoffe (feste Biomasse)' },
    { id: 2, code: '2', shortText: 'Andere feste Brennstoffe' },
    { id: 3, code: '3', shortText: 'Gasöl' },
    { id: 4, code: '4', shortText: 'Andere flüssige Brennstoffe' },
    { id: 5, code: '5', shortText: 'Erdgas' },
    { id: 6, code: '6', shortText: 'Andere gasförmige Brennstoffe' },
    { id: 7, code: '7', shortText: 'Gasöl (Diesel)' },
    { id: 8, code: '8', shortText: 'Gasöl (Heizöl EL)' },
    { id: 9, code: '9', shortText: 'Biogas' },
    { id: 10, code: '10', shortText: 'Klärgas' },
    { id: 11, code: '11', shortText: 'Deponiegas' },
  ];
}
function _local_FederalStates() {
  md_FederalStates = [
    { code: 'BW', name: 'Baden-Württemberg' },
    { code: 'BY', name: 'Bayern' },
    { code: 'BE', name: 'Berlin' },
    { code: 'BB', name: 'Brandenburg' },
    { code: 'HB', name: 'Bremen' },
    { code: 'HH', name: 'Hamburg' },
    { code: 'HE', name: 'Hessen' },
    { code: 'MV', name: 'Mecklenburg-Vorpommern' },
    { code: 'NI', name: 'Niedersachsen' },
    { code: 'NRW', name: 'Nordrhein-Westfalen' },
    { code: 'RP', name: 'Rheinland-Pfalz' },
    { code: 'SL', name: 'Saarland' },
    { code: 'SN', name: 'Sachsen' },
    { code: 'ST', name: 'Sachsen-Anhalt' },
    { code: 'SH', name: 'Schleswig-Holstein' },
    { code: 'TH', name: 'Thüringen' },
  ];
}
function _local_NACE() {
  md_NACE = [
    {
      id: 0,
      code: '24540',
      shortText: 'Buntmetallgießereien',
      longText: 'Buntmetallgießereien',
    },
    { id: 0, code: '25110', shortText: 'Herstellung von Metallkonstruktionen' },
    {
      id: 0,
      code: '25120',
      shortText: 'Herstellung von Ausbauelementen aus Metall',
    },
    {
      id: 0,
      code: '25210',
      shortText:
        'Herstellung von Heizkörpern und -kesseln für Zentralheizungen',
    },
    {
      id: 0,
      code: '25290',
      shortText:
        'Herstellung von Sammelbehältern, Tanks u. ä. Behältern aus Metall',
    },
    {
      id: 0,
      code: '25300',
      shortText: 'Herstellung von Dampfkesseln (ohne Zentralheizungskessel)',
    },
    { id: 0, code: '25400', shortText: 'Herstellung von Waffen und Munition' },
    {
      id: 0,
      code: '25500',
      shortText:
        'Herstellung von Schmiede-, Press-, Zieh- und Stanzteilen, gewalzten Ringen und pulvermetallurgischen Erzeugnissen',
    },
    {
      id: 0,
      code: '25501',
      shortText: 'Herstellung von Freiformschmiedestücken',
    },
    { id: 0, code: '25502', shortText: 'Herstellung von Gesenkschmiedeteilen' },
    { id: 0, code: '25503', shortText: 'Herstellung von Kaltfließpressteilen' },
    {
      id: 0,
      code: '26119',
      shortText: 'Herstellung von sonstigen elektronischen Bauelementen',
    },
    {
      id: 0,
      code: '26120',
      shortText: 'Herstellung von bestückten Leiterplatten',
    },
    {
      id: 0,
      code: '26200',
      shortText:
        'Herstellung von Datenverarbeitungsgeräten und peripheren Geräten',
    },
    {
      id: 0,
      code: '05110',
      shortText: 'xb fgnfgmg mfg Herstellung von Metallkonstruktionen',
    },
    {
      id: 0,
      code: '26510',
      shortText:
        'Herstellung von Mess-, Kontroll-, Navigations- u. ä. Instrumenten und Vorrichtungen',
    },
  ];
}
function _local_EmissionControlSystems() {
  md_EmissionControlSystems = [
    { id: 1, ident: '12', shortText: 'Absetzkammer (z.B. Staubsack)' },
    { id: 2, ident: '500', shortText: 'Adsorber' },
    { id: 3, ident: '856', shortText: 'Adsorber/Elektrische Abgasreinigung' },
    { id: 4, ident: '852', shortText: 'Adsorber/Filternde Abgasreinigung' },
    { id: 5, ident: '853', shortText: 'Adsorber/Flüssigkeitsabgasreinigung' },
    { id: 6, ident: '854', shortText: 'Adsorber/Kondensationsabscheidung' },
    {
      id: 7,
      ident: '851',
      shortText: 'Adsorber/Mechanische Flüss.- Abscheidung',
    },
    {
      id: 8,
      ident: '850',
      shortText: 'Adsorber/Mechanische Trockenabscheidung',
    },
    {
      id: 0,
      ident: '857',
      shortText: 'Adsorber/Oxidations-, Reduktionsverfahren',
    },
    { id: 0, ident: '511', shortText: 'Aktivkoks(Kohle)-Festbett-Adsorber' },
    { id: 0, ident: '32', shortText: 'Axial-Zyklon' },
    { id: 0, ident: '314', shortText: 'Besprühen mit Wasser' },
    { id: 0, ident: '752', shortText: 'Biofilter (Etagenfilter)' },
    { id: 0, ident: '751', shortText: 'Biofilter (Flächenfilter)' },
    {
      id: 0,
      ident: '753',
      shortText: 'Biofilter Landwirtschaft (Abscheidegrad Staub 80%)',
    },
    { id: 0, ident: '750', shortText: 'Biologische Verfahren' },
    { id: 0, ident: '760', shortText: 'Biowäscher' },
  ];
}
function _local_CombustionPlantTypes() {
  md_CombustionPlantTypes = [
    { id: 1, ident: '1', shortText: 'Dieselmotor' },
    { id: 2, ident: '2', shortText: 'Gasturbine' },
    { id: 3, ident: '3', shortText: 'Zweistoffmotor' },
    { id: 4, ident: '4', shortText: 'Sonstiger Motor' },
    { id: 5, ident: '5', shortText: 'Sonstige Feuerungsanlage' },
  ];
}
