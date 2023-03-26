window.showTutorial = function () {
  swal({
    title: "使用说明"
    , html: true
    , confirmButtonText: "知道了"
    , text: "<ul>" +
      "    <li><strong>单击鼠标左键</strong>: 逆时针旋转图形（向左旋转）</li>" +
      "    <li><strong>单击鼠标右键</strong>: 顺时针旋转图形（向右旋转）</li>" +
      "    <li><strong>按住CTRL，然后点击鼠标左键进行图形翻转</strong></li>" +
      "    <li><strong>长按鼠标左键进行图形移动</strong></li>" +
      "</ul>" +
      "<div class='made-with-heart'>" +
      // "    <span class='octicon octicon-pencil'></span>修改着作者：Lynn， Based on <span class='octicon octicon-heart'></span> by <a href='http://ionicabizau.net'>Ionică Bizău</a>" +
      "</div>"
  })
};

function eventBind(c, x, y) {
  var moved = false;
  var angle = 0;
  var cPol = c.children()[0];
  c.translate(x, y);
  c.draggy();
  c.on("dragmove", function () {
    moved = true;
  });

  var iiii;
  // cPol.on("mousedown", function (e) {
  //   clearInterval(iiii);
  //   moved = false;
  //   var _node = this.node;
  //   var _e = e;
  //   iiii = setInterval(function (){
  //     if (!moved) {
  //       var t = _node.style.transform;
  //       if (_e.ctrlKey) {
  //         _node._scale = (_node._scale || 1) === 1 ? -1 : 1;
  //       } else {
  //         angle += (e.button === 2 ? 1 : -1) * 3;
  //       }
  //       Crossy(_node, "transform", "rotate(" + angle + "deg) scaleX(" + (_node._scale || 1) + ")");
  //     }
  //     moved = false;
  //     e.preventDefault();
  //   }, 30);
  // });

  // cPol.on("mouseleave", function (e) {
  //   if(iiii){
  //     clearInterval(iiii);
  //   }
  // });
  // cPol.on("mouseup", function (e) {
  //   if(iiii){
  //     clearInterval(iiii);
  //   }
  // });

  // cPol.on("click", function (e) {
  //   clearInterval(iiii);
  //   moved = false;
  //   var _node = this.node;
  //   var _e = e;
  //   if (!moved) {
  //     var t = _node.style.transform;
  //     if (_e.ctrlKey) {
  //       _node._scale = (_node._scale || 1) === 1 ? -1 : 1;
  //     } else {
  //       angle += (e.button === 2 ? 1 : -1) * 15;
  //     }
  //     Crossy(_node, "transform", "rotate(" + angle + "deg) scaleX(" + (_node._scale || 1) + ")");
  //   }
  //   moved = false;
  //   e.preventDefault();
  // });


  cPol.on("mousedown", function () {
    moved = false;
  });

  cPol.on("mouseup", function (e) {
    if (!moved) {
      var t = this.node.style.transform;

      if (e.ctrlKey) {
        this.node._scale = (this.node._scale || 1) === 1 ? -1 : 1;
      } else {
        angle += (e.button === 2 ? 1 : -1) * 15;
      }

      Crossy(this.node, "transform", "rotate(" + angle + "deg) scaleX(" + (this.node._scale || 1) + ")");
    }
    moved = false;
    e.preventDefault();
  });

  cPol.on("contextmenu", function (e) {
    e.preventDefault();
  });
}

window.addEventListener("load", function () {

  var t = new SVG(document.querySelector(".graph")).size("2000", "100%");
  var winSize = {
    w: window.innerWidth
    , h: window.innerHeight
  };
  var elements = t.group().id("elements");

  var colors = ["#e74c3c", "#f7a1ed", "#2ecc71", "#f1c40f", "#3498db"];
  var shapeSize = [30, 60, 90, 120];

  var shapes = [];
  var num = 0;
  for (let i = 0; i < 3; i++) {
    for (let cm = 0; cm < shapeSize.length; cm++) {
      for (let col = 0; col < colors.length; col++) {
        var shapeA = elements.group();
        if (i == 0) {
          //画三角形
          shapeA.polygon("0,0 " + shapeSize[cm] + "," + shapeSize[cm] + " " + shapeSize[cm] + ",0").fill(colors[col]);
          eventBind(shapeA, col * 30 + 300, cm * 34 + 10);
        } else if (i == 1) {
          //画正方形
          shapeA.polygon("0,0 0," + shapeSize[cm] + " " + shapeSize[cm] + "," + shapeSize[cm] + " " + shapeSize[cm] + ",0").fill(colors[col]);
          eventBind(shapeA, col * 30 + 700, cm * 31 + 10);
        } else if (i == 2) {
          //画圆
          shapeA.circle(shapeSize[cm]).fill(colors[col]);
          eventBind(shapeA, col * 30 + 1000, cm * 34 + 10);
        }
        shapes[num] = shapeA;
        num++;
      }
    }
  }

  // // 3. Medium Triangle
  // shapes[2].polygon(size + "," + size + " " + half + "," + size + " " + size + "," + half).fill("");
  // // 5. Small Triangle
  // shapes[4].polygon(half + "," + half + " " + quart + "," + q3 + " " + q3 + "," + q3).fill("");

  // // 6. Square
  // shapes[5].polygon(half + "," + half + " " + q3 + "," + q3 + " " + size + "," + half + " " + q3 + "," + quart).fill("#9b59b6");


  Crossy("polygon", "transformOrigin", "center");
  Crossy("polygon", "transformBox", "fill-box");
  Crossy("polygon", "transition", "all 500 ease");

});
