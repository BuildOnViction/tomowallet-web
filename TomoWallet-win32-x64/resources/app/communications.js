import { ipcRenderer } from 'electron';

export const sendToMainProcess = message => {
  console.log('sendToMainProcess -- ', ipcRenderer);

  ipcRenderer.send('message', message);
};
