/**
 * =============================================================================
 *
 *  TITLE   :  CANVAS STUDY
 *  for page:  page-main
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-15
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  console.log("load .js");



  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */
  var W = window.innerWidth;
  var H = window.innerHeight;

  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */
  function init() {
    var canvas = document.getElementById('stage');
    canvas.width = W;
    canvas.height = H;

    var stage = new createjs.Stage(canvas);
    console.dir(stage);

    var title = new createjs.Text("Spray Lee");

    var text1 = new createjs.Text("Center");
    text1.textAlign = "center";
    text1.x = W / 2;

    var bottom = new createjs.Text("bottom","80px Arial", "#f00");
    bottom.textAlign = "center";
    bottom.x = W / 2;
    bottom.y = H - bottom.getBounds().height;
    console.dir(bottom);
    console.dir(bottom.getBounds());



    stage.addChild(title);
    stage.addChild(text1);
    stage.addChild(bottom);
    stage.update();


    var container = new createjs.Container();
    stage.addChild(container);

    var rect = new DrawRect();

    // function DrawRect() {
    //   // createjs.Shape.call(this);
    //   this.graphics.beginFill("green").drawRect(0, 0, 50, 50);
    //   this.setBounds(0, 0, 50, 50);
    // }
    // DrawRect.prototype = createjs.Shape();


    //绘制矩形 类


    rect.on("click", function() {
      alert("pause");
    });

    var r_w = rect.getBounds().width;
    var r_h = rect.getBounds().height;

    rect.x = 10;
    rect.y = 10;

    container.addChild(rect);

    stage.update();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", function() {
      var speed = 5;
      var index, min = 10000;
      [rect.x, rect.y, W - rect.x - r_w, H - rect.y - r_h].forEach(function(item, index) {

      });

    });

  }
  function DrawRect() {
      createjs.Shape.call(this);//继承Shap类
      this.graphics.beginFill("rgba(28,33,188,0.4)").drawRect(0, 0, 50, 50);
      this.setBounds(0,0,50,50);//设置矩形的边界属性，这样可以获得width和height属性
  }
  DrawRect.prototype = new createjs.Shape();//获得原型方法
  init();

  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */




  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */



})(window, document, $);