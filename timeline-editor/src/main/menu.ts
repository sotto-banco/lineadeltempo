import { exec } from 'child_process';
import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog,
} from 'electron';
import fs from 'fs';
import path from 'path';
import {
  getDataJsonPath,
  getProjectPath,
  setDataJsonPath,
  setProjectPath,
} from './store';
import { runChild } from './util';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&Menu',
        submenu: [
          {
            label: '&devtools',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
              this.mainWindow.webContents.toggleDevTools();
            },
          },
          {
            label: '&reload',
            accelerator: 'Ctrl+R',
            click: () => {
              this.mainWindow.webContents.reload();
            },
          },
          {
            label: '&close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: 'File',
        submenu: [
          {
            label: 'apri json',
            accelerator: 'Ctrl+O',
            click: () => {
              const updatedPath = dialog.showOpenDialogSync({
                properties: ['openFile'],
                filters: [{ name: 'json', extensions: ['json'] }],
              });
              if (updatedPath) {
                setDataJsonPath(updatedPath[0]);
                this.mainWindow.webContents.reload();
              }
            },
          },
          {
            label: 'aggiorna sito',
            accelerator: 'Ctrl+S',
            click: () => {
              const confirmed = dialog.showMessageBoxSync({
                message: 'Vuoi aggiornare il sito?',
                buttons: ['conferma', 'annulla'],
              });
              if (confirmed === 0) {
                let projectPath = getProjectPath();
                let proceed: boolean = false;
                if (fs.existsSync(projectPath)) {
                  proceed = true;
                } else {
                  const updatedProjectPath = dialog.showOpenDialogSync({
                    properties: ['openDirectory'],
                  });
                  if (updatedProjectPath) {
                    setProjectPath(updatedProjectPath[0]);
                    proceed = true;
                  }
                }

                if (proceed) {
                  projectPath = getProjectPath();
                  const dataJsonPath = getDataJsonPath();

                  fs.copyFileSync(
                    dataJsonPath,
                    path.join(
                      projectPath,
                      'src',
                      'data',
                      path.basename(dataJsonPath)
                    )
                  );

                  fs.cpSync(
                    path.join(path.dirname(dataJsonPath), 'media'),
                    path.join(projectPath, 'src', 'data', 'media'),
                    { recursive: true }
                  );

                  try {
                    this.mainWindow.webContents.send(
                      'error',
                      'spawning git add'
                    );
                    runChild('git add --a', projectPath);
                    this.mainWindow.webContents.send('error', 'done');
                    this.mainWindow.webContents.send(
                      'error',
                      'spawning git commit'
                    );
                    runChild('git commit -m timeline-editor', projectPath);
                    this.mainWindow.webContents.send('error', 'done');
                    this.mainWindow.webContents.send(
                      'error',
                      'spawning git push'
                    );
                    runChild('git push', projectPath);
                    this.mainWindow.webContents.send('error', 'done');

                    this.mainWindow.webContents.send('error', 'deploying');
                    runChild('npm run deploy', projectPath);
                    this.mainWindow.webContents.send('error', 'done');
                    dialog.showMessageBox({ message: 'sito aggiornato' });
                  } catch (error) {
                    this.mainWindow.webContents.send('error', error);
                  }
                }
              }
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
