import { getCssVariable } from '../function/helper/getCssVariable';

/**
 * this mehtode generates the bol logo and returns it
 * @returns is the generated logo as string
 */
export function getBol__logo(): string {
  // call the function to get the value of css-variable '--bol-bar-fg'
  let colfg: string = getCssVariable('--bol-bar-fg', '');

  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg width="30px" height="30px" viewBox="0 0 542 509" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:2;" id="svg44" sodipodi:docname="bol-logo.svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">' +
    '<defs id="defs48"></defs><sodipodi:namedview id="namedview46" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" showgrid="false" /><g>' +
    '<rect x="375.82635" y="10.090681" width="16.984541" height="258.2421"  style="clip-rule:evenodd;fill:' +
    colfg +
    ';fill-rule:nonzero;stroke-width:4.0289;stroke-miterlimit:2" />' +
    '<ellipse cx="290.06082" cy="204.9071" rx="59.615677" ry="59.807922"    style="clip-rule:evenodd;fill:none;fill-rule:evenodd;stroke:' +
    colfg +
    ';stroke-width:14.7777;stroke-miterlimit:2;stroke-dasharray:none;stroke-opacity:1" />' +
    '<rect x="70.294197" y="10.832104" width="16.984541" height="258.2421"  style="clip-rule:evenodd;fill:' +
    colfg +
    ';fill-rule:nonzero;stroke:none;stroke-width:4.0289;stroke-miterlimit:2;stroke-opacity:1" />' +
    '<ellipse cx="139.46097" cy="209.25656" rx="59.615677" ry="59.807922"   style="clip-rule:evenodd;fill:none;fill-rule:evenodd;stroke:' +
    colfg +
    ';stroke-width:14.7777;stroke-miterlimit:2;stroke-dasharray:none;stroke-opacity:1" />' +
    '<rect x="419.08875" y="295.46732" width="66.611778" height="16.065193" style="clip-rule:evenodd;fill:' +
    colfg +
    ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
    '<rect x="375.86157" y="338.65915" width="16.065193" height="66.611778" style="clip-rule:evenodd;fill:' +
    colfg +
    ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
    '<rect x="10.464635" y="295.47906" width="338.23895" height="16.065193" style="clip-rule:evenodd;fill:' +
    colfg +
    ';fill-rule:nonzero;stroke-width:3.91834;stroke-miterlimit:2" />' +
    '</g><text xml:space="preserve" style="font-style:normal;font-stretch:normal;font-size:56px;line-height:1.25;font-family:\'Times New Roman\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:' +
    colfg +
    ';fill-opacity:1;stroke:none" x="5.9804988" y="454.479" id="text4634"><tspan sodipodi:role="line" id="tspan4632" x="5.9804988" y="454.479">S Y S T E M H A U S</tspan></text></svg>'
  );
}
