import path from 'path';
import {fileURLToPath} from 'url';
import { open, mkdir, readdir, readFile, appendFile, unlink } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirNameStyle = path.join(__dirname, "styles");
const dirNamePaste = path.join(__dirname, "project-dist");
const fileStyleName = path.join(dirNamePaste, "bundle.css");

try {
  const createFileStyleCSS = open(fileStyleName, "w");
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


