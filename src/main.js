// @ts-ignore
const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Créer une fenêtre de navigateur.
    let win = new BrowserWindow({
        width: 207,
        height: 448,
        webPreferences: {
            nodeIntegration: true
        },
        //fullscreen: true, // Active le mode plein écran
        title: "arosaje",

    });

    // et charge l'index de localhost:3000.
    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});