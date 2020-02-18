const fs = require("fs");
const path = require("path");
const filesize = require("filesize");
const moment = require("moment");
moment.locale("vi");

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

module.exports = {
  getFileInfo: filePath => {
    const { birthtime, size } = fs.statSync(filePath);

    return {
      filename: path.basename(filePath),
      birthtime: moment(birthtime).format("DD/MM/YYYY HH:mm:ss"),
      fromNow: moment(birthtime).fromNow(),
      filesize: filesize(size)
    };
  },
  getAllFiles: dirPath => {
    let files_ = [];
    let files = fs.readdirSync(dirPath);
    for (let i in files) {
      let name = dirPath + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }
};
