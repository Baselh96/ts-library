/**
 * The function SplitEformsTitle takes an original string and
 * splits it into three parts: textlabel, texttooltip, and texthelp
 * @param original is the to splited string
 * @returns an object containing textlabel, texttooltip, and texthelp directly
 */
export function SplitEformsTitle(original: string): {
  textlabel: string;
  texttooltip: string;
  texthelp: string;
} {
  let textlabel = '';
  let texttooltip = '';
  let texthelp = '';

  const pt = original.indexOf('#');
  let ph = original.indexOf('@');

  if (ph == -1) ph = original.indexOf('^');

  // Extract texthelp
  if (ph !== -1) {
    if (pt != -1) {
      texthelp =
        ph > pt
          ? original.substring(ph + 1).trim()
          : original.substring(ph + 1, pt).trim();
    } else {
      texthelp = original.substring(ph + 1).trim();
    }
    if (pt == -1 || pt > ph) {
      texttooltip = textlabel = original.substring(0, ph).trim();
    } else {
      textlabel = original.substring(0, pt).trim();
    }
  }

  // Extract texttooltip and textlabel
  if (pt != -1) {
    if (ph != -1) {
      texttooltip =
        pt > ph
          ? original.substring(pt + 1).trim()
          : original.substring(pt + 1, ph).trim();
    } else {
      texttooltip = original.substring(pt + 1).trim();
    }
    textlabel =
      ph == -1 || ph > pt
        ? original.substring(0, pt).trim()
        : original.substring(0, ph).trim();
  }

  // Set textlabel if not extracted
  if (textlabel === '') {
    if (ph > 0) {
      textlabel = original.substring(0, ph).trim();
    } else if (pt > 0) {
      textlabel = original.substring(0, pt).trim();
    } else {
      texttooltip = textlabel = original.trim();
    }
  }

  return { textlabel, texttooltip, texthelp };
}
