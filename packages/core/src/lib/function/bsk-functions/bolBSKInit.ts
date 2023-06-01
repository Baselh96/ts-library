import { bolc__BSK } from '../../class';
import { InitForm } from '../../class/initForm';

export function bolBSKInit(bol__SKFieldMapping: any, getNthFieldName: (n: number) => string) {
  InitForm.bolBSK = new bolc__BSK(bol__SKFieldMapping, getNthFieldName);
}
