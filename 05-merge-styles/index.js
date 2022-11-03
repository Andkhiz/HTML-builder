//import path from 'path';
//import {fileURLToPath} from 'url';
//import { open, readdir, readFile, appendFile } from 'node:fs/promises';
const path = require("path");
const { open, readdir, readFile, appendFile } = require("node:fs/promises");

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const dirNameStyleDefault = path.join(__dirname, "styles");
const fileStyleNameDefault = path.join(__dirname, "project-dist", "bundle.css");

async function mergeStyle(dirNameStyle = dirNameStyleDefault, fileStyleName = fileStyleNameDefault ) {
  try {
    await open(fileStyleName, "w");
    const files = await readdir(dirNameStyle, {withFileTypes: true});
    for ( let file of files ) {
      if ( file.isFile() ) {
        if ( path.extname(file.name) === '.css' ) {
          let contentFileStyle = await readFile( path.join(dirNameStyle, file.name) , { encoding: 'utf8' });
          await appendFile(fileStyleName, contentFileStyle + "\n");
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

if ( module.parent )
  module.exports = mergeStyle;
else mergeStyle();