const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')

let mainWindow
const server = express()

server.use('/', express.static(path.join(__dirname, 'dist')))

app.on('ready', () => {
    // Listen on a random available port
    const serverInstance = server.listen(0, '127.0.0.1',() => {
        const port = serverInstance.address().port; // Retrieve the assigned port

        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false
            }
        })

        console.log('App running on port: ' + port)
        // Load the app from the dynamic port
        mainWindow.loadURL(`http://localhost:${port}`)

        mainWindow.on('closed', () => {
            mainWindow = null
            serverInstance.close()
        })
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
