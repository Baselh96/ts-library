/**
 * this function is used to create a dialog
 * @returns is a div-elemet
 */
export function createModalDialog(): HTMLElement {
  //Create the dialog
  const modalDialog = document.createElement('div');
  modalDialog.id = 'bolDialog';
  modalDialog.classList.add('modal');
  modalDialog.tabIndex = -1;
  //modalDialog.role = 'dialog';
  modalDialog.setAttribute('aria-hidden', 'true');

  //Create body of dialog
  const modalDialogBody = document.createElement('div');
  modalDialogBody.classList.add(
    'modal-dialog',
    'modal-lg',
    'modal-dialog-centered',
    'modal-dialog-scrollable'
  );
  //modalDialogBody.role = 'document';

  //Create Content of dialog
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  //Create Header of dialog
  const modalHeader = document.createElement('div');
  modalHeader.id = 'bolDialogHeader';
  modalHeader.classList.add('modal-header', 'bol-dialog-header');

  //Create Title fo dialog
  const modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.id = 'bolDialogTitle';

  //Append title to header
  modalHeader.appendChild(modalTitle);
  //Apend header to content
  modalContent.appendChild(modalHeader);

  //Create modal-body of dialog
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalBody.id = 'bolDialogMessage';

  //Append modal-body to content
  modalContent.appendChild(modalBody);

  //Create footer of dialog
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  //Create button for footer
  const buttonOK = document.createElement('button');
  buttonOK.id = 'bolDialogButtonOK';
  buttonOK.type = 'button';
  buttonOK.classList.add('btn', 'cc-button');
  buttonOK.dataset['dismiss'] = 'modal';
  buttonOK.dataset['bsDismiss'] = 'modal';
  buttonOK.textContent = 'OK';

  //Append button to footer
  modalFooter.appendChild(buttonOK);
  //Append footer to content
  modalContent.appendChild(modalFooter);

  //Append content to body
  modalDialogBody.appendChild(modalContent);
  //Append body to dialog
  modalDialog.appendChild(modalDialogBody);

  document.body.children[0].appendChild(modalDialog);

  return modalDialog;
}
