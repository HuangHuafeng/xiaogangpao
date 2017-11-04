import * as React from 'react'
import * as Electron from 'electron'
import { MenuEvent } from '../menu-event'
import { Clock } from './clock'
import { About } from './about'
import { Manager } from './manager'
import { assertNever } from '../desktop'
import { CreateMatch } from './create-match'

export interface IAppProps {
  readonly manager: Manager
}

interface IAppState {
  openDialogs: string[]
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
        this.props.manager.onMenuEvent(name)
      }
    )
  }

  private onPopupDismissed(dialog: string) {
    this.props.manager.onDialogSubmitted(dialog)
  }

  private renderADialog(name: string) {
    switch (name) {
      case 'about':
        return this.renderAboutDialog()

      case 'newmatch':
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
          this.onPopupDismissed('newmatch')
        }}
        applicationName={Electron.remote.app.getName()}
        applicationVersion={Electron.remote.app.getVersion()}
      />
    )
  }

  private renderAboutDialog() {
    return (
      <About
        key="about"
        onDismissed={() => {
          this.onPopupDismissed('about')
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
