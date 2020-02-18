const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  resize: (path, width, quality) => {
    const readStream = fs.createReadStream(path);
    let transform = sharp();
    if (width || quality) {
      transform = transform.resize(width).jpeg({quality});
    }else{
        transform = transform.resize(300).jpeg({quality: 60});
    }
    return readStream.pipe(transform);
  }
};
