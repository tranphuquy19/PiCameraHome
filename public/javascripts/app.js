var url_origin = window.location.origin;
var socket = io(url_origin);

socket.on("serverSendDataObject", obj => {
  console.log(obj);
});

$("#btnGetImage").click(() => {
  console.log(123123);
  socket.emit("clientSendDataObject", { command: "GET_IMAGE", payload: {} });
});

$("#btnGetVideo").click(() => {
  socket.emit("clientSendDataObject", { command: "GET_VIDEO", payload: {} });
});
