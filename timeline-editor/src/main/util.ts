/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { exec, execSync } from 'child_process';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const runChild = (command: string, path: string, cb?: () => any) => {
  try {
    const child = execSync(command, { cwd: path });
    console.log(child.toString());
    if (cb) cb();
  } catch (error) {
    console.log(error);
  }
};
