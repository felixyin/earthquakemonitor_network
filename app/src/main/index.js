'use strict'

import { app, BrowserWindow } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    // : `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        frame: false,
        height: 750,
        minHeight: 600,
        width: 1200,
        minWidth: 864
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    /*
     // FIXME 生产环境下的调试办法
     // Open the devtools.
     mainWindow.webContents.openDevTools();


     // Handle devtools opened event
     mainWindow.webContents.on('devtools-opened', ()=>{
     console.log("devtools-opened event called!")
     });
     */

    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
