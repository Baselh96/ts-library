// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { PersonClass, bolc__Settings } from "@formular-js/core";
export function App() {

  useEffect(()=> {
    console.log("hello");
    console.log(new PersonClass("basel").getBootstrapVersion());
  }, [])

  return (
    <>
      <div></div>
      <NxWelcome title="example-app" />
      <div />
    </>
  );
}

