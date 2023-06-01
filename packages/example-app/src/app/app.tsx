// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getField } from '../../../core/src/lib/function/other-functions/getField';

export function App() {
  useEffect(() => {
    console.log(getField('gender'));
  }, []);

  return (
    <>
      <input id="test"></input>
      <p>Please select your favorite Web language:</p>
      <form>
        <div>
          <input type="radio" value="Male" id="gender" name="gender" /> Male
          <input type="radio" value="Female" id="gender" name="gender" /> Female
          <input type="radio" value="Other" id="gender" name="gender" /> Other
        </div>
      </form>
      {/* <NxWelcome title="example-app" /> */}
    </>
  );
}
