import { bolc__Settings } from '../../class/bolc-settings';
import { bol_GetFieldTitle } from './bol_GetFieldTitle';

describe('bol_GetFieldTitle', () => {
  it('Verification with correct values', () => {
    const input = document.createElement('input');
    input.name = 'testName';
    input.title = 'testNameTitle';

    document.body.appendChild(input);
    
    window.bolSettings = new bolc__Settings();

    expect(bol_GetFieldTitle(input)).toEqual('testNameTitle');
  });
});
