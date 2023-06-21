import { bolc__Settings } from '../../class/bolc__Settings';
import { bol_GetFieldTitle } from './bol_GetFieldTitle';

describe('bol_GetFieldTitle', () => {
  it('Verification with correct values', () => {
    const input = document.createElement('input');
    input.name = 'testName';
    input.title = 'testNameTitle';

    document.body.appendChild(input);

    expect(bol_GetFieldTitle(new bolc__Settings([]), input)).toEqual('testNameTitle');
  });
});
