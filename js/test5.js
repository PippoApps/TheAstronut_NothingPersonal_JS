function loadImage() {
  var preload = new createjs.LoadQueue();
  preload.addEventListener("fileload", handleFileComplete);
  preload.loadFile("../../apo/img/frame001-low.jpg");
}

function handleFileComplete(event) {
  document.body.appendChild(event.result);
}
