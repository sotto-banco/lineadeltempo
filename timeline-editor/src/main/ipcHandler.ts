import { IpcMain } from 'electron';
import {
  getDataJsonPath,
  getEras,
  getEvents,
  getTitle,
  setEras,
  setEvents,
  setTitle,
} from './store';
import fs from 'fs';

export const ipcHandler = (ipcMain: IpcMain) => {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('get-title', async (event, arg) => {
    const title = getTitle();
    if (title) event.reply('got-title', getTitle());
    else event.reply('got-data-json-path', false);
  });

  ipcMain.on('set-title', async (event, arg) => {
    const dataJson = getDataJsonPath();
    if (dataJson !== '') {
      const data = {
        ...JSON.parse(fs.readFileSync(dataJson, 'utf8')),
        title: arg[0],
      };
      fs.writeFileSync(dataJson, JSON.stringify(data));
    }
    setTitle(arg[0]);
  });

  ipcMain.on('get-data-json-path', (event) => {
    const dataJsonPath = getDataJsonPath();
    if (dataJsonPath !== '') {
      event.reply('got-data-json-path', true);
    }
  });

  ipcMain.on('get-events', (event) => {
    const events = getEvents();
    if (events) event.reply('got-events', events);
    else event.reply('got-data-json-path', false);
  });

  ipcMain.on('set-events', async (event, arg) => {
    const dataJson = getDataJsonPath();
    if (dataJson !== '') {
      const data = {
        ...JSON.parse(fs.readFileSync(dataJson, 'utf8')),
        events: arg[0],
      };
      fs.writeFileSync(dataJson, JSON.stringify(data, null, 4));
      setEvents(arg[0]);
      const events = getEvents();
      if (events) event.reply('got-events', events);
    } else {
      event.reply('error', 'set-events failed');
    }
  });

  ipcMain.on('get-eras', (event) => {
    const eras = getEras();
    if (eras) event.reply('got-eras', eras);
    else event.reply('got-data-json-path', false);
  });

  ipcMain.on('set-eras', async (era, arg) => {
    const dataJson = getDataJsonPath();
    if (dataJson !== '') {
      const data = {
        ...JSON.parse(fs.readFileSync(dataJson, 'utf8')),
        eras: arg[0],
      };
      fs.writeFileSync(dataJson, JSON.stringify(data, null, 4));
      setEras(arg[0]);
      const eras = getEras();
      if (eras) era.reply('got-eras', eras);
    } else {
      era.reply('error', 'set-eras failed');
    }
  });
};
