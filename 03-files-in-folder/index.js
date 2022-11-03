//import path, { dirname } from 'path';
//import { readdir } from 'node:fs/promises';
//import {fileURLToPath} from 'url';
//import { stat } from 'fs/promises';
var path = require("path");
const {readdir} = require("node:fs/promises")
const { stat } = require("fs/promises");

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

var dirName = path.join(__dirname, "secret-folder");
var fileSize;

async function filesInFolder() {
  try {
    const files = await readdir(dirName, {withFileTypes: true});
    for (const file of files)
      if ( file.isFile() ) {
        fileSize = await stat( path.join(dirName, file.name));
        fileSize = fileSize.size / 1024 + "kb";
        console.log(`${path.parse(file.name).name} - ${path.extname(file.name).substring(1)} - ${fileSize}`);
      }
  } catch (err) {
    console.error(err);
  }
};

filesInFolder();