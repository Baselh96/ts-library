import { btnstring } from '../function/helper/btnstring';
import { bol_MakeInfoButton } from '../function/styling/bol_MakeInfoButton';
import { bolc__Settings } from './bolc__Settings';

/***************************************************************************************************
 * BLOCK
 * Fieldset
 ***************************************************************************************************/
export class bolc__Fieldset {
  public _obj: HTMLElement | null = null;
  //Is an instance of the Settings class, which we get as a parameter in the configuration.
  private bolSettings: bolc__Settings;

  constructor(bolSettings: bolc__Settings, objId?: string) {
    this.bolSettings = bolSettings;

    // If objId is undefined, exit the constructor
    if (!objId || objId.length === 0) return;

    // Find the element with the specified objId
    this._obj = document.getElementById(objId);

    // Get the <legend> elements within the _obj
    const l = this._obj?.getElementsByTagName('legend');

    // If the _obj doesn't have an id and there is at least one <legend> element
    if (this._obj && l && this._obj.id == '' && l.length > 0) {
      // Set the id of the _obj as "fs." + the id of the first <legend> element
      this._obj.id = 'fs.' + l[0].id;
    }
  }

  get title(): string {
    return (
      document.getElementById(this._obj?.id + '.fstext')?.innerHTML ||
      this._obj?.getElementsByTagName('legend')[0].innerText ||
      ''
    );
  }

  set title(newValue: string) {
    const ln = document.getElementById(this._obj?.id + '.fstext');
    if (ln) {
      ln.innerText = newValue;
    } else {
      const l = this._obj?.getElementsByTagName('legend');
      if (l) l[0].innerText = newValue;
    }
  }

  /**
   * This method is used to form and unform HTML elements.
   * @param Mode is the mode in which the HTML element will be found.
   */
  public SwitchOnOff(Mode: boolean): boolean {
    // Find the fsbody element using the id of the _obj appended with '.inner'
    const fsbody = document.getElementById(this._obj?.id + '.inner');
    // If fsbody element is not found, return false
    if (!fsbody) return false;
    // Set the display style of fsbody based on the Mode value
    fsbody.style.display = !Mode ? 'none' : '';
    // Return true to indicate successful execution
    return true;
  }

  /**
   * The method toggles the visual state of the button by adding
   * or removing CSS classes based on the current value of the button
   * @param Button is the button to be changed
   */
  public Toggle(Button: HTMLButtonElement): boolean {
    // Check the value of the Button
    if (Button.value == 'up') {
      // If the value is 'up', update the Button's class and value
      Button.classList.remove(this.bolSettings.symbol_down);
      Button.classList.add(this.bolSettings.symbol_up);
      Button.value = 'down';

      // Call the SwitchOnOff function with the argument true to show the content
      this.SwitchOnOff(true);
    } else {
      // If the value is not 'up', update the Button's class and value
      Button.classList.remove(this.bolSettings.symbol_up);
      Button.classList.add(this.bolSettings.symbol_down);
      Button.value = 'up';

      // Call the SwitchOnOff function with the argument false to hide the content
      this.SwitchOnOff(false);
    }

    // Return true to indicate successful execution
    return true;
  }

  /**
   * This method checks whether the associated content is collapsed or not
   * @returns true, indicating that the content is collapsed
   */
  private IsCollapsed(): boolean {
    // Get the button element associated with the content
    const e = document.getElementById(
      'btnt.' + this._obj?.id
    ) as HTMLButtonElement;

    // Check if the button element exists or if its value is 'down'
    // If the button doesn't exist or its value is 'down', it means the content is not collapsed
    // Return false in that case, indicating that the content is not collapsed
    // Otherwise, return true, indicating that the content is collapsed
    return !e || e.value === 'down' ? false : true;
  }

  /**
   * The method collapses the associated content if it is not already collapsed
   */
  public Collapse(): void {
    // Check if the associated content is not already collapsed
    if (!this.IsCollapsed()) {
      // Get the button element associated with the content
      const button = document.getElementById(
        'btnt.' + this._obj?.id
      ) as HTMLButtonElement;

      // Toggle the button to collapse the content
      this.Toggle(button);
    }
  }

  /**
   * This method expands the associated content if it is not already expanded
   */
  public Expand(): void {
    // Check if the associated content is not already expanded
    if (this.IsCollapsed()) {
      // Get the button element associated with the content
      const button = document.getElementById(
        'btnt.' + this._obj?.id
      ) as HTMLButtonElement;

      // Toggle the button to expand the content
      this.Toggle(button);
    }
  }

