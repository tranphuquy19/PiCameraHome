let url_origin = window.location.origin;
let socket = io(url_origin);

let objs = [];

function getCardElement(element) {
  const { filename, birthtime, fromNow, filesize } = element;
  let e = `<div class="col-md-3" id="${filename}">
  <div class="card mb-4 box-shadow">
      <img class="card-img-top"
          src="/imgs/${filename}?w=300&q=80"
          alt="${filename}">
      <div class="card-body">
          <p class="card-text"><b>Tên file:</b> ${filename}</br><b>Ngày tạo:</b> ${birthtime}</br><b>Kích thước file:</b> ${filesize}</p>
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
  console.log(obj);
  switch (command) {
    case "SEND_FILES":
      payload.map(e => {
        $("#cardArray").prepend(getCardElement(e));
      });
      break;
    case "SEND_IMAGE":
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
