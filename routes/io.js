var express = require("express");
var router = express.Router();
var { getImage, getVideo } = require("../libs/camUtil");

module.exports = io => {
  io.on("connection", socket => {
    io.emit("serverSendDataObject", {
      command: "test",
      payload: 123
    });

    socket.on("clientSendDataObject", async obj => {
      const { command, payload } = obj;
      switch (command) {
        case "GET_IMAGE":
          const result = await getImage();
          io.emit("serverSendDataObject", {
            command: "SEND_IMAGE",
            payload: {
              ...result
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
