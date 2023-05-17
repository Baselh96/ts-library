import { bolc__Settings } from './bolc-settings';

describe('class bolc__Settings', () => {
  const instance = new bolc__Settings();

  it('Testen some variable', () => {
    expect(instance.isBootstrap).toBeTruthy();

    expect(instance.ModeError).toBe(3);

    expect(instance.page).toBe(1);
    instance.page = 3;
    expect(instance.page).toBe(3);
    expect(JSON.parse(sessionStorage.getItem('bol_active_page') || '')).toBe(3);

    instance.PageCheck = undefined;
    expect(instance.PageCheck).toBeTruthy();

    instance.PageChecked = true;
    expect(instance.PageChecked).toBeTruthy();

    instance.setPageChecked(3, false);
    expect(instance.getPageChecked(3)).toBeFalsy();

    expect(instance.DialogMode).toEqual(3);
    instance.DialogMode = 1;
    instance.DialogMode = 2;
    expect(instance.DialogMode).toEqual(2);
  });

  it('test load-method', () => {
    //We first create a Form element to which we will attach the Input element.
    const form = document.createElement('form');
    form.id = 'form1';
    //appended it to document-body
    document.body.appendChild(form);

    //Call the function
    instance.Load();

    //Ande check the first child of form, if it will be the added input with id 'bol.FormSettings'
    expect(form.children[0].id).toBe('bol.FormSettings');
  });

  it('test save-methode', () => {
    //We first find the input element which will be changed when saving.
    const input: HTMLInputElement = document.getElementById(
      'bol.FormSettings'
    ) as HTMLInputElement;

    const oldvalue = JSON.parse(input.value);
    //Call the function
    instance.Save();
    const newvalue = JSON.parse(input.value);

    //The length of the list in the input is longer than before saving, because some items were added.
    expect(newvalue.length > oldvalue.length).toBeTruthy();
    expect(newvalue).not.toEqual(oldvalue);
  });

  it('test UpdateFiles-methode', () => {
    //We first create a div element whose text we want to change by the function
    const div = document.createElement('div');
    div.id = 'bol.FileSizes';
    document.body.appendChild(div);

    //Begin-value
    div.innerText = '0 MByte';
    //Call a function
    instance.UpdateFiles("fieldtest", "filetest", 1200000);

    //expected string
    const expected = `${(1200000 / 1024 / 1024).toFixed(2)} MByte`;

    expect(div.innerText).toEqual(expected);
  });

});
