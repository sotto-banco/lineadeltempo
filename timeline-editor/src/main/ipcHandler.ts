import { IpcMain } from 'electron';
import { getTitle, setTitle } from './store';

export const ipcHandler = (ipcMain: IpcMain) => {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('get-title', async (event, arg) => {
    event.reply('got-title', getTitle());
  });

  ipcMain.on('set-title', async (event, arg) => {
    setTitle(arg[0]);
  });
};
