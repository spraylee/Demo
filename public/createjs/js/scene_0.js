/**
 * =============================================================================
 *
 *  TITLE   :  APP介绍页面
 *  for page:  动画场景一
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
  var stage = window._VAR.stage;
  var container = window._VAR.container_0;
  var IMG = window._IMG;
  var TEXT = window._TEXT;

  var W = window._VAR.w;
  var H = window._VAR.h;

  var Ease = createjs.Ease;
  var Tween = createjs.Tween;
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
  $(window).on('showScene_0', HANDLER_animate);



  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_animate(event) {

    // 入口
    showLogo();

    // 出现LOGO
    function showLogo() {
      var logo = new createjs.Bitmap(IMG.logo);
      container.addChild(logo);

      adjustSize(logo, 0.35 * W);

      logo.x = W / 2;
      logo.y = H * 0.3;

      logo.alpha = 0;
      Tween.get(logo).to({alpha:1}, 400).call(showWord);
    }


    // 出现下边的文字
    function showWord() {
      var word = new createjs.Bitmap(IMG.adText);
      container.addChild(word);
      adjustSize(word, 0.7 * W);
      word.x = 0.5 * W;
      word.y = H * 0.58;
      word.alpha = 0;
      Tween.get(word).to({y: H*0.55, alpha: 1}, 1000, Ease.cubicOut);
      Tween.get(word).wait(300).call(showLine);
    }

    // 线出现的动画
    function showLine() {
      var line = new createjs.Bitmap(IMG.line);;
      container.addChild(line);
      adjustSize(line, 0.7 * W);
      line.x = W / 2;
      line.y = H * 0.6;

      var mask_graphics = new createjs.Graphics().beginFill("red").drawRect(0,0,W,H);
      var mask = new createjs.Shape(mask_graphics);
      mask.scaleX = 0;
      line.mask = mask;
      Tween.get(mask).to({scaleX: 1}, 600, Ease.linear).wait(500).call(moveHand);
    }

    // 点击动画
    function moveHand() {
      var hand = new createjs.Bitmap(IMG.hand);
      container.addChild(hand);
      adjustSize(hand, 0.2 * W);
      hand.x = W * 1.2;
      hand.y = H * 0.8;
      Tween.get(hand).to({x:W*0.6, y:H*0.35}, 1200, Ease.cubicOut).wait(200).call(showMask);
    }

    // // 转场遮罩出现
    // function showMask() {
    //   var container_mask = new createjs.Container();
    //   window._VAR.container_mask_0 = container_mask;        // 将遮罩容器添加到全局，方便后面删除
    //   stage.addChild(container_mask);
    //   var mask = new createjs.Bitmap(IMG.blueCircle);
    //   container_mask.addChild(mask);
    //   var bounds = mask.getBounds();
    //   mask.regX = bounds.width/2;
    //   mask.regY = bounds.height/2;
    //   mask.x = W/2;
    //   mask.y = H*0.35;
    //   mask.scaleX = 0;
    //   mask.scaleY = 0;
    //   Tween.get(mask).to({scaleX: 10,scaleY: 10}, 2000, Ease.quintOut);
    //   Tween.get(mask).wait(1000).to({alpha: 0.7}, 2400, Ease.quintOut);
    //   Tween.get(container).wait(1000).call(function() {
    //     stage.removeChild(container);
    //     $(window).trigger("showScene_0_over");
    //   });
    // }


  }




  /**
   * ---------------------------------------------------------------------------
   *  Util Function
   * ---------------------------------------------------------------------------
   */
  function getWidth(createjsObj) {
    return createjsObj.getBounds().width;
  }
  function getHeight(createjsObj) {
    return createjsObj.getBounds().height;
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