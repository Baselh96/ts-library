import { InitForm } from '../../class';

export function bolBSKRun(initform: InitForm, URLpart: string, numFields?: number) {
  initform.bolBSK?.Run(URLpart, numFields);
}
