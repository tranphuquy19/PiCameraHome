const PiCamera = require("pi-camera");

const imageDef = {
  mode: "photo",
  output: `${__dirname}/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true
};

const camera = new PiCamera(imageDef);

camera
  .snap()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    // Handle your error
  });
