/**
 * The app manager.
 * It takes care of everything:
 *  * what popups are open, window active or not, ...
 *  * all actions
 *  * state of the app
 *  * anything else
 */

import { App } from './app'
import * as assert from 'assert'
import { Match } from '../models/match'
import * as clone from 'clone'

export enum PopupType {
  About = 1,
  NewMatch,
  AddPlayer,
  RemovePlayer,
  EditPlayer,
}

export class Manager {
  openDialogs: PopupType[]
  app?: App
  match?: Match
  playerToDeleteOrEdit: number | undefined

  constructor() {
    this.openDialogs = []
  }

  public getAppState() {
    return clone({
      openDialogs: this.openDialogs,
      match: this.match,
    })
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
  private isDialogAlreadyOpen(dialog: PopupType): boolean {
    return this.openDialogs.findIndex(value => value === dialog) !== -1
  }

  /**
   * Just dismiss (only) the top dialog, do nothing else
   * @param dialog the dialog justed submitted
   */
  public onPopupDismissed(dialog: PopupType): void {
    switch (dialog) {
      case PopupType.About:
        return this.closeTopDialog(dialog)

      case PopupType.NewMatch:
        return this.closeTopDialog(dialog)

      case PopupType.AddPlayer:
        return this.closeTopDialog(dialog)

      case PopupType.RemovePlayer:
        this.playerToDeleteOrEdit = undefined
        return this.closeTopDialog(dialog)

      case PopupType.EditPlayer:
        this.playerToDeleteOrEdit = undefined
        return this.closeTopDialog(dialog)

      default:
        assert.ok(false, `Unknown value: "${dialog}"`)
        return
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
        assert.ok(false, `"${dialog}" is NOT same as last one: "${this.openDialogs[this.openDialogs.length - 1]}"`)
      }
    }
    this.openDialogs.pop()
    this.onPopupChanged(dialog)
  }

  /**
   * create a new match and then work on the new match
   * @param match the new Match
   */
  public newMatch(name: string, organizer?: string) {
    if (this.match) {
      // do somethign with the current match?
    }

    this.match = new Match(name, organizer)

    if (this.app !== undefined) {
      this.app.setState({ match: this.match })
    }
  }

  /**
   * create a new match and then work on the new match
   * @param match the new Match
   */
  public addPlayer(name: string, organization: string = '') {
    if (this.match) {
      this.match.addPlayer(name, organization)
    }

    if (this.app !== undefined) {
      this.app.setState({ match: this.match })
    }
  }

  public removePlayer(number: number) {
    this.playerToDeleteOrEdit = number
    this.showPopup(PopupType.RemovePlayer)
  }

  public editPlayer(number: number) {
    this.playerToDeleteOrEdit = number
    this.showPopup(PopupType.EditPlayer)
  }
}
