import { app, BrowserWindow, shell, ipcMain } from 'electron';
import url from 'url';
import path from 'path';
import fs from 'fs';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create a main browser window
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  const indexPath = path.resolve(__dirname, 'electron/resources/index.html');
  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true,
    }),
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Bắt sự kiện cửa sổ được đóng lại.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.session.webRequest.onBeforeRequest(
    { urls: ['devtools://devtools/remote/*'] },
    (details, callback) => {
      callback({
        redirectURL: details.url.replace(
          'devtools://devtools/remote/',
          'https://chrome-devtools-frontend.appspot.com/',
        ),
      });
    },
  );

  mainWindow.webContents.on(
    'new-window',
    (event, url, frameName, disposition, options, additionalFeatures) => {
      event.preventDefault();
      let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
        },
      });
      win.webContents.on('did-finish-load', evt => {
        fs.readFile(path.join(__dirname, 'renderer.js'), (err, content) => {
          if (content) {
            win.webContents.executeJavaScript(content.toString());
          }
        });
      });
      win.on('close', () => {
        win = null;
      });
      // win.loadURL('https://maxbet.pigfarm.io/');
      win.loadURL(url);
      event.newGuest = win;
    },
  );

  ipcMain.on('open-link', (evt, link) => {
    shell.openExternal(link);
  });

  ipcMain.on('message', (evt, message) => {
    mainWindow.webContents.executeJavaScript(
      `console.log("External link send you a message: ${message}")`,
    );
    evt.reply('reply', 'Nice to meet you, external link!');
  });
};

// Phương thức này sẽ được gọi ra khi Electron hoàn thành
//  khởi tạo và sẳn sàng để tạo ra các cửa sở trình duyệt.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Thoát ra khi tất cả cửa sổ đóng lại.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
