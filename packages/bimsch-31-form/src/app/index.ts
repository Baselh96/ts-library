import { loadForm31_1 } from './bimsch-map31';
import { bolFormInit } from '@formular-js/core';

// define settings for this form
const formSettings = [
  { id: 'active_page_number', value: 1 },
  { id: 'ModeCheckPage', value: true },
  { id: 'FileExtensions', value: '.pdf' },
  { id: 'FileMaxSize', value: 10 },
  { id: 'StepButtonLayout', value: 'b' },
  { id: 'useStar4required', value: true },
  { id: 'symbol_fieldinfo', value: 'bi-info-circle-fill' },
  { id: 'symbol_up', value: 'bi-caret-up-fill' },
  { id: 'symbol_down', value: 'bi-caret-down-fill' },
];

// TODO: initialize bol-functions
const form31 = bolFormInit(formSettings);

// especially for this form
loadForm31_1(form31);
// Call OnBrowserIncompatible if necessary and available
