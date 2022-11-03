const copyDirectory = require("../04-copy-directory/index.js");
const path = require("path");
const mergeStyles = require("../05-merge-styles");
const {readFile, readdir, writeFile} = require("fs/promises");

const dirNameCopy = path.join( __dirname, "assets" );
const dirNamePaste = path.join( __dirname, "project-dist", "assets");
const dirStyles = path.join(__dirname, "styles");
const fileMergeStyles = path.join(__dirname, "project-dist", "style.css");
const fileTemplate = path.join(__dirname, "template.html");
const dirHTMLComponents = path.join(__dirname, "components");
const pathFileIndexHtml = path.join(__dirname, "project-dist", "index.html");

async function buildHTML() {
  try {
    //await open(pathFileIndexHtml, "w");
    var textHTML = (await readFile(fileTemplate)).toString();
    const files = await readdir(dirHTMLComponents, {withFileTypes: true});
    for ( let file of files ) {
      if ( file.isFile() ) {
        if ( path.extname(file.name) === '.html' ) {
          let textFind = "{{" + path.parse(file.name).name + "}}";
          let textReplace = await readFile( path.join(dirHTMLComponents, file.name) , { encoding: 'utf8' });
          textHTML = textHTML.replaceAll(textFind, textReplace);
        }
      }
    }
    writeFile(pathFileIndexHtml, textHTML);
  } catch (err) {
    console.error(err.message);
  }
}

async function buildPage() {
  await copyDirectory(dirNameCopy, dirNamePaste, false);
  
  mergeStyles(dirStyles, fileMergeStyles);
  
  buildHTML();
}

buildPage();
