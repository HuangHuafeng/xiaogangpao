import * as React from 'react'
import * as Electron from 'electron'
import * as assert from 'assert'
import { MenuEvent } from '../menu-event'
import { About } from './about'
import { Manager, PopupType } from './manager'
import { CreateMatch } from './create-match'
import { MatchView } from './matchview/match-view'
import { Match } from '../models/match'
import { AddPlayer } from '../renderer/add-player'
import { RemovePlayer } from '../renderer/remove-player'
import { EditPlayer } from '../renderer/edit-player'

const notImplemented = (name: string) => {
  const options = {
    type: 'info',
    title: 'Sorry',
    buttons: ['Ok'],
    message: `"${name}" is not implemented yet. It will come.`,
  }
  Electron.remote.dialog.showMessageBox(Electron.remote.getCurrentWindow(), options)
}

export interface IAppProps {
  readonly manager: Manager
}

interface IAppState {
  readonly openDialogs: PopupType[]
  readonly match?: Match
}

export class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props)

    this.state = this.props.manager.getAppState()
    this.props.manager.registerApp(this)

    //this.onPopupDismissed = this.onPopupDismissed.bind(this);

    Electron.ipcRenderer.on('menu-event', (event: Electron.IpcMessageEvent, { name }: { name: MenuEvent }) => {
      this.onMenuEvent(name)
    })
  }

  /**
   * Handles menu events
   * @param event menu event
   */
  private onMenuEvent(event: MenuEvent) {
    switch (event) {
      case 'show-about':
        return this.props.manager.showPopup(PopupType.About)

      case 'file-new':
        return this.props.manager.showPopup(PopupType.NewMatch)

      case 'add-player':
        return this.props.manager.showPopup(PopupType.AddPlayer)

      default:
        return notImplemented(event)
    }
  }

  private onPopupDismissed(dialog: PopupType) {
    this.props.manager.onPopupDismissed(dialog)
  }

  private renderADialog(dialog: PopupType) {
    switch (dialog) {
      case PopupType.About:
        return this.renderAboutDialog()

      case PopupType.NewMatch:
        return this.renderNewMatchDialog()

      case PopupType.AddPlayer:
        return this.renderAddPlayerDialog()

      case PopupType.RemovePlayer:
        return this.renderRemovePlayerDialog()

      case PopupType.EditPlayer:
        return this.renderEditPlayerDialog()

      default:
        assert.ok(false, `Unknown dialog: ${name}`)
        return
    }
  }

  private renderEditPlayerDialog() {
    return (
      <EditPlayer
        key="removeplayer"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.EditPlayer)
        }}
        manager={this.props.manager}
      />
    )
  }

  private renderRemovePlayerDialog() {
    return (
      <RemovePlayer
        key="removeplayer"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.RemovePlayer)
        }}
        manager={this.props.manager}
      />
    )
  }

  private renderNewMatchDialog() {
    return (
      <CreateMatch
        key="newmatch"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.NewMatch)
        }}
        manager={this.props.manager}
      />
    )
  }

  private renderAddPlayerDialog() {
    return (
      <AddPlayer
        key="addplayer"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.AddPlayer)
        }}
        manager={this.props.manager}
      />
    )
  }

  private renderAboutDialog() {
    return (
      <About
        key="about"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.About)
        }}
        applicationName={Electron.remote.app.getName()}
        applicationVersion={Electron.remote.app.getVersion()}
      />
    )
  }

  private renderDialogs() {
    let ret: any[] = []
    for (let dialog of this.state.openDialogs) {
      ret.push(this.renderADialog(dialog))
    }
    return ret
  }

  public render() {
    return (
      <div id="xiaogangpao">
        <MatchView manager={this.props.manager} match={this.state.match} />
        {this.renderDialogs()}
      </div>
    )
  }
}
