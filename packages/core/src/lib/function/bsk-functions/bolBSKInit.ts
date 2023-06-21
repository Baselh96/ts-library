import { bolc__BSK } from '../../class/bolc__BSK';
import { InitForm } from '../../class/initForm';

export function bolBSKInit(
  initForm: InitForm,
  bol__SKFieldMapping: any,
  getNthFieldName: (n: number) => string
) {
  initForm.bolBSK = new bolc__BSK(initForm.bolPage, bol__SKFieldMapping, getNthFieldName);
}
