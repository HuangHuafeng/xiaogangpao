/**
 * The app manager.
 * It takes care of everything:
 *  * what popups are open, window active or not, ...
 *  * all actions
 *  * state of the app
 *  * anything else
 */

import { App } from './app'
import { assertNever } from '../desktop'

export enum PopupType {
  About = 1,
  NewMatch,
}

export class Manager {
  openDialogs: PopupType[]
  app?: App

  constructor() {
    this.openDialogs = []
  }

  public getAppState() {
    return {
      openDialogs: this.openDialogs,
    }
  }

  /**
   * We can only manage one app and it can NOT be changed
   * @param app the app that is managed by this manager
   */
  public registerApp(app: App) {
    if (this.app === undefined) {
      this.app = app
    }
  }

  /**
   * check if the "dialog" dialog is already open. We don't want to open the same dialog
   * because it can cause issues (like duplicated key, id of the dialog element).
   * @param dialog the dialog to be checked
   */
  private isDialogAlreadyOpen(dialog: PopupType) {
    return (
      this.openDialogs.findIndex(value => {
        return value === dialog
      }) !== -1
    )
  }

  /**
   * Just dismiss (only) the top dialog, do nothing else
   * @param dialog the dialog justed submitted
   */
  public onPopupDismissed(dialog: PopupType) {
    switch (dialog) {
      case PopupType.About:
        this.closeTopDialog(dialog)
        return

      case PopupType.NewMatch:
        this.closeTopDialog(dialog)
        return

      default:
        assertNever(dialog as never, `Unknown value: "${dialog}"`)
    }
  }

  public showPopup(dialog: PopupType) {
    if (!this.isDialogAlreadyOpen(dialog)) {
      this.openDialogs.push(dialog)
      this.onPopupChanged(dialog)
    }
  }

  private onPopupChanged(dialog?: PopupType) {
    if (this.app !== undefined) {
      this.app.setState({ openDialogs: this.openDialogs })
    }
  }

  /**
   *
   * @param dialog must be equal to the top/last dialog
   */
  private closeTopDialog(dialog?: PopupType) {
    if (dialog) {
      if (dialog !== this.openDialogs[this.openDialogs.length - 1]) {
        assertNever(
          dialog as never,
          `"${dialog}" is NOT same as last one: "${this.openDialogs[
            this.openDialogs.length - 1
          ]}"`
        )
      }
    }
    this.openDialogs.pop()
    this.onPopupChanged(dialog)
  }
}
