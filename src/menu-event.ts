import * as Electron from 'electron'

export type MenuEvent =
  | 'file-new'
  | 'file-open'
  | 'file-save'
  | 'show-about'
  | 'add-player'
  | 'edit-match'
  | 'remove-all-players'

type ClickHandler = (menuItem: Electron.MenuItem, browserWindow: Electron.BrowserWindow, event: Electron.Event) => void

/**
 * Utility function returning a Click event handler which, when invoked, emits
 * the provided menu event over IPC.
 */
export function emit(name: MenuEvent): ClickHandler {
  return (menuItem, window) => {
    if (window) {
      window.webContents.send('menu-event', { name })
    } else {
      Electron.ipcMain.emit('menu-event', { name })
    }
  }
}

/**
   * send message to renderer process to simulate a menu event
   */
export function sendMenuEvent(name: MenuEvent) {
  Electron.remote.getCurrentWindow().webContents.send('menu-event', { name })
}
