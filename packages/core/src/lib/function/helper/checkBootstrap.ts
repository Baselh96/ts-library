import { Tooltip } from 'bootstrap';

/**
 * this method checks if bootstrap is used and if so then which bootstrap version.
 * Consequently the variable bootstrapVersion is set.
 */
export function checkBootstrap(): number {
  try {
    const bsv = Tooltip.VERSION.substr(0, 1);
    return parseInt(bsv);
  } catch (error) {
    return 0;
  }
}
