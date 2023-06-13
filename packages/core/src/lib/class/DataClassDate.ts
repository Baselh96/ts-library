/* eslint-disable no-constant-condition */
import { formatNumber } from '../function/helper/formatNumber';

export class DataClassDate {
  // Get current date via internal date class
  private today = new Date();
  private year: number;
  private month: number;
  private day: number;
  private static defaultDateFormat = '%D1.%M1.%Y2';
  private static weekdays = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];

  constructor() {
    // Preset members of class with current date
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1;
    this.day = this.today.getDate();
  }

  /**
   * The method formats the date according to the specified format
   * @param format the desired date format
   * @returns is the date in desired form as string
   */
  public Format(format?: string): string {
    let result =
      !format || format == '' ? DataClassDate.defaultDateFormat : format;

    result = result.replace(/%Y0/, '');
    result = result.replace(/%Y1/, formatNumber(this.year % 100, 2));
    result = result.replace(/%Y2/, this.year.toString());

    result = result.replace(/%M0/, '');
    result = result.replace(/%M1/, this.month.toString());
    result = result.replace(/%M./, formatNumber(this.month, 2));

    result = result.replace(/%D0/, '');
    result = result.replace(/%D1/, this.day.toString());
    result = result.replace(/%D2/, formatNumber(this.day, 2));

    result = result.replace(/%W0/, '');
    result = result.replace(
      /%W1/,
      DataClassDate.weekdays[this.getWeekday()].substr(0, 2)
    );
    result = result.replace(/%W2/, DataClassDate.weekdays[this.getWeekday()]);

    return result;
  }

  /**
   * This methode returns the day of the week of the specified date
   */
  public getWeekday(): number {
    return new Date(this.year, this.month - 1, this.day).getDay();
  }

  /**
   * This method scans the date from a string.
   * The string may have one of the following syntax forms:
   * DDMMYY
   * DDMMYYYY
   * D.M.Y
   * M/D/Y or D/M/Y  (interpretation depends on current culture)
   * YYYY-MM-DD
   */
  public Scan (text: string, format?: string): boolean {
    // Get trimmed input date
    const d = text.trim();

    // Reset components
    let day = '0';
    let month = '0';
    let year = '0';

    // Handle 6 digits
    if (/^\d{6}$/.test(d)) {
      day = d.substring(0, 2);
      month = d.substring(2, 4);
      year = d.substring(4, 6);
    }
    // Handle 8 digits
    else if (/^\d{8}$/.test(d)) {
      day = d.substring(0, 2);
      month = d.substring(2, 4);
      year = d.substring(4, 8);
    }
    // Handle YYYY-MM-DD
    else if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      day = d.substring(8, 10);
      month = d.substring(5, 7);
      year = d.substring(0, 4);
    }
    // Handle d.m.y
    else if (/^\d+\.\d+\.\d+$/.test(d)) {
      const a = d.split('.');
      if (a.length < 3) return false;
      year = a[2];
      month = a[1];
      day = a[0];
    }
    // Handle m/d/y
    else if (/^\d+\/\d+\/\d+$/.test(d)) {
      const a = d.split('/');
      if (a.length < 3) return false;
      year = a[2];
      month = a[0];
      day = a[1];
    }
    // fall back to format string if any
    else if (format && format !== '') {
      while (true) {
        const formatItem = format.match(/%[DMY]\d/);
        const textItem = text.match(/\d+/);
        if (formatItem == null || textItem == null) break;

        format = format.replace(/%[DMY]\d/, '');
        text = text.replace(/\d+/, '');

        switch (formatItem[0].substr(1, 1)) {
          case 'D':
            day = parseInt(textItem[0], 10).toString();
            break;
          case 'M':
            month = parseInt(textItem[0], 10).toString();
            break;
          case 'Y':
            year = parseInt(textItem[0], 10).toString();
            break;
        }
      }
    }

    let nYear = parseInt(year);
    const nMonth = parseInt(month);
    const nDay = parseInt(day);

    // Convert 2-digit-year to year
    nYear = nYear < 30 ? nYear + 2000 : nYear + 1900;

    // Check plausibility
    if (nYear < 1600 || nYear > 2999) return false;
    if (nMonth < 1 || nMonth > 12) return false;
    if (nDay < 1 || nDay > this.monthDays(nMonth, nYear)) return false;

    // Assign the new date to properties
    this.year = nYear;
    this.month = nMonth;
    this.day = nDay;

    return true;
  }

  // Get number of days of a month (1 .. 12)
  private monthDays(month: number, year: number) {
    if (month != 2) {
      const a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return a[month - 1];
    }

    return this.isLeapYear(year) ? 29 : 28;
  }

  // Check if passed year is a leap year
  private isLeapYear(year: number) {
    if (year / 400) return true;
    if (year / 100) return false;
    if (year / 4) return true;
    return false;
  }

  /**
   * Method will be added to class 'DataClassDate'
   * Compares the classes date (year month day) itself with a given reference class.
   * Hour, minute and second are not evaluated.
   *
   * Results -1 if the class is less than the reference class.
   *         0 if the class is equal the reference class.
   *         1 if the class is greater then the reference class.
   */
  public Compare(ref: DataClassDate): number {
    if (this.year < ref.year) return -1;
    if (this.year > ref.year) return 1;
    if (this.month < ref.month) return -1;
    if (this.month > ref.month) return 1;
    if (this.day < ref.day) return -1;
    if (this.day > ref.day) return 1;
    return 0;
  }
}
