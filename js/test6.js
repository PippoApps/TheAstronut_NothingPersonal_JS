var stage = new createjs.Stage("canvas");
var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete);
queue.loadManifest([{ id: "myImage", src: "img/frame001-low.jpg" }]);
console.log(queue);

// var placeHold = new Image();
// placeHold.src = "img/frame100-low.jpg";
// var bitmap2 = new createjs.Bitmap(placeHold);
// console.log(bitmap2);
// stage.addChild(bitmap2);
// stage.update();

function handleComplete() {
  var placeHold = new Image();
  placeHold.src = "img/frame100-low.jpg";
  var bitmap2 = new createjs.Bitmap(placeHold);
  console.log(bitmap2);
  stage.addChild(bitmap2);
  stage.update();
  // var image = queue.getResult("myImage");
  // var bitmap = new createjs.Bitmap(image);
  // stage.addChild(bitmap);
  // console.log(bitmap);
  // stage.update();

  // var placeHold = new Image();
  // placeHold.src = "img/frame001-low.jpg";
  // var bitmap2 = new createjs.Bitmap(placeHold);
  // console.log(bitmap2);
  // stage.addChild(bitmap2);
  // stage.update();

  // var img1 = queue.getResult("one");
  // var img2 = queue.getResult("two");

  // var someBitmap = new createjs.Bitmap(img1);
  // stage.addChild(someBitmap); //first image is visible now

  // //let's wait for a second and then call the function
  // //img2 is reference to the second image
  // setTimeout(function () {
  //   changeImage(someBitmap, img2);
  // }, 1000);
}

// function changeImage(bitmap, img) {
//   bitmap.image = img; //so image is changed
// }
