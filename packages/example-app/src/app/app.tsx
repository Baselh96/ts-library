// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { multi} from '@formular-js/core';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <div>{multi(10, 10)}</div>
      <NxWelcome title="example-app" />

      <div />
    </>
  );
}

export default App;
