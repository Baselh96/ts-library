import { bolc__Settings } from './lib/class/bolc-settings';

/*
 * Herewith I define the global variables with namespace,
 * so I can use them in other files
 */
declare global {
  interface Window {
    bolSettings: bolc__Settings;
    bolDialog: any;
    bolForm: any;
    bolPage: any;
    bolSteps: any;
    bolBSK: any;
    bolFormVersion: string;
  }
}