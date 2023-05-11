// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import { bolForm2PDF, bolFormInit } from '@formular-js/core';

export function App() {

  useEffect(() => {
    console.log('hello');
    bolFormInit(true);
    
  }, []);

  return (
    <>

      {/* <NxWelcome title="example-app" /> */}
    </>
  );
}
