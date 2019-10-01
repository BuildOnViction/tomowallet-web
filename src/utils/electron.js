/**
 *
 * Electron App Utilities
 *
 */
// ===== IMPORTS =====
const path = require('path');
// ===================

// ===== API =====
/* eslint-disable no-new-func */
export const isElectron = () => {
  // Renderer process
  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true;
  }

  return false;
};

const electronAPI = isElectron()
  ? {
      fs: new Function('return require("fs")')(),
      transportNodeHid: new Function(
        "return require('@ledgerhq/hw-transport-node-hid').default",
      )(),
    }
  : {};

export default electronAPI;

export const detectKeystore = () => {
  const rootFolders = __dirname.split('\\');
  const filePath = `${rootFolders
    .slice(0, rootFolders.length - 1)
    .join('\\')}\\store\\keystore.json`;

  return new Promise(resolve =>
    electronAPI.fs.readFile(filePath, (error, data) =>
      resolve({ error, data }),
    ),
  );
};

export const readKeystore = () =>
  new Promise(resolve =>
    electronAPI.fs.readFile(
      path.join(__dirname, '\\..\\store\\keystore.json'),
      (error, data) => resolve({ error, data }),
    ),
  );

export const writeKeystore = content =>
  new Promise(resolve =>
    electronAPI.fs.mkdir(
      path.join(__dirname, '\\..\\store'),
      { recursive: true },
      err => {
        if (!err) {
          electronAPI.fs.writeFile(
            path.join(__dirname, '\\..\\store\\keystore.json'),
            content,
            error => resolve({ error }),
          );
        }
      },
    ),
  );

export const removeKeystore = () =>
  new Promise(resolve =>
    electronAPI.fs.stat(
      path.join(__dirname, '\\..\\store\\keystore.json'),
      error => {
        if (!error) {
          electronAPI.fs.unlink(
            path.join(__dirname, '\\..\\store\\keystore.json'),
            error => resolve({ error }),
          );
        }
      },
    ),
  );

export const detectRPFile = () => {
  const rootFolders = __dirname.split('\\');
  const filePath = `${rootFolders
    .slice(0, rootFolders.length - 1)
    .join('\\')}\\store\\recovery_phrase.json`;

  return new Promise(resolve =>
    electronAPI.fs.readFile(filePath, (error, data) =>
      resolve({ error, data }),
    ),
  );
};

export const readRPFile = () =>
  new Promise(resolve =>
    electronAPI.fs.readFile(
      path.join(__dirname, '\\..\\store\\recovery_phrase.json'),
      (error, data) => resolve({ error, data }),
    ),
  );

export const writeRPFile = content =>
  new Promise(resolve =>
    electronAPI.fs.mkdir(
      path.join(__dirname, '\\..\\store'),
      { recursive: true },
      err => {
        if (!err) {
          electronAPI.fs.writeFile(
            path.join(__dirname, '\\..\\store\\recovery_phrase.json'),
            content,
            error => resolve({ error }),
          );
        }
      },
    ),
  );

export const removeRPFile = () =>
  new Promise(resolve =>
    electronAPI.fs.stat(
      path.join(__dirname, '\\..\\store\\recovery_phrase.json'),
      error => {
        if (!error) {
          electronAPI.fs.unlink(
            path.join(__dirname, '\\..\\store\\recovery_phrase.json'),
            error => resolve({ error }),
          );
        }
      },
    ),
  );

// ===============
