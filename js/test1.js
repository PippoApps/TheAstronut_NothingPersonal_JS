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

  var circle = new createjs.Shape();
  circle.graphics.beginFill("blue").drawCircle(0, 0, 150);
  circle.x = stageWidth;
  circle.y = stageHeight / 2 + 150;
  console.log("stageWidth =" + stage.canvas.clientWidth);
  stage.addChild(circle);

  // e niente succederà se non si fa un bel update
  stage.update();

  // aggiungiamo un listener sul cerchio
  circle.on("pressmove", function (event) {
    let direction = event.stageX - window.innerWidth / 2 > 0 ? "right" : "left";
    console.log("direction: " + direction);
    console.log("stageWidth: " + stageWidth);
    console.log("event.stageX: " + event.stageX);
    console.log("window.innerWidth: " + window.innerWidth);
    console.log("event.pageX: " + event.pageX);
  });

  stage.update();
}
