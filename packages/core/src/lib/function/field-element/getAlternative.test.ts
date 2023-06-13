import { getAlternative } from './getAlternative';

describe('getAlternative', () => {
  const FieldNamesAlternative = [
    ['test', 'alternativeTest'],
    ['test1', 'alternativeTest1'],
    ['test2', 'alternativeTest2'],
    ['test3', 'alternativeTest3']
  ];

  it('Verification with correct values', () => {
    expect(getAlternative('test', FieldNamesAlternative)).toEqual('alternativeTest');
    expect(getAlternative('test3', FieldNamesAlternative)).toEqual('alternativeTest3');
  });

  it('Verification with falsified values', () => {
    expect(getAlternative('test4', FieldNamesAlternative)).toEqual('');
  });
});
