import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'get-title'
  | 'set-title'
  | 'get-projects'
  | 'got-title'
  | 'got-projects'
  | 'set-projects'
  | 'get-data-json-path'
  | 'got-data-json-path'
  | 'set-data-json-path'
  | 'get-events'
  | 'got-events'
  | 'set-events'
  | 'get-eras'
  | 'got-eras'
  | 'set-eras'
  | 'error';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: any) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeListener(channel: Channels) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
