import { bolc__BSK } from '../../class';
import { InitForm } from '../../class/initForm';

export function bolBSKInit(numFields: number, bol__SKFieldMapping: any, getNthFieldName: (n: number) => string) {
  InitForm.bolBSK = new bolc__BSK(numFields, bol__SKFieldMapping, getNthFieldName);
}
