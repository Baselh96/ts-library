import { bolc__Settings } from '../../class/bolc__Settings';
import { InitForm } from '../../class/initForm';
import { bol_GetFieldTitle } from './bol_GetFieldTitle';

describe('bol_GetFieldTitle', () => {
  it('Verification with correct values', () => {
    const input = document.createElement('input');
    input.name = 'testName';
    input.title = 'testNameTitle';

    document.body.appendChild(input);
    
    InitForm.bolSettings = new bolc__Settings([]);

    expect(bol_GetFieldTitle(input)).toEqual('testNameTitle');
  });
});
