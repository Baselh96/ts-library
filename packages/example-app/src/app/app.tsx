// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { ArrayClass, multi} from '@formular-js/core';
import NxWelcome from './nx-welcome';

export function App() {
  const reverseArray = () => {
    let array = new ArrayClass();
    return array.multi([1,2,4], 3);
  }
  return (
    <>
      <div>{multi(10, 10)}</div>
      <div>{reverseArray()}</div>
      <NxWelcome title="example-app" />

      <div />
    </>
  );
}

export default App;
function reverseArray() {
  throw new Error('Function not implemented.');
}

