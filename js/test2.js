function init() {
  // Creiamo lo Stage e lo associamo al nostro canvas

  // capire bene come gestire la dimensione perchè se viene definito in pixel
  // e poi cambiato coi css come minimo perde definizione se non si sputtana proprio
  //in realtà non mi pare
  var stage = new createjs.Stage("demoCanvas");

  //questo serve per poter scrivere sul canvas?

  // abitiamo il mouseover
  stage.enableMouseOver(20);

  //prova per vedere se con responsive funziona
  //ora canvas a 100% e hardcoded a 1920x1080, grandezza img
  const stageWidth = stage.canvas.clientWidth;
  const stageHeight = stage.canvas.clientHeight;

  //provo a mettere la prima immagine della sequenza come placeholder
  var image = new Image();
  image.src = "./img/frame001-low.jpg";
  image.onload = handleImageLoad;

  // e niente succederà se non si fa un bel update
  stage.update();

  let direction = "",
    oldx = 0;
  function handleImageLoad(event) {
    var image = event.target;
    var bitmap = new createjs.Bitmap(image);
    console.log(bitmap);
    stage.addChild(bitmap);

    // aggiungiamo un listener sul cerchio
    bitmap.on("pressmove", function (event) {
      if (event.stageX < oldx) {
        direction = "left";
      } else if (event.stageX > oldx) {
        direction = "right";
      }

      oldx = event.pageX;
      //event.stageX - window.innerWidth / 2 > 0 ? "right" : "left";
      console.log("direction: " + direction);
      console.log("stageWidth: " + stageWidth);
      console.log("event.stageX: " + event.stageX);
      console.log("window.innerWidth: " + window.innerWidth);
      console.log("event.pageX: " + event.pageX);
    });

    stage.update();
  }
}
