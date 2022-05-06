const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('pages/index.html');
};

app.whenReady().then(() => {
    createWindow();

    // macOS (open a window if none are open)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
        {
            createWindow();
        }
    });
});

// App quitting is platform dependent
// Linux and Windows:
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

// Testing some comment