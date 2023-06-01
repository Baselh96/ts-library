import { getField } from './getField';

export function setGroupValue(groupname: string, val: string) {
  const group: any = getField(groupname);

  if (!group) return;
  // 2015-07-10 : Off is replaced by ''
  if (val === 'Off') {
    val = '';
  }

  for (let n = 0; n < group.length; n++) {
    group[n].checked = group[n] !== undefined && group[n].value === val;
  }
}
