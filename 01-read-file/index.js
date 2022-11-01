var fs = require("fs");
var path = require("path");

var fileName = path.join( __dirname, "/text.txt");

var readStream = new fs.ReadStream(fileName);

readStream.on("readable", function(){
  var data = readStream.read();
  if (data != null) console.log(data.toString());
});

readStream.on("error", function(err){
  if (err.code == "ENOENT") {
    console.log("Файл " + fileName + " не найден!")
  }else{
    console.error(err);
  }
})

