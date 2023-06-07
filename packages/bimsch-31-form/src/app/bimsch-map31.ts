/***************************************************************************************
 * BImSch functions especially for form §1 31. BImSchG
 * @version     1.1, 2023-05
 * @author		bol, werther
 ***************************************************************************************/
import {
  InitForm,
  bolShow,
  bolHide,
  bolHideClear,
  bol_UpdateLabel,
  setText2Label,
  bolc__Page,
  bolc__Dialog,
} from '@formular-js/core';
import { getFormData, svcData_NACE } from './bimsch-data';
import {
  mapTecFields,
  loadList_Authorities,
  populate_Authorities,
  MapAccount,
  MapOperator,
  mapField,
  listGetShortText,
  setSaveData,
} from './bimsch-helper';
import storage from './storage';

// build the inbox list string
const _sInbox = 'Bericht von <operator/name>';

// TODO: Loads data of form
export async function loadForm31_1(form: InitForm) {
  const { bolSettings, bolSteps, bolDialog } = form;
  // hide and show fields in summary
  bolSettings.fieldsNotInSummary = ['bol.NoPageCheck'];
  // TODO: Not defined in class - could be redundant
  // bolSettings.fieldsInSummary = [];

  // switch pagecheck off
  // bolNoPageCheck();
  getField('bol.NoPageCheck').checked = bolSettings.PageCheck;

  // especially for this form
  // breadcrumb buttons definition
  bolSteps.Buttons = [
    {
      lang: 'de',
      page: 1,
      visible: true,
      percent: 10,
      label: 'Angaben zur Auskunft',
    },
    {
      lang: 'de',
      page: 2,
      visible: true,
      percent: 20,
      label: 'Betriebsstätte',
    },
    { lang: 'de', page: 3, visible: true, percent: 30, label: 'Anlage' },
    {
      lang: 'de',
      page: 4,
      visible: true,
      percent: 40,
      label: 'Ansprechpartner',
    },
    {
      lang: 'de',
      page: 5,
      visible: true,
      percent: 50,
      label: 'Emissionsüberwachung',
    },
    {
      lang: 'de',
      page: 6,
      visible: true,
      percent: 60,
      label: 'sonstige Daten/Berichte',
    },
    {
      lang: 'de',
      page: 7,
      visible: true,
      percent: 70,
      label: 'Ereignisse/Störungen',
    },
    { lang: 'de', page: 8, visible: true, percent: 80, label: 'Dateianhänge' },
    { lang: 'de', page: 9, visible: true, percent: 100, label: 'Abschluss' },
  ];
  // ok, show breadcrumb
  bolSteps.Show();

  /*-------------------------------------------------------------------*/
  // get data object from REST service for this form
  const md_FormData = await getFormData(
    bolSettings.TimeStampSave,
    form.bolDialog
  );
  // useSimulation = true;
  // TODO: Get's called twice once inside of getFormData and here???
  // if (useSimulation) _local_DataForm();

  mapTecFields(form.bolDialog); // from bimsch-helper

  // fill required catalogs/comboboxes on form
  const md_Authorities = await loadList_Authorities();
  populate_Authorities('operatingSite.competentAuthority', md_Authorities);

  // TODO: Do we need to fetch here? Since this only fetches and never does anything with the result, dlgNACE seems to be where this list is fetched and populated
  const naceCodes = await svcData_NACE();

  // map field values for each standard block
  MapAccount(md_FormData, bolDialog);
  MapOperator(md_FormData);
  // map base fields for this form
  MapOperatingSite31_1(md_FormData);
  MapPlant31_1(md_FormData);

  // only in the case of a re-openend form, map existing fields
  if (storage.BImSch_FormMode == 'portalOpen') MapData31_1(md_FormData);
}

