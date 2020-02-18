const { StillCamera } = require("pi-camera-connect");
const fs = require("fs");

const stillCamera = new StillCamera();

stillCamera.takeImage().then(image => {
  fs.writeFileSync(__dirname + "imageTest.jpg", image);
});
