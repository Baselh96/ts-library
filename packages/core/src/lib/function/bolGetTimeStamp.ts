/**
 * This method formats the current date in the form YYYYMMDDHHmmss
 * @returns date in the format YYYYMMDDHHmmss
 */
export function bolGetTimeStamp(): string {
  let d = new Date();
  return (
    d.getFullYear() +
    (d.getMonth() + 1).toString().padStart(2, '0') +
    d.getDate().toString().padStart(2, '0') +
    d.getHours().toString().padStart(2, '0') +
    d.getMinutes().toString().padStart(2, '0') +
    d.getSeconds().toString().padStart(2, '0')
  );
}
