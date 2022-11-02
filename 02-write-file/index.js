var readline = require('node:readline');
//import * as readline from 'node:readline';
//import { stdin as input, stdout as output } from 'node:process';
//import * as fs from "node:fs";
//import * as path from 'node:path';
var fs = require("fs");
var input = require("node:process").stdin;
var output = require("node:process").stdout;
var path = require("path");

var fileName = path.join(__dirname, "/text.txt");

const rl = readline.createInterface({ input, output });

fs.open(fileName, "w", function(err) {
  if (err != null) console.error(err);
});

console.log("Введите данные для записи в файл:");

rl.on("line", (input) => {
  if (input === "exit") {
    rl.close();
  }else{
    fs.appendFile(fileName, input + "\n", function(err) {
      if (err != null) console.error(err);
    })
    //console.log("Данные записаны. Продолжайте:");
  }
}
);

rl.on("close",() => {
  console.log("Ввод данных завершен. Все сохранено в файл text.txt");
});
