import * as Electron from 'electron'
import { MenuEvent } from '../menu-event'

type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow,
  event: Electron.Event
) => void

/**
 * Utility function returning a Click event handler which, when invoked, emits
 * the provided menu event over IPC.
 */
function emit(name: MenuEvent): ClickHandler {
  return (menuItem, window) => {
    if (window) {
      window.webContents.send('menu-event', { name })
    } else {
      Electron.ipcMain.emit('menu-event', { name })
    }
  }
}

export function buildDefaultMenu(): Electron.Menu {
  let template: Array<Electron.MenuItemConstructorOptions> = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: emit('file-new'),
        },
        {
          label: 'Open',
          click: emit('file-open'),
        },
        {
          label: 'Save',
          click: emit('file-save'),
        },
      ],
    },
    {
      role: 'editMenu',
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'forcereload',
        },
        {
          role: 'toggledevtools',
        },
        {
          role: 'togglefullscreen',
        },
      ],
    },
    {
      role: 'windowMenu',
    },
    {
      role: 'help',
      submenu: [],
    },
  ]

  if (process.platform === 'darwin') {
    const name = Electron.app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: emit('show-about'),
        },
        {
          type: 'separator',
        },
        {
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          role: 'hide',
        },
        {
          role: 'hideothers',
        },
        {
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
        },
      ],
    })
  }

  if (process.platform === 'win32') {
    const name = Electron.app.getName()

    // add the Exit menu item
    let fileSubmenu = template[0]
      .submenu as Electron.MenuItemConstructorOptions[]
    fileSubmenu.push({
      role: 'quit',
    })

    // add the About menu item
    let submenu = template[template.length - 1]
      .submenu as Electron.MenuItemConstructorOptions[]
    submenu.unshift({
      label: `About ${name}`,
      click: emit('show-about'),
    })
  }

  return Electron.Menu.buildFromTemplate(template)
}
