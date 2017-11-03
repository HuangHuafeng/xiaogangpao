/**
 * The app manager.
 * It takes care of everything:
 *  * what popups are open, window active or not, ...
 *  * all actions
 *  * state of the app
 *  * anything else
 */

import * as Electron from "electron";
import { App } from "./app";
import { MenuEvent } from "../menu-event";
import { assertNever } from '../desktop';

const notImplemented = (name: string) => {
  const options = {
    type: "info",
    title: "Sorry",
    buttons: ["Ok"],
    message: `"${name}" is not implemented yet. It will come.`
  };
  Electron.remote.dialog.showMessageBox(
    Electron.remote.getCurrentWindow(),
    options
  );
};

export class Manager {
  openDialogs: string[];
  app?: App;

  constructor() {
    this.openDialogs = [];
  }

  public getAppState() {
    return {
      openDialogs: this.openDialogs
    };
  }

  /**
   * We can only manage one app and it can NOT be changed
   * @param app the app that is managed by this manager
   */
  public registerApp(app: App) {
    if (this.app === undefined) {
      this.app = app;
    }
  }

  /**
   * Handles menu events
   * @param event menu event
   */
  public onMenuEvent(event: MenuEvent) {
    switch (event) {
      case "show-about":
        if (!this.isDialogAlreadyOpen("about")) {
          this.openDialogs.push("about");
          this.updateAppState();
        }
        return;

        case "file-new":
        if (!this.isDialogAlreadyOpen("newmatch")) {
          this.openDialogs.push("newmatch");
          this.updateAppState();
        }
        return ;

      default:
        return notImplemented(event);
    }
  }

  private updateAppState() {
    if (this.app !== undefined) {
      this.app.setState(this.getAppState());
    }
  }

  /**
   * check if the "dialog" dialog is already open. We don't want to open the same dialog
   * because it can cause issues (like duplicated key, id of the dialog element).
   * @param dialog the dialog to be checked
   */
  private isDialogAlreadyOpen(dialog: string) {
    return (
      this.openDialogs.findIndex(value => {
        return value === dialog;
      }) !== -1
    );
  }

  /**
   *
   * @param dialog the dialog justed submitted
   */
  public onDialogSubmitted(dialog: string) {
    switch (dialog) {
      case "about":
        this.closeTopDialog("about");
        return;

      default:
        return notImplemented("submitting " + dialog);
    }
  }

  private closeTopDialog(dialog?: string) {
    if (dialog) {
      if (dialog !== this.openDialogs[this.openDialogs.length - 1]) {
        assertNever(dialog as never, `"${dialog}" is NOT same as last one: "${this.openDialogs[this.openDialogs.length - 1]}"`);
      }
    }
    this.openDialogs.pop();
    this.updateAppState();
  }
}
