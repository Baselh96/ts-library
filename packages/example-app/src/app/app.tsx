// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { bolc__Settings } from "@formular-js/core";
export function App() {

  useEffect(()=> {
    console.log("hello")
    new bolc__Settings();
  }, [])

  return (
    <>
      <div></div>
      <NxWelcome title="example-app" />
      <div />
    </>
  );
}

