import path from 'path';
import {fileURLToPath} from 'url';
import { mkdir, readdir, copyFile, unlink } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var dirNameCopy = path.join(__dirname, 'files');
var dirNamePaste = path.join(__dirname, 'files-copy');

try {
  const createDir = await mkdir(dirNamePaste, { recursive: true });
  const files = await readdir(dirNameCopy, {withFileTypes: true});
  const filesName = [];
  for ( let file of files ) {
    if ( file.isFile() ) {
      let fileNameCopy = path.join(dirNameCopy, file.name);
      let fileNamePaste = path.join(dirNamePaste, file.name);
      await copyFile(fileNameCopy, fileNamePaste);
      filesName.push(file.name);
    }
  }
  if (createDir === undefined ) {
    const filesCopy = await readdir(dirNamePaste, {withFileTypes: true});
    for (let file of filesCopy) {
      if (file.isFile() ) {
        if ( !filesName.includes(file.name) ) {
          let delFile = await unlink(path.join(dirNamePaste, file.name));
        }
      }
    }
    
//  console.log(`created ${createDir}`);
  }
} catch (err) {
  console.error(err.message);
}


