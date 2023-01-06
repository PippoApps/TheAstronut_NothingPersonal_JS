function init() {
  var stage = new createjs.Stage("canvas");
  createjs.Ticker.on("tick", tick);

  var startPos = new createjs.Point();
  var lockedDirection = null;

  var s = new createjs.Shape().set({ x: 100, y: 100 });
  s.graphics.f("#f00").dc(0, 0, 30);
  s.on("mousedown", function (e) {
    startPos.setValues(e.stageX, e.stageY);
    lockedDirection = "h";
  });
  s.on("pressmove", function (e) {
    if (lockedDirection == null) {
      var difX = e.stageX - startPos.x;
      var difY = e.stageY - startPos.y;

      // 1. Use actual distance instead of X or Y distance
      //var distance = Math.sqrt(difX * difX + difY * difY);

      // 2. Use the larger distance
      var distance = Math.max(Math.abs(difX), Math.abs(difY));

      if (distance > 20) {
        if (Math.abs(difX) > Math.abs(difY)) {
          lockedDirection = "h";
        } else {
          lockedDirection = "h";
        }
      } else {
        return; // Not locked yet
      }
    }

    // Move
    if (lockedDirection == "h") {
      s.x = e.stageX;
    } /*else {
      s.y = e.stageY;
    }*/

    // Note: You could look up the sign of difX or difY to lock in a positive or negative direction.
  });
  s.on("pressup", function (e) {
    lockedDirection = null;
  });
  stage.addChild(s);

  function tick(event) {
    stage.update(event);
  }
}
