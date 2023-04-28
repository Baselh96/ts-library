import { bolGetTimeStamp } from './bolGetTimeStamp';

describe('bolGetTimeStamp', () => {
  const date = new Date();
  const expected =
    date.getFullYear() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');

  it('When the year, month and day match', () => {
    expect(bolGetTimeStamp()).toContain(expected);
    expect(bolGetTimeStamp().substring(0, 8)).toBe(expected);
  });

  it('Wenn das Jahr, Monat und Tag nicht übereinstimmen', () => {
    expect(bolGetTimeStamp()).not.toContain(
      expected.replace('0', '1')
    );
  });
});