  StyleIt(): void {
    // Check if _obj is defined
    if (!this._obj) return;

    // Check if the fieldset has fsLegend and fsInner elements
    const fsLegend = this._obj.getElementsByTagName('legend')[0];
    const fsInner = this._obj.querySelectorAll('div.fieldset-inner-bs')[0];
    if (!fsLegend || !fsInner) return;

    // Set the id of _obj if it is undefined or empty
    if (this._obj.id === undefined || this._obj.id === '') {
      this._obj.id = fsLegend.id;
    }

    // Update the ids of fsLegend and fsInner with _obj's id
    fsLegend.id = this._obj.id + '.legend';
    fsInner.id = this._obj.id + '.inner';

    // Split the classNames of _obj into an array
    const myClasses = this._obj.className.split(' ');

    let newStyle;
    const myFunctions: string[] = [];

    // Iterate through each className
    myClasses.forEach((cName) => {
      if (cName.indexOf('bol-fs-s') >= 0) {
        // If it contains 'bol-fs-s', assign it to newStyle
        newStyle = cName;
      } else if (
        cName === 'bol-fs-f1' ||
        cName === 'bol-fs-v1' ||
        cName === 'bol-fs-toggle'
      ) {
        // If it matches any of these classNames, add 'bol-fs-toggle' to myFunctions
        myFunctions.push('bol-fs-toggle');
      } else if (
        cName === 'bol-fs-f2' ||
        cName === 'bol-fs-v2' ||
        cName === 'bol-fs-erase'
      ) {
        // If it matches any of these classNames, add 'bol-fs-erase' to myFunctions
        myFunctions.push('bol-fs-erase');
      } else if (
        cName === 'bol-fs-f3' ||
        cName === 'bol-fs-v3' ||
        cName === 'bol-fs-check'
      ) {
        // If it matches any of these classNames, add 'bol-fs-check' to myFunctions
        myFunctions.push('bol-fs-check');
      } else if (
        cName === 'bol-fs-f10' ||
        cName === 'bol-fs-v10' ||
        cName === 'bol-fs-down'
      ) {
        // If it matches any of these classNames, add 'bol-fs-down' to myFunctions
        myFunctions.push('bol-fs-down');
      } else if (cName === 'bol-fs-help') {
        // If it matches 'bol-fs-help', add 'bol-fs-help' to myFunctions
        myFunctions.push('bol-fs-help');
      }
    });

    if (this._obj.id === 'zone.F2') {
      console.log('UHU');
    }

    // Call the editFsLegend method to update the fieldset's style and content
    this.editFsLegend(newStyle || '', myClasses, fsLegend, fsInner);

    // Toggle the display of the fieldset based on its current state
    if (this._obj.style.display) {
      this._obj.style.display = this._obj.style.display !== '' ? 'none' : '';
    }
  }

  /**
   * this method edits the html element legend
   * @param newStyle is the new style
   * @param myClasses are the classes of buttons that will be created in a column
   * @param fsLegend is the FsLegend element
   */
  private editFsLegend(
    newStyle: string,
    myClasses: string[],
    fsLegend: HTMLLegendElement,
    fsInner: Element
  ): void {
    // Find the index of '@' symbol in fsLegend's innerText
    const index = fsLegend.innerText.indexOf('@');

    // Extract the legend text and legend help from fsLegend's innerText
    const legendText =
      index > 0 ? fsLegend.innerText.substring(0, index) : fsLegend.innerText;
    const legendHelp = index > 0 ? fsLegend.innerText.substring(index + 1) : '';

    // Check if there are custom classes for fsLegend
    if (myClasses.length > 0) {
      // Create the content of fsLegend using custom classes
      this.createContentOfFsLegend(
        newStyle,
        myClasses,
        fsLegend,
        legendText,
        legendHelp
      );
    } else if (legendHelp !== '') {
      // If there are no custom classes but there is legend help, display the legend text with info button
      fsLegend.innerHTML = `${legendText}${bol_MakeInfoButton(
        legendHelp,
        this.bolSettings
      )}`;
    }

    if (newStyle !== '') {
      // Remove inline style and add the new style class to the fieldset element
      this._obj?.removeAttribute('style');
      this._obj?.classList.add(newStyle);

      // Remove inline style and class attributes from fsLegend element
      fsLegend.removeAttribute('style');
      fsLegend.removeAttribute('class');

      if (myClasses.length <= 0) {
        // If there are no classes, set the class attribute for fsLegend with newStyle
        fsLegend.className = `${newStyle}legendrow ${newStyle}legend`;
      }

      // Remove inline style from fsInner element and set the new style class
      fsInner.removeAttribute('style');
      fsInner.className = `${newStyle}inner`;
    }
  }

  /**
   * This method is used to create the content of the FsLegend element.
   * @param newStyle is the new style
   * @param myClasses are the classes of buttons that will be created in a column
   * @param fsLegend is the FsLegend element
   * @param legendText is the text from the FsLegend element
   * @param legendHelp is the help text from the FsLegend element
   */
  private createContentOfFsLegend(
    newStyle: string,
    myClasses: string[],
    fsLegend: HTMLLegendElement,
    legendText: string,
    legendHelp: string
  ): void {
    // Create a new row element
    const lRow = document.createElement('div');
    lRow.className = `row ${newStyle}legendrow`;

    // Create a column for the legend text
    const lColL = document.createElement('div');
    lColL.className = `col-${11 - myClasses.length}`;

    // Set the inner HTML of the column based on whether legendHelp is present
    lColL.innerHTML =
      legendHelp !== ''
        ? `${legendText}${bol_MakeInfoButton(legendHelp, this.bolSettings)}`
        : fsLegend.innerText;

    // Add the newStyle class if it exists
    if (newStyle !== '') {
      lColL.removeAttribute('style');
      lColL.classList.add(`${newStyle}legend`);
    }

    // Append the legend column to the row
    lRow.appendChild(lColL);

    // Create a column for the buttons
    const lColR = document.createElement('div');
    lColR.className = `col-${myClasses.length + 1} bol-fs-colright`;

    // Iterate over each class and create the corresponding button
    for (const myClass of myClasses) {
      lColR.innerHTML += '&nbsp;';
      lColR.appendChild(
        btnstring(this.bolSettings, myClass, this._obj?.id || '')
      );

      // If the function is 'bol-fs-down', call the SwitchOnOff method with false
      if (myClass === 'bol-fs-down') {
        this.SwitchOnOff(false);
      }
    }

    // Append the button column to the row
    lRow.appendChild(lColR);

    // Add the newStyle class to the row if it exists
    if (newStyle !== '') {
      lRow.removeAttribute('style');
      lRow.classList.add(`${newStyle}legendrow`);
    }

    // Clear the content of fsLegend and append the created row
    fsLegend.innerHTML = '';
    fsLegend.appendChild(lRow);
  }
}
