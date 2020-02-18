const { StillCamera } = require("pi-camera-connect");
const { StreamCamera, Codec } = require("pi-camera-connect");
const fs = require("fs");
const path = require("path");
const fileUtil = require("./fileUtil");
const { storePath } = require("../config");

module.exports = {
  getImage: async () => {
    const stillCamera = new StillCamera();
    const filename = `${new Date().getTime()}.jpg`;
    const filePath = path.join(storePath, filename);

    let image = await stillCamera.takeImage();
    fs.writeFileSync(filePath, image);

    return fileUtil.getFileInfo(filePath);
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
