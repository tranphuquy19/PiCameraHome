const express = require("express");
const router = express.Router();
const { storePath } = require("../config");
const { getImage, getVideo } = require("../libs/camUtil");
const { getAllFiles, getFileInfo } = require("../libs/fileUtil");

module.exports = io => {
  io.on("connection", socket => {
    const allFiles = getAllFiles(storePath);
    const payload = allFiles.map(file => {
      return getFileInfo(file);
    });
    socket.emit("serverSendDataObject", {
      command: "SEND_FILES",
      payload
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
