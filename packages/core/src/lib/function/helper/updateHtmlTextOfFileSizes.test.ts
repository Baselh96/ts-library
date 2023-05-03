import { updateHtmlTextOfFileSizes } from "./updateHtmlTextOfFileSizes";

describe('updateHtmlTextOfFileSizes', () => {
  it('Testing the function updateHtmlTextOfFileSizes', () => {
    //We first create a div element whose text we want to change by the function
    const div = document.createElement('div');
    div.id = 'bol.FileSizes';
    document.body.appendChild(div);

    const text = 'testing the updateHtmlTextOfFileSizes-function';
    updateHtmlTextOfFileSizes(text);
    expect(div.innerText).toBe(text);
  });
});
