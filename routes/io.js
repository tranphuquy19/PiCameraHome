var express = require("express");
var router = express.Router();
var { getImage, getVideo } = require("../libs/camUtils");

module.exports = io => {
  io.on("connection", socket => {
    io.emit("serverSendDataObject", {
      command: "test",
      payload: 123
    });

    socket.on("clientSendDataObject", obj => {
      const { command, payload } = obj;
      switch (command) {
        case "GET_IMAGE":
          const filename = getImage();
          socket.emit("serverSendDataObject", {
            command: "SEND_IMAGE",
            payload: {
              filename
            }
          });
          break;
        case "GET_VIDEO":
          break;
        default:
          break;
      }
    });
  });

  return router;
};
