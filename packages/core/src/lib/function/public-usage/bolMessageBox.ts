/**
 * The function bolMessageBox is a simple wrapper around the bolDialog.Show function,
 *  which displays a dialog box with a specified title and message.
 * @param newTitle is title of dialog
 * @param newMessage is a message of dialog 
 */
export function bolMessageBox(newTitle: string, newMessage: string): void {
    window.bolDialog.Show(newTitle, newMessage, false);
}