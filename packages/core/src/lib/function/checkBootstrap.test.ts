import { Tooltip } from 'bootstrap';
import { checkBootstrap } from './checkBootstrap';

describe('checkBootstrap', () => {
  it('Verification with correct values', () => {
    const version = Tooltip.VERSION.substr(0, 1);
    expect(checkBootstrap()).toBe(parseInt(version));
  });

  it('Verification with falsified values', () => {
    expect(checkBootstrap()).not.toBe(0);
  });
});
