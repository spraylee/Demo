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

      var w = logo.getBounds().width;
      var h = logo.getBounds().height;

      logo.x = W - w >> 1;
      logo.y = h * -0.5 + H * 0.35;

      logo.alpha = 0;
      Tween.get(logo).to({alpha:1}, 400).call(showLeftWord);
    }


    // 出现左边的文字
    function showLeftWord() {
      var leftWord = new createjs.Text(TEXT.leftWord, "bold 24px Heiti", "blue");
      container.addChild(leftWord);
      leftWord.textAlign = "center";
      leftWord.x = - W;
      leftWord.y = H * 0.65;
      Tween.get(leftWord).to({x: W * 0.4, y: H*0.6}, 1000, Ease.getBackIn(8.5));
      Tween.get(leftWord).wait(300).call(showRightWord);
    }

    // 出现右边的文字
    function showRightWord() {
      var rightWord = new createjs.Text(TEXT.rightWord, "bold 24px Heiti", "blue");
      container.addChild(rightWord);
      rightWord.textAlign = "center";
      rightWord.x = 2*W;
      rightWord.y = 0.7*H;
      Tween.get(rightWord).to({x:W * 0.6,y:H*0.68}, 1000, Ease.getBackIn(8.5)).wait(500).call(moveHand);
    }

    // 点击动画
    function moveHand() {
      var hand = new createjs.Bitmap(IMG.hand);
      container.addChild(hand);
      hand.x = W * 1;
      hand.y = H * 0.8;
      hand.setTransform(hand.x,hand.y,0.3,0.3);
      Tween.get(hand).to({x:W*0.5, y:H*0.35}, 1200, Ease.quadInOut).wait(200).call(showMask);
    }

    // 转场遮罩出现
    function showMask() {
      var container_mask = new createjs.Container();
      window._VAR.container_mask_0 = container_mask;        // 将遮罩容器添加到全局，方便后面删除
      stage.addChild(container_mask);
      var mask = new createjs.Bitmap(IMG.blueCircle);
      container_mask.addChild(mask);
      var bounds = mask.getBounds();
      mask.regX = bounds.width/2;
      mask.regY = bounds.height/2;
      mask.x = W/2;
      mask.y = H*0.35;
      mask.scaleX = 0;
      mask.scaleY = 0;
      Tween.get(mask).to({scaleX: 10,scaleY: 10}, 2000, Ease.quintOut);
      Tween.get(mask).wait(1000).to({alpha: 0.7}, 2400, Ease.quintOut);
      Tween.get(container).wait(1000).call(function() {
        stage.removeChild(container);
        $(window).trigger("showScene_0_over");
      });
    }


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