const fs = require("fs");
const path = require("path");
const filesize = require("filesize");
const moment = require("moment");
moment.locale("vi");

module.exports = {
  getFileInfo: filePath => {
    const { birthtime, size } = fs.statSync(filePath);

    return {
      filename: path.basename(filePath),
      birthtime: moment(birthtime).format('DD/MM/YYYY HH:mm:ss'),
      fromNow: moment(birthtime).fromNow(),
      filesize: filesize(size)
    };
  }
};
