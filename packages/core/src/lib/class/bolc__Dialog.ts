import bootstrap = require('bootstrap');
import { createModalDialog } from '../function/helper/createModalDialog';
import { msgStringHelper } from '../function/helper/msgstringHelper';
import { MsgString } from '../model/msg-string.model';

/***************************************************************************************************
 * Dialog
***************************************************************************************************/
export class bolc__Dialog {
  //is the dialog-modal
  private _obj: bootstrap.Modal | undefined;

  private bol__project_strings: MsgString[];

  constructor(bol__project_strings: MsgString[]) {
    this.bol__project_strings = bol__project_strings;
    if (window.bolSettings.isBootstrap) {
      //We see if we already have the dialog modal
      let e: HTMLElement | null = document.getElementById('bolDialog');
      //If not, then we create a dialog
      if (!e || e === null) {
        e = createModalDialog();
      }

      this._obj = new bootstrap.Modal(e!, { keyboard: false });
    } else {
      this._obj = undefined;
    }
  }

  /**
   * this returns the html element for the dialog title
   * @returns is the html element for title
   */
  public getTitle(): HTMLElement | null | undefined {
    return this._obj ? document.getElementById('bolDialogTitle') : undefined;
  }

  /**
   * this will change the title of the dialog
   * @param newValue is the new title of the dialog
   */
  public setTitle(newValue: string): void {
    const titleElement = document.getElementById('bolDialogTitle');
    if (this._obj && titleElement) titleElement.innerHTML = newValue;
  }

  /**
   * this returns the html element for the dialogmessage
   * @returns is the html element for message
   */
  public getMessage(): HTMLElement | null | undefined {
    return this._obj ? document.getElementById('bolDialogMessage') : undefined;
  }

  /**
   * this changes the message of the dialog.
   * @param newValue is the new title of the dialog.
   */
  public setMessage(newValue: string): void {
    const messageElement = document.getElementById('bolDialogMessage');
    if (this._obj && messageElement) messageElement.innerHTML = newValue;
  }

  /**
   * this method searches in the MsgStrings list for a message with id "key"
   * and returns its content
   * @param key is the searched MsgId
   * @returns MessageContent of found Message
   */
  public Project_String(key: string): string {
    return msgStringHelper(
      key,
      this.bol__project_strings,
      window.bolSettings.language
    );
  }

  /**
   * This method is used to change the syling of the dialog
   * @param newMode is a number
   */
  public ChangeStyle(newMode: number): void {
    const element = document.getElementById('bolDialogHeader');
    if (element) {
      switch (newMode) {
        case 2:
          element.classList.remove('bol-dialog-header');
          element.classList.add('bol-dialog-errorheader');
          break;
        default:
          element.classList.remove('bol-dialog-errorheader');
          element.classList.add('bol-dialog-header');
      }
    }
  }

  /**
   * This creates a dialog according to the passed values.
   * @param newTitle is the new title of the dialog to be shown
   * @param newMessage is the new message of the dialog to be shown
   * @param noOK is the boolean value for Ok button
   */
  public Show(newTitle: string, newMessage: string, noOK: boolean): void {
    //Binding or unbinding the ok-button
    if (noOK) {
      this.changeButtonDisplay('none');
    } else {
      this.changeButtonDisplay('');
    }

    let msg = '';
    try {
      msg = this.Project_String(newMessage || '');
    } catch (err) {}

    if (newTitle) {
      this.setTitle(newTitle);
    }

    if (msg.length === 0) {
      msg = newMessage;
    }

    if (msg) {
      this.setMessage(msg);
    }

    //If bootstrap is used in the application, then we change the styling
    // and we show the dialog
    if (window.bolSettings.isBootstrap) {
      this.ChangeStyle(1);
      if (this._obj) this._obj.show();

      this.setFocusToButton();
    } else {
      //Other we show an error message
      alert(`${this.getTitle()}\n\n${this.getMessage()}`);
    }
  }

