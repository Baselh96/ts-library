import { getCssVariable } from './getCssVariable';

describe('createHTMLInput', () => {
  it('Testing a Css variable that does not exist', () => {    
    expect(getCssVariable('--test-var', '--test')).toBe('--test');
    expect(getCssVariable('--test-var', '--test')).not.toBe('--test-var');
  });
});
