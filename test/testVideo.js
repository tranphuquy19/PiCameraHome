const { StreamCamera, Codec } = require("pi-camera-connect");
const fs = require("fs");

const streamCamera = new StreamCamera({
  codec: Codec.H264
});

const writeStream = fs.createWriteStream("video-stream.h264");

const videoStream = streamCamera.createStream();

videoStream.pipe(writeStream);

streamCamera.startCapture().then(() => {
  setTimeout(() => streamCamera.stopCapture(), 5000);
});
