import { MsgString } from '../../model/msg-string.model';

/**
 * this method searches in the MsgStrings list for a message with id "key"
 * and returns its content
 * @param key is the searched MsgId
 * @param MsgStrings is a list of MsgString
 * @param formLanguage is a list of language of form
 * @param msgRegplace1 is the first placeholder
 * @param msgRegplace2 is the second placeholder
 * @returns MessageContent of found Message
 */
export function msgStringHelper(
  key: string,
  MsgStrings: MsgString[],
  formLanguage: string,
  msgRegplace1?: string,
  msgRegplace2?: string
): string {
  const msg: MsgString | undefined =
    MsgStrings.find((msg) => msg.msgid == key && msg.msglng == formLanguage) ||
    MsgStrings.find((msg) => msg.msgid == key && msg.msglng == 'de') ||
    MsgStrings.find((msg) => msg.msgid == key);

  if (!msg) return '';

  let msgValue = msg.msg;
  if (msgRegplace1) msgValue = msgValue.replace('%1%', msgRegplace1);
  if (msgRegplace2) msgValue = msgValue.replace('%2%', msgRegplace2);
  return msgValue;
}
