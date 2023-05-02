import { bol_Field } from './bol_Field';

describe('bol_Field', () => {
  it('Verification with correct values', () => {
    const div = document.createElement('div');
    div.id = 'testId';

    const input = document.createElement('input');
    input.name = 'testName';

    document.body.appendChild(div);
    document.body.appendChild(input);

    expect(bol_Field('testId')?.id).toEqual('testId');
    expect(bol_Field('testName').name).toEqual('testName');
  });

  it('Verification with falsified values', () => {
    expect(bol_Field('testId2')?.id).toBeUndefined();
  });
});
