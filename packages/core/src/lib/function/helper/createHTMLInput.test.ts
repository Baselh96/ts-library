import { ConfigString } from '../../model/config-string.model';
import { createHTMLInput } from './createHTMLInput';

describe('createHTMLInput', () => {
  
  it('Verification with correct values', () => {
    const expectedValue = `[${new ConfigString(
      'active_page_number',
      1
    ).toString()}]`;

    expect(createHTMLInput('testId').value).toBe(expectedValue);
    expect(createHTMLInput('testId').id).toBe('testId');
    expect(createHTMLInput('testId').className).toBe('form-control');
  });

  
  it('Verification with falsified values', () => {
    const expectedValue = `[ ${new ConfigString('test', 1).toString()}]`;
    
    expect(createHTMLInput('testId').value).not.toBe(expectedValue);
    expect(createHTMLInput('testId').id).not.toBe('id');
    expect(createHTMLInput('testId').className).not.toBe('class');
  });
});
