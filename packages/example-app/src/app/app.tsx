import { useEffect } from 'react';
import { bolForm2PDF, bolFormInit } from '@formular-js/core';
import NxWelcome from './nx-welcome';

export function App() {
  useEffect(() => {
    console.log("Hello World");
  }, []);

  return (
    <>
      <NxWelcome title="example-app" />
    </>
  );
}