  /**
   * this method is used to show a dialog for an error message.
   */
  public ShowError(): void {
    let errorMessage = '';

    //First we find ok-button and hide it
    this.changeButtonDisplay('none');

    //then we create the dialog according to the modeError
    switch (window.bolSettings._modeError) {
      case 3:
        this.ChangeStyle(2);
        if (window.bolSettings._fdsError.length == 1) {
          errorMessage = window.bolSettings.GetMsgString(
            'error_DlgTextTopSingle'
          );
          this.setTitle(
            window.bolSettings.GetMsgString('error_DlgHeadSingle', '')
          );
        } else {
          errorMessage = window.bolSettings.GetMsgString('error_DlgTextTop');
          this.setTitle(
            window.bolSettings.GetMsgString(
              'error_DlgHead',
              window.bolSettings._fdsError.length.toString(),
              ''
            )
          );
        }
        errorMessage += '<br><ul>';
        window.bolSettings._fdsError.forEach((item) => {
          errorMessage += '<li>' + item.title;
        });
        this.setMessage(errorMessage + '</ul>');
        if (this._obj) {
          this._obj.show();
        } else {
          alert(errorMessage);
        }
        break;
      case 2:
        if (window.bolSettings._fdsError.length == 1) {
          errorMessage = window.bolSettings.GetMsgString(
            'error_DlgTextTopSingle'
          );
        } else {
          errorMessage = window.bolSettings.GetMsgString('error_DlgTextTop');
        }
        window.bolSettings._fdsError.forEach((item) => {
          errorMessage += '\n*  ' + item.title;
        });
        errorMessage =
          window.bolSettings.GetMsgString('error_dialogtoptext') + errorMessage;
        alert(errorMessage);
        break;
      case 1:
        if (window.bolSettings._fdsError.length == 1) {
          errorMessage = window.bolSettings.GetMsgString(
            'error_DlgTextTopSingle'
          );
        } else {
          errorMessage = window.bolSettings.GetMsgString('error_DlgTextTop');
        }

        console.log(errorMessage);

        window.bolSettings._fdsError.forEach((item) => {
          console.log(item.name, ':', item.title);
        });
      default:
    }
  }

  /**
   * The method sets the title, message and display of a dialog,
   * to display an error message related to file upload.
   * @param modus determines the type of the error, whether it is a file size or a file type.
   */
  public ShowErrorFile(modus: number): void {
    this.setTitle(window.bolSettings.GetMsgString('error_FileTitle'));
    this.changeButtonDisplay('');

    if (modus == 2) {
      this.setMessage(
        window.bolSettings.GetMsgString(
          (window.bolSettings.fileTypes as string).split(',').length === 1
            ? 'error_FileTypeSingle'
            : 'error_FileTypes',
          window.bolSettings.fileTypes as string
        )
      );
    } else if (modus == 1)
      this.setMessage(
        window.bolSettings.GetMsgString(
          'error_FileSize',
          (window.bolSettings.FileMaxSize as number).toString()
        )
      );

    this.showDialog();
  }

  /**
   * this method is used to show a dialog for displaying infos
   * @param title is the title of the info dialog
   * @param msg is the message of the info dialog
   */
  public ShowInfo(title: string, msg: string): void {
    this.Show(title, msg, true);
  }

  /**
   * this method is used to show the error-page
   */
  public ShowErrorPages(): void {
    //First we find ok-button and show it
    this.changeButtonDisplay('');

    //then weset the title and message
    this.setTitle(window.bolSettings.GetMsgString('error_DlgTextPageTop'));
    this.setMessage(window.bolSettings.GetMsgString('error_DlgTextPageText'));

    this.showDialog();
  }

  /**
   * this method finds ok-button and changes it.
   * @param newValue is the new value of display from button
   */
  private changeButtonDisplay(newValue: string): void {
    const button = document.getElementById(
      'bolDialogButtonOK'
    ) as HTMLButtonElement;

    if (button) {
      button.style.display = newValue;
    }
  }

  /**
   * This method is used so that the Ok button is focused
   */
  private setFocusToButton(): void {
    const okButton = document.getElementById(
      'bolDialogButtonOK'
    ) as HTMLButtonElement;

    okButton.focus();
  }

  /**
   *This method is used to display the dialog.
   */
  private showDialog(): void {
    switch (window.bolSettings._modeError) {
      case 3:
        this.ChangeStyle(2);
        if (this._obj) {
          this._obj.show();
        }

        this.setFocusToButton();
        break;
      default:
        alert(this.getTitle() + '\n\n' + this.getMessage());
        break;
    }
  }
}
