import { useEffect } from 'react';
import { bolForm2PDF, bolFormInit } from '@formular-js/core';

export function App() {
  useEffect(() => {
    bolFormInit(false);
    bolForm2PDF();
  }, []);

  return (
    <>
      {/* <NxWelcome title="example-app" /> */}
    </>
  );
}
