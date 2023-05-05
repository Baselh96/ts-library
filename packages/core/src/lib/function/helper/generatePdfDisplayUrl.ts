/**
 * this methode generate the PDF display URL
 * @returns is the generated PDF display URL
 */
export function generatePdfDisplayUrl(valueTarget: string): string {
  let target4PDF: string;
  const targetURL = valueTarget;

  // Check if the target URL contains "/Process"
  if (targetURL.indexOf('/Process') > -1) {
    // Extract the URL before "/Process" and add "/DisplayPDF?action=getnowpdfa"
    target4PDF =
      targetURL.substring(0, targetURL.indexOf('/Process')) +
      '/DisplayPDF?action=getnowpdfa';
  } else {
    // Use a fallback URL
    target4PDF =
      'https://formular-demo.de/NetGateway/DisplayPDF?action=getnowpdfa';
  }

  return target4PDF;
}
