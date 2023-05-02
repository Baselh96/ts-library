import { bol_GetObjectType } from './bol_GetObjectType';

describe('bol_GetObjectType', () => {
  it('Verification with correct values', () => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'Date';

    expect(bol_GetObjectType(div)).toEqual('container');
    expect(bol_GetObjectType(input)).toEqual('date');
  });

  it('Verification with falsified values', () => {
    const form = document.createElement('form');

    expect(bol_GetObjectType(undefined)).toBeUndefined();
    expect(bol_GetObjectType(null)).toBeUndefined();
    expect(bol_GetObjectType(form)).toBeNull();
  });
});