function MapOperatingSite31_1(md_FormData) {
  let md, s;
  const BImSch_FormMode = storage.BImSch_FormMode;
  if (md_FormData == undefined || md_FormData.length == 0) return;
  if (BImSch_FormMode == 'portalOpen') md = md_FormData.formContent;
  else if (BImSch_FormMode == 'portalNew') md = md_FormData;
  if (md == undefined) return;

  {
    try {
      s = md.operatingSite.id;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.id');
  {
    try {
      s = md.operatingSite.name;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.name');
  {
    try {
      s = md.operatingSite.nr;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.nr');
  {
    try {
      s = md.operatingSite.naceCode.code;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.naceCode.code');
  {
    try {
      s = md.operatingSite.naceCode.shortText;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.naceCode.shortText');

  if (BImSch_FormMode == 'portalNew') {
    try {
      s = md.operatingSite.competentAuthority.ident;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  } else {
    try {
      s = md.operatingSite.competentAuthority;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.competentAuthority');
  {
    try {
      listGetShortText('operatingSite.competentAuthority');
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  {
    try {
      s = md.operatingSite.address.id;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.id');
  {
    try {
      s = md.operatingSite.address.street;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.street');
  {
    try {
      s = md.operatingSite.address.houseNr;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.houseNr');
  {
    try {
      s = md.operatingSite.address.zipCode;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.zipCode');
  {
    try {
      s = md.operatingSite.address.city;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.city');
  {
    try {
      s = md.operatingSite.address.federalState;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.federalState');
  {
    try {
      s = md.operatingSite.address.district;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.address.district');
  {
    try {
      s = md.operatingSite.building;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'operatingSite.building');
  {
    try {
      listGetShortText('operatingSite.address.federalState');
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  if (BImSch_FormMode == 'portalOpen') {
    {
      try {
        s = md.operatingSite.address.YN;
        // eslint-disable-next-line no-empty
      } catch (err) {}
    }
    mapField(s, 'operatingSite.address.YN');
  }
  bolHideClear('operatingSite.address.YN', 'zone.operatingSite.address', 'ja');
}
function MapPlant31_1(md_FormData) {
  let md, s;
  const BImSch_FormMode = storage.BImSch_FormMode;
  if (md_FormData == undefined || md_FormData.length == 0) return;
  if (BImSch_FormMode == 'portalOpen') md = md_FormData.formContent.plant;
  else if (BImSch_FormMode == 'portalNew') md = md_FormData.plants[0];
  if (md == undefined) return;

  {
    try {
      s = md.id;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.id');
  {
    try {
      s = md.name;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.name');
  {
    try {
      s = md.nr;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.nr');

  {
    try {
      s = md.approvalReferenceNumber;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.approvalReferenceNumber');
  {
    try {
      s = md.nrAccordingToAppendix1Of4BImSchV;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.nrAccordingToAppendix1Of4BImSchV');
  {
    try {
      s = md.nrAccordingToIEDirective;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.nrAccordingToIEDirective');
  {
    try {
      s = md.nrAccordingToPRTR;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.nrAccordingToPRTR');
  {
    try {
      s = md.registryCode;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.registryCode');
  {
    try {
      s = md.referenceIE;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.referenceIE');

  {
    try {
      s = md.eastValue;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.eastValue');
  {
    try {
      s = md.northValue;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.northValue');
  {
    try {
      s = md.district;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.district');
  {
    try {
      s = md.corridor;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.corridor');
  {
    try {
      s = md.parcel;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  mapField(s, 'plant.parcel');
  {
    try {
      s = md.outdoorPlant;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  if (s != undefined && (s == 'ja' || s == true))
    mapField('ja', 'plant.outdoorPlant');
  else mapField('nein', 'plant.outdoorPlant');
  Show_outdoorPlant();
}
function Show_outdoorPlant() {
  if (getField('plant.outdoorPlant').value == 'ja')
    bolShow('zone.outdoorPlant');
  else bolHideClear('zone.outdoorPlant');
}

// map data for Form § 1 der 31. BImSchG - Jaehrliche Auskunft
async function MapData31_1(md_FormData) {
  let s;
  if (md_FormData == undefined || md_FormData.length == 0) return;
  const md = md_FormData.formContent;
  if (md == undefined) return;

  {
    try {
      s = md.Formular.Datenschutz;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'Formular.Datenschutz');
  {
    try {
      s = md.Formular.Datenspeicherung;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'Formular.Datenspeicherung');
  setSaveData();
  {
    try {
      s = md.Formular.Bemerkung;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'Formular.Bemerkung');
  {
    try {
      s = md.report.year;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'report.year');

  for (let i = 1; i < 6; i++) {
    {
      try {
        s = md.report['contactPerson' + i]['title'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.title');
    {
      try {
        s = md.report['contactPerson' + i]['firstName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.firstName');
    {
      try {
        s = md.report['contactPerson' + i]['lastName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.lastName');
    {
      try {
        s = md.report['contactPerson' + i]['funktion'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.funktion');
    {
      try {
        s = md.report['contactPerson' + i]['phone'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.phone');
    {
      try {
        s = md.report['contactPerson' + i]['email'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'report.contactPerson' + i + '.email');
    if (getField('report.contactPerson' + i + '.lastName').value != '')
      bolShow('zone.report.contactPerson' + i);
    else bolHideClear('zone.report.contactPerson' + i);
  }
  {
    try {
      s = md.report.contactPerson.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'report.contactPerson.YN');

  for (let i = 0; i < fields_measurement.length; i++) {
    {
      try {
        s = md.measurement[fields_measurement[i]]['partName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'measurement.' + fields_measurement[i] + '.partName');
    {
      try {
        s = md.measurement[fields_measurement[i]]['fileCount'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'measurement.' + fields_measurement[i] + '.fileCount');
    {
      try {
        s = md.measurement[fields_measurement[i]]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'measurement.' + fields_measurement[i] + '.comment');
    {
      try {
        s = md.measurement[fields_measurement[i]]['YN'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'measurement.' + fields_measurement[i] + '.YN');
  }
  for (let i = 1; i < 11; i++) {
    {
      try {
        s = md.measurement['file' + i]['title'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'measurement.file' + i + '.title');
  }
  {
    try {
      s = md.measurement.files.fileCount;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.files.fileCount');

  {
    try {
      s = md.measurement.fulfillRequirements.date;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.date');
  {
    try {
      s = md.measurement.fulfillRequirements.referenceNo;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.referenceNo');
  {
    try {
      s = md.measurement.fulfillRequirements.material;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.material');
  {
    try {
      s = md.measurement.fulfillRequirements.valueMax;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.valueMax');
  {
    try {
      s = md.measurement.fulfillRequirements.valueMeasure;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.valueMeasure');
  {
    try {
      s = md.measurement.fulfillRequirements.valueAir;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.valueAir');
  {
    try {
      s = md.measurement.fulfillRequirements.BVTleaflet;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.BVTleaflet');
  {
    try {
      s = md.measurement.fulfillRequirements.BVTfrom;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.BVTfrom');
  {
    try {
      s = md.measurement.fulfillRequirements.BVTto;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.BVTto');
  {
    try {
      s = md.measurement.fulfillRequirements.comment;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.comment');

  {
    try {
      s = md.measurement.emissionLimit.date;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.date');
  {
    try {
      s = md.measurement.emissionLimit.referenceNo;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.referenceNo');
  {
    try {
      s = md.measurement.emissionLimit.material;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.material');
  {
    try {
      s = md.measurement.emissionLimit.valueMax;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.valueMax');
  {
    try {
      s = md.measurement.emissionLimit.valueMeasure;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.valueMeasure');
  {
    try {
      s = md.measurement.emissionLimit.valueAir;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.valueAir');
  {
    try {
      s = md.measurement.emissionLimit.BVTleaflet;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.BVTleaflet');
  {
    try {
      s = md.measurement.emissionLimit.BVTfrom;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.BVTfrom');
  {
    try {
      s = md.measurement.emissionLimit.BVTto;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.BVTto');
  {
    try {
      s = md.measurement.emissionLimit.comment;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.comment');
  {
    try {
      s = md.measurement.emissionLimit.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.emissionLimit.YN');

  Form31Page_measurement();

  for (let i = 0; i < fields_maintenance.length; i++) {
    {
      try {
        s = md.maintenance[fields_maintenance[i]]['partName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'maintenance.' + fields_maintenance[i] + '.partName');
    {
      try {
        s = md.maintenance[fields_maintenance[i]]['fileCount'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'maintenance.' + fields_maintenance[i] + '.fileCount');
    {
      try {
        s = md.maintenance[fields_maintenance[i]]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'maintenance.' + fields_maintenance[i] + '.comment');
    {
      try {
        s = md.maintenance[fields_maintenance[i]]['YN'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'maintenance.' + fields_maintenance[i] + '.YN');
  }
  Form31Page_maintenance();

  for (let i = 0; i < fields_selfControl.length; i++) {
    {
      try {
        s = md.selfControl[fields_selfControl[i]]['partName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'selfControl.' + fields_selfControl[i] + '.partName');
    {
      try {
        s = md.selfControl[fields_selfControl[i]]['fileCount'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'selfControl.' + fields_selfControl[i] + '.fileCount');
    {
      try {
        s = md.selfControl[fields_selfControl[i]]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'selfControl.' + fields_selfControl[i] + '.comment');
    {
      try {
        s = md.selfControl[fields_selfControl[i]]['YN'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'selfControl.' + fields_selfControl[i] + '.YN');
  }
  Form31Page_selfControl();

  for (let i = 0; i < fields_cycleWaste.length; i++) {
    {
      try {
        s = md.cycleWaste[fields_cycleWaste[i]]['partName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'cycleWaste.' + fields_cycleWaste[i] + '.partName');
    {
      try {
        s = md.cycleWaste[fields_cycleWaste[i]]['fileCount'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'cycleWaste.' + fields_cycleWaste[i] + '.fileCount');
    {
      try {
        s = md.cycleWaste[fields_cycleWaste[i]]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'cycleWaste.' + fields_cycleWaste[i] + '.comment');
    {
      try {
        s = md.cycleWaste[fields_cycleWaste[i]]['YN'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'cycleWaste.' + fields_cycleWaste[i] + '.YN');
  }
  Form31Page_cycleWaste();

  for (let i = 0; i < fields_other.length; i++) {
    {
      try {
        s = md.other[fields_other[i]]['partName'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'other.' + fields_other[i] + '.partName');
    {
      try {
        s = md.other[fields_other[i]]['fileCount'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'other.' + fields_other[i] + '.fileCount');
    {
      try {
        s = md.other[fields_other[i]]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'other.' + fields_other[i] + '.comment');
    {
      try {
        s = md.other[fields_other[i]]['YN'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'other.' + fields_other[i] + '.YN');
  }
  for (let i = 1; i < 11; i++) {
    {
      try {
        s = md.other['file' + i]['title'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'other.file' + i + '.title');
  }
  {
    try {
      s = md.other.files.fileCount;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'other.files.fileCount');
  Form31Page_other();

  {
    try {
      s = md.measurement.fulfillRequirements.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.YN');
  {
    try {
      s = md.measurement.fulfillRequirements.comment;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'measurement.fulfillRequirements.comment');

  for (let i = 1; i < 6; i++) {
    {
      try {
        s = md.events['event' + i]['comment'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'events.event' + i + '.comment');
    {
      try {
        s = md.events['event' + i]['cause'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'events.event' + i + '.cause');
    {
      try {
        s = md.events['event' + i]['timeframe'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'events.event' + i + '.timeframe');
    {
      try {
        s = md.events['event' + i]['action'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'events.event' + i + '.action');
    {
      try {
        s = md.events['event' + i]['complaint'];
      } catch (err) {
        s = '';
      }
    }
    mapField(s, 'events.event' + i + '.complaint');
    if (getField('events.event' + i + '.comment').value != '')
      bolShow('zone.events.event' + i);
    else bolHideClear('zone.events.event' + i);
  }
  {
    try {
      s = md.events.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.YN');

  {
    try {
      s = md.events.deviation.date;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.date');
  {
    try {
      s = md.events.deviation.nr;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.nr');
  {
    try {
      s = md.events.deviation.justification;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.justification');
  {
    try {
      s = md.events.deviation.info.date;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.info.date');
  {
    try {
      s = md.events.deviation.info.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.info.YN');
  {
    try {
      s = md.events.deviation.YN;
    } catch (err) {
      s = '';
    }
  }
  mapField(s, 'events.deviation.YN');
  Form31Page_events();
}

function UpdateHiddenFormFields() {
  let s = '';
  {
    try {
      s = getField('plant.name').value;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  if (s != undefined && s != '') getField('fgMetaData.plantName').value = s;
  else getField('fgMetaData.plantName').value = '';
  s = '';
  {
    try {
      s = getField('operatingSite.competentAuthority_shortText').value;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  if (s != undefined && s != '') getField('fgMetaData.authorityName').value = s;
  else getField('fgMetaData.authorityName').value = '';
  s = '';
  {
    try {
      s = getField('operatingSite.address.YN').value;
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  if (s == 'ja') {
    getField('fgMetaData.street').value = getField(
      'operatingSite.address.street'
    ).value;
    getField('fgMetaData.houseNr').value = getField(
      'operatingSite.address.houseNr'
    ).value;
    getField('fgMetaData.zipCode').value = getField(
      'operatingSite.address.zipCode'
    ).value;
    getField('fgMetaData.city').value = getField(
      'operatingSite.address.city'
    ).value;
  } else {
    getField('fgMetaData.street').value = getField(
      'operator.address.street'
    ).value;
    getField('fgMetaData.houseNr').value = getField(
      'operator.address.houseNr'
    ).value;
    getField('fgMetaData.zipCode').value = getField(
      'operator.address.zipCode'
    ).value;
    getField('fgMetaData.city').value = getField('operator.address.city').value;
  }
}

/*------------------------------------------------------------------------------------*/
/*
 * map fields for a specific form
 *
 ***************************************************************************************/
const fields_measurement = [
  'discontinuous',
  'continuous',
  'calibration',
  'BImSchV13',
  'BImSchV17',
  'BImSchV31',
  'massBalance',
  'exhaustClearing',
  'operatingHours',
];
const fields_maintenance = ['book', 'testProtocol', 'internal'];
const fields_selfControl = [
  'burner',
  'fuels',
  'temperature',
  'visualInspection',
  'plantData',
];
const fields_cycleWaste = ['BImSchG'];
const fields_other = [
  'ISO14001',
  'otherDoc',
  'education',
  'ISO50001',
  'training',
];

function Form31Page_measurement() {
  for (let i = 0; i < fields_measurement.length; i++) {
    bolHideClear(
      'measurement.' + fields_measurement[i] + '.YN',
      'zone.measurement.' + fields_measurement[i],
      'ja'
    );
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (
      document.getElementById(
        'measurement.' + fields_measurement[i] + '.comment'
      ) as any
    ) /*HTMLTableElement*/.rows = '3';
  }
  const j = parseInt(getField('measurement.files.fileCount').value);
  if (j > 0) {
    bolShow('zone.measurement.files');
    for (let i = 1; i < j + 1; i++) bolShow('measurement.file' + i + '.title');
    for (let i = j + 1; i < 11; i++)
      bolHideClear('measurement.file' + i + '.title');
  } else bolHideClear('zone.measurement.files');
  // TODO: Cannot assign to 'rows' because it is a read-only property
  (
    document.getElementById('measurement.fulfillRequirements.comment') as any
  ).rows = '3';

  if (getField('measurement.files.fileCount').value != '0')
    bolShow('zone.measurement.files');
  else bolHideClear('zone.measurement.files');
  bolHideClear(
    'measurement.emissionLimit.YN',
    'zone.measurement.emissionLimit',
    'ja'
  );
}
function Form31Page_maintenance() {
  for (let i = 0; i < fields_maintenance.length; i++) {
    bolHideClear(
      'maintenance.' + fields_maintenance[i] + '.YN',
      'zone.maintenance.' + fields_maintenance[i],
      'ja'
    );
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (
      document.getElementById(
        'maintenance.' + fields_maintenance[i] + '.comment'
      ) as any
    ).rows = '3';
  }
}
function Form31Page_selfControl() {
  for (let i = 0; i < fields_selfControl.length; i++) {
    bolHideClear(
      'selfControl.' + fields_selfControl[i] + '.YN',
      'zone.selfControl.' + fields_selfControl[i],
      'ja'
    );
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (
      document.getElementById(
        'selfControl.' + fields_selfControl[i] + '.comment'
      ) as any
    ).rows = '3';
  }
}
function Form31Page_cycleWaste() {
  for (let i = 0; i < fields_cycleWaste.length; i++) {
    bolHideClear(
      'cycleWaste.' + fields_cycleWaste[i] + '.YN',
      'zone.cycleWaste.' + fields_cycleWaste[i],
      'ja'
    );
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (
      document.getElementById(
        'cycleWaste.' + fields_cycleWaste[i] + '.comment'
      ) as any
    ).rows = '3';
  }
}
function Form31Page_other() {
  for (let i = 0; i < fields_other.length; i++) {
    bolHideClear(
      'other.' + fields_other[i] + '.YN',
      'zone.other.' + fields_other[i],
      'ja'
    );
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (
      document.getElementById('other.' + fields_other[i] + '.comment') as any
    ).rows = '3';
  }
  const j = parseInt(getField('other.files.fileCount').value);
  if (j > 0) {
    bolShow('zone.other.files');
    for (let i = 1; i < j + 1; i++) bolShow('other.file' + i + '.title');
    for (let i = j + 1; i < 11; i++) bolHideClear('other.file' + i + '.title');
  } else bolHideClear('zone.other.files');
}
function Form31Page_events() {
  for (let i = 1; i < 6; i++) {
    // TODO: Cannot assign to 'rows' because it is a read-only property
    (document.getElementById('events.event' + i + '.comment') as any).rows =
      '3';
    (document.getElementById('events.event' + i + '.cause') as any).rows = '3';
    (document.getElementById('events.event' + i + '.timeframe') as any).rows =
      '3';
    (document.getElementById('events.event' + i + '.action') as any).rows = '3';
    (document.getElementById('events.event' + i + '.complaint') as any).rows =
      '3';
  }
  if (this.getField('events.YN').value == 'ja') {
    bolShow('zone.events.event1');
  } else {
    for (let i = 1; i < 6; i++) bolHideClear('zone.events.event' + i);
  }
  if (getField('events.deviation.YN').value == 'ja')
    bolShow('zone.events.deviation');
  else bolHideClear('zone.events.deviation');
  bolHideClear('events.deviation.info.YN', 'events.deviation.info.date', 'ja');
}

function Form31Page_UploadFields() {
  let fi, fa, fo;

  function FileSingle(gName, fname) {
    if (getField(gName + '.' + fname + '.YN').value == 'ja') {
      const j = parseInt(getField(gName + '.' + fname + '.fileCount').value);
      if (j > 0) {
        bolShow('Anhang_' + gName + '_' + fname + '_1');
        return 1;
      }
    }
    bolHideClear('Anhang_' + gName + '_' + fname + '_1');
    return 0;
  }
  function FileList(gName, fname) {
    if (getField(gName + '.' + fname + '.YN').value == 'ja') {
      const j = parseInt(getField(gName + '.' + fname + '.fileCount').value);
      if (j > 0) {
        for (let i = 1; i < j + 1; i++) {
          bolShow('Anhang_' + gName + '_' + fname + '_' + i);
        }
        for (let i = j + 1; i < 20; i++)
          bolHideClear('Anhang_' + gName + '_' + fname + '_' + i);
        bolShow('zone.Anhang.' + gName + '.' + fname);
        return 1;
      }
    }
    bolHideClear('zone.Anhang.' + gName + '.' + fname);
    return 0;
  }
  function FilePlus(gName) {
    const j = parseInt(getField(gName + '.files.fileCount').value);
    if (j > 0) {
      for (let i = 1; i < j + 1; i++) {
        bol_UpdateLabel(
          'Anhang_' + gName + '_file_' + i,
          'weiteres Dokument (' +
            getField(gName + '.file' + i + '.title').value +
            ') *'
        );
        bolShow('Anhang_' + gName + '_file_' + i);
      }
      for (let i = j + 1; i < 11; i++)
        bolHideClear('Anhang_' + gName + '_file_' + i);
      bolShow('zone.Anhang.' + gName + '.files');
      return 1;
    }
    bolHideClear('zone.Anhang.' + gName + '.files');
    return 0;
  }

  fa = 0;
  for (let i = 0; i < 3; i++)
    fa = fa + FileList('measurement', fields_measurement[i]);

  fi = 0;
  for (let i = 3; i < fields_measurement.length; i++)
    fi = fi + FileSingle('measurement', fields_measurement[i]);
  if (fi > 0) {
    bolShow('zone.Anhang.measurement.other');
    fa = fa + fi;
  } else bolHideClear('zone.Anhang.measurement.other');
  fa = fa + FilePlus('measurement');
  if (fa > 0) bolShow('zone.Anhang.measurement');
  else bolHideClear('zone.Anhang.measurement');

  fo = 0;
  for (let i = 0; i < fields_maintenance.length; i++)
    fo = fo + FileList('maintenance', fields_maintenance[i]);
  for (let i = 0; i < fields_selfControl.length; i++)
    fo = fo + FileList('selfControl', fields_selfControl[i]);
  for (let i = 0; i < fields_cycleWaste.length; i++)
    fo = fo + FileList('cycleWaste', fields_cycleWaste[i]);
  for (let i = 0; i < fields_other.length; i++)
    fo = fo + FileList('other', fields_other[i]);
  fo = fo + FilePlus('other');
  if (fo > 0) bolShow('zone.Anhang.otherStuff');
  else bolHideClear('zone.Anhang.otherStuff');
  fa = fa + fo;
  if (fa > 0) bolShow('zone.Anhaenge');
  else bolHideClear('zone.Anhaenge');
}

/***************************************************************************************************
 * CALLBACK functions from bol-functions.js/bol-globals.js
 * just these functions, which are required for the specific project
 ***************************************************************************************************/
// this function is called after a page in the form is shown
export function bolProject_DoSomethingOnPage(PageNo, bolDialog: bolc__Dialog) {
  setText2Label('bol.txtInfo', 'sidehlp_31_1', bolDialog);
  bolHide('btnSend');
  bolHide('btnPrint');
  bolShow('btnNext');
  bolShow('btnPrev');
  if (getField('fgMetaData.saveData').value == '1') bolShow('btnSave');
  switch (PageNo) {
    case bolc__Page.max:
      bolShow('btnPrint');
      bolShow('btnSend');
      bolHide('btnSave');
      bolHide('btnNext');
      break;
    case bolc__Page.max - 1:
      Form31Page_UploadFields();
      break;
    case 6:
    case 5:
      setText2Label('bol.txtInfo', 'sidehlp_31_1files', bolDialog);
      break;
    case 1:
      setText2Label('bol.txtFormSave', 'sidehlp_save', bolDialog);
      bolHide('btnPrev');
      break;
  }
}
