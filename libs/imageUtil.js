const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  resize: (path, width, quality, brightness) => {
    const readStream = fs.createReadStream(path);
    let transform = sharp();
    if (width || quality) {
      transform = transform
        .modulate({
          brightness
        })
        .resize(width)
        .jpeg({ quality });
    } else {
      transform = transform.resize(300).jpeg({ quality: 60 });
    }
    return readStream.pipe(transform);
  }
};
