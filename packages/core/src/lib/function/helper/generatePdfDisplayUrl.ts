/**
 * this methode generate the PDF display URL
 * @returns is the generated PDF display URL
 */
export function generatePdfDisplayUrl(valueTarget: string): string {
  let target4PDF: string;

  // Check if the target URL contains "/Process"
  if (valueTarget.indexOf('/Process') > -1) {
    // Extract the URL before "/Process" and add "/DisplayPDF?action=getnowpdfa"
    target4PDF =
      valueTarget.substring(0, valueTarget.indexOf('/Process')) +
      '/DisplayPDF?action=getnowpdfa';
  } else {
    // Use a fallback URL
    target4PDF =
      'https://formular-demo.de/NetGateway/DisplayPDF?action=getnowpdfa';
  }

  return target4PDF;
}
