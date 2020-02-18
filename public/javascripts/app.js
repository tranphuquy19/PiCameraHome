let url_origin = window.location.origin;
let socket = io(url_origin);

let objs = [];

function getCardElement(element) {
  const { filename, birthtime, fromNow, filesize } = element;
  let e = `<div class="col-md-4" id="${filename}">
  <div class="card mb-4 box-shadow">
      <img class="card-img-top"
          src="/imgs/${filename}"
          alt="${filename}">
      <div class="card-body">
          <p class="card-text"><b>File name:</b> ${filename}</br><b>Created at:</b> ${birthtime}</br><b>File size:</b> ${filesize}</p>
          <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                  <a href="/imgs/${filename}" target="_blank" type="button" class="btn btn-sm btn-outline-primary">Xem</a>
                  <button type="button" class="btn btn-sm btn-outline-danger">Xóa</button>
              </div>
              <small class="text-muted">${fromNow}</small>
          </div>
      </div>
  </div>
</div>`;
  return e;
}

function getCards(data) {
  return data.map(e => {
    return getCardElement(e);
  });
}

function rendCards() {}

socket.on("serverSendDataObject", obj => {
  const { command, payload } = obj;
  switch (command) {
    case "SEND_ALL_DATA":
      break;
    case "SEND_IMAGE":
      console.log(obj);
      $("#cardArray").prepend(getCardElement(obj.payload));
      break;
    case "SEND_VIDEO":
      break;
    default:
      break;
  }
});

$("#btnGetImage").click(() => {
  socket.emit("clientSendDataObject", { command: "GET_IMAGE", payload: {} });
});

$("#btnGetVideo").click(() => {
  socket.emit("clientSendDataObject", { command: "GET_VIDEO", payload: {} });
});
