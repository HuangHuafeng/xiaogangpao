import * as React from 'react'
import * as Electron from 'electron'
import { MenuEvent } from '../menu-event'
import { Clock } from './clock'
import { About } from './about'
import { Manager, PopupType } from './manager'
import { assertNever } from '../desktop'
import { CreateMatch } from './create-match'

const notImplemented = (name: string) => {
  const options = {
    type: 'info',
    title: 'Sorry',
    buttons: ['Ok'],
    message: `"${name}" is not implemented yet. It will come.`,
  }
  Electron.remote.dialog.showMessageBox(
    Electron.remote.getCurrentWindow(),
    options
  )
}

export interface IAppProps {
  readonly manager: Manager
}

interface IAppState {
  openDialogs: PopupType[]
}

export class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: any) {
    super(props)

    this.state = this.props.manager.getAppState()
    this.props.manager.registerApp(this)

    //this.onPopupDismissed = this.onPopupDismissed.bind(this);

    Electron.ipcRenderer.on(
      'menu-event',
      (event: Electron.IpcMessageEvent, { name }: { name: MenuEvent }) => {
        this.onMenuEvent(name)
      }
    )
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

      default:
        return assertNever(name as never, `Unknown dialog: ${name}`)
    }
  }

  private renderNewMatchDialog() {
    return (
      <CreateMatch
        key="newmatch"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.NewMatch)
        }}
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
      <div>
        <div>
          <Clock key="clock" />
        </div>
        {this.renderDialogs()}
      </div>
    )
  }
}
