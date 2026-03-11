import fs from 'fs';
import path from 'path';

function getPathToSave(paths?: string) {
  if (paths && paths.length > 0) {
    // convert windows path to unix path
    const newPath = `${paths}`.replaceAll('\\', '/');
    // remove /public from public path (is static path from express setting)
    const tmps = newPath.split('/public');
    if (tmps?.length > 1) {
      return tmps?.[1];
    }
    return tmps?.[0];
  }

  return paths ?? '';
}

async function checkAndMKDir(target_path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path.join(__dirname, target_path))) {
      fs.mkdir(path.join(process.cwd(), target_path), { recursive: true }, (err) => {
        if (err) {
          console.log(`checkAndMKDir error: ${err}`);
          reject(err);
        } else {
          // console.log('checkAndMKDir success');
          resolve(true);
        }
      });
    } else {
      // console.log('checkAndMKDir is already');
      resolve(true);
    }
  });
}

export default { getPathToSave, checkAndMKDir };
