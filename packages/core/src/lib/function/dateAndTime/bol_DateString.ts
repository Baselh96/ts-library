import { bol_CalcDate } from './bol_CalcDate';

/**
 * Formats a date string based on the specified format type.
 * @param SourceDate - The source date to be formatted.
 * @param FormatType - The format type indicating the desired date format.
 * @returns A formatted date string based on the specified format type.
 */
export function bol_DateString(SourceDate: any, FormatType: string): string {
  const wd = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];

  let d = SourceDate ? bol_CalcDate(SourceDate, 0, 0, 0) : new Date();

  if (d == undefined) return '';

  d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  new Date().toLocaleString;

  switch (FormatType) {
    case 'de-ts':
      // Timestamp deutsch, Datum und Uhrzeit mit Sekunden
      return (
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        d.getFullYear() +
        ' ' +
        ('0' + d.getHours()).slice(-2) +
        ':' +
        ('0' + d.getMinutes()).slice(-2) +
        ':' +
        ('0' + d.getSeconds()).slice(-2)
      );
    case 'de-wahlfux':
      // Datum deutsch, lang, Wochentag und 10 Stellen mit Punkttrenner
      return (
        wd[d.getDay()] +
        ', der ' +
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        d.getFullYear()
      );
    case 'de-6':
      // Datum deutsch, kurz, 6 Stellen ohne Trenner
      return (
        ('0' + d.getDate()).slice(-2) +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        ('0' + d.getFullYear()).slice(-2)
      );
    case 'de-8':
      // Datum deutsch, kurz, 8 Stellen mit Punkttrenner
      return (
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        ('0' + d.getFullYear()).slice(-2)
      );
    case 'de-10t':
      // alternativer Timestamp
      return (
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        d.getFullYear() +
        ' ' +
        ('0' + d.getHours()).slice(-2) +
        ':' +
        ('0' + d.getMinutes()).slice(-2)
      );
    case 'de-10':
    default:
      //Datum deutsch, 10 Stellen mit Punkttrenner
      return (
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        d.getFullYear()
      );
  }
}
