// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { bolc__Settings, ConfigString } from '@formular-js/core';

export function App() {
  const config = `[
  {"id": "active_page_number", "value": 1},
  {"id": "ModeCheckPage", "value": true},
  {"id": "FileExtensions", "value": ".pdf"},
  {"id": "FileMaxSize", "value": 10},
  {"id": "StepButtonLayout", "value": "b"},
  {"id": "useStar4required", "value": true},
  {"id": "symbol_fieldinfo", "value": "bi-info-circle-fill"},
  {"id": "symbol_up", "value": "bi-caret-up-fill"},
  {"id": "symbol_down", "value": "bi-caret-down-fill"}	
  ]`;

  const config2 = `[
    ${JSON.stringify(new ConfigString('active_page_number', 1))},
    ${JSON.stringify(new ConfigString('ModeCheckPage', true))}
  ]`;

  useEffect(() => {
    console.log('hello');
    const settings = new bolc__Settings();
  }, []);

  return (
    <>
      <form>
         <textarea
          rows={2}
          id="bol.FormSettings"
          aria-describedby="bol.FormSettings-infield-error"
          style={{ resize: 'none', display: 'none', overflow: 'hidden' }}
          className="form-control"
          title="Einstellungen und Konfigurationsparameter des Formulars als JSON-Object"
          name="bol.FormSettings"
          defaultValue={config2}
        ></textarea>
      </form>
      <NxWelcome title="example-app" />
      <div />
    </>
  );
}
