/**
 * =============================================================================
 *
 *  TITLE   :  APP介绍动画
 *  for page:  文件主入口
 *
 *  文件运行流程：
 *          Main.js调用其他文件，文件之间通过事件的方式进行通信
 *          Main.js调用  load.js资源加载   和   scene.js动画场景
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

  var dpr = 3;
  window._VAR = {
    w: window.innerWidth * dpr,
    h: window.innerHeight * dpr,
    PFS: 60
  }

  window._IMG = {};
  window._TEXT = {
    leftWord: "邮政快照轻松拍",
    rightWord: "方寸之间显风采"
  }



  var canvas = document.getElementById('stage');

  canvas.width = _VAR.w;
  canvas.height = _VAR.h;

  _VAR.stage = new createjs.Stage(canvas);
  _VAR.container_0 = new createjs.Container();
  _VAR.stage.addChild(_VAR.container_0);


  createjs.Ticker.setFPS(_VAR.FPS);
  createjs.Ticker.on("tick", HANDLER_refresh);





  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */


  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
  $("#page-main").on("open", HANDLER_initPage);


  $(window).on("loadImages_over", HANDLER_sceneStart);

  $(window).on("touchstart", function(event) {
    event.preventDefault();
  });


  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  function HANDLER_initPage(event) {
    $(window).trigger("loadImages");
  }

  function HANDLER_refresh(event) {
    _VAR.stage.update();
  }

  function HANDLER_sceneStart(event) {
    $(window).trigger("sceneStart");
  }




  /**
   * ---------------------------------------------------------------------------
   *  Util Funtion  // 提供自定义的全局方法
   * ---------------------------------------------------------------------------
   */
  // 调整createjs图像元素的大小（W的倍数），及圆点放到中心
  window.adjustSize = function (obj, width) {
    var bounds = obj.getBounds();
    obj.regX = bounds.width / 2;
    obj.regY = bounds.height / 2;
    obj.scaleX = width / bounds.width;
    obj.scaleY = obj.scaleX;
  }

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