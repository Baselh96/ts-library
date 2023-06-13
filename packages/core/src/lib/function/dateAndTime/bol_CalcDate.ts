import { DataClassDate } from '../../class/DataClassDate';

/**
 * This function calculates a new date based on the provided parameters
 * @param SourceDate is the Date object.
 * @param YearsToChange are the years that will be added to the SourceDate
 * @param MonthsToChange are the months that will be added to the SourceDate
 * @param DaysToChange are the days, which will be added to the SourceDate
 * @param FirstDay is the boolean value for setting the day to the first day of the month
 * @returns is the changed date object
 */
export function bol_CalcDate(
  SourceDate: any,
  YearsToChange?: number,
  MonthsToChange?: number,
  DaysToChange?: number,
  FirstDay?: boolean
): Date | undefined {
  if (SourceDate == undefined) return;

  let oDate: Date;

  // Check if SourceDate is already a Date object
  if (typeof SourceDate == 'object') {
    oDate = SourceDate;
  } else {
    const dataClassDate = new DataClassDate();
    // Scan and validate SourceDate using the specified format
    if (dataClassDate.Scan(SourceDate, '%Y2, %M2, %D2') != true) return;
    // Convert DataClassDate to a Date object
    oDate = new Date(dataClassDate.Format('%Y2, %M2, %D2'));
  }

  // Calculate the new day, month, and year values
  const d = FirstDay ? 1 : oDate.getDate() + (DaysToChange ?? 0);
  const m = oDate.getMonth() + (MonthsToChange ?? 0);
  const y = oDate.getFullYear() + (YearsToChange ?? 0);

  const day = (d < 32 || d < 1) ? d : oDate.getDate();
  const month =( m < 13 || m < 1) ? m : oDate.getMonth() + 1;

  // Create and return the new Date object
  return new Date(y, month, day);
}
