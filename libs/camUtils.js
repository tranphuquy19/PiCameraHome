const { StillCamera } = require("pi-camera-connect");
const { StreamCamera, Codec } = require("pi-camera-connect");
const fs = require("fs");
const path = require("path");
const {imagePathDir, videoPathDir} = require('../config');

module.exports = {
  getImage: () => {
    const stillCamera = new StillCamera();
    const filename = `${new Date().getTime()}.jpg`;

    stillCamera.takeImage().then(image => {
      fs.writeFileSync(path.join(imagePathDir, filename), image);
    });
    return filename;
  },

  getVideo: timeout => {
    const streamCamera = new StreamCamera({
      codec: Codec.H264
    });

    const writeStream = fs.createWriteStream("video-stream.h264");

    const videoStream = streamCamera.createStream();

    videoStream.pipe(writeStream);

    streamCamera.startCapture().then(() => {
      setTimeout(() => streamCamera.stopCapture(), timeout);
    });
  }
};
