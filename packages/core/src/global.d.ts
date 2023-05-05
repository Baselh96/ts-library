import { bolc__Dialog, bolc__Form, bolc__Steps } from './lib/class';
import { bolc__Settings } from './lib/class/bolc-settings';

/*
 * Herewith I define the global variables with namespace,
 * so I can use them in other files
 */
declare global {
  interface Window {
    bolSettings: bolc__Settings;
    bolDialog: bolc__Dialog;
    bolForm: bolc__Form;
    bolPage: any;
    bolSteps: bolc__Steps;
    bolBSK: any;
    bolFormVersion: string;
  }
}