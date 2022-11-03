//import path from 'path';
//import {fileURLToPath} from 'url';
//import { mkdir, readdir, copyFile, unlink } from 'node:fs/promises';
const path = require("path");
const { mkdir, readdir, copyFile, unlink, rmdir } = require('node:fs/promises');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const dirNameCopyDefault = path.join(__dirname, 'files');
const dirNamePasteDefault = path.join(__dirname, 'files-copy');

async function copyDirectory(dirNameCopy = dirNameCopyDefault, dirNamePaste = dirNamePasteDefault, onlyFiles = true ) {
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
    else {
      if (onlyFiles === false) {
        await mkdir( path.join(dirNamePaste, file.name), { recursive: true });
        await copyDirectory( path.join(dirNameCopy, file.name), path.join(dirNamePaste, file.name), false );
        filesName.push(file.name);
      }
    }
  }
  if (createDir === undefined ) {
    const filesCopy = await readdir(dirNamePaste, {withFileTypes: true});
    for (let file of filesCopy) {
      if (file.isFile() ) {
        if ( !filesName.includes(file.name) ) {
          await unlink(path.join(dirNamePaste, file.name));
        }
      }else 
      if (!filesName.includes(file.name)) {
        await rmdir(path.join(dirNamePaste, file.name));
      } 
    }
    
//  console.log(`created ${createDir}`);
  }
} catch (err) {
  console.error(err.message);
}
}

if ( module.parent )
  module.exports = copyDirectory ;
else copyDirectory();