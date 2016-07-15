/**
 * =============================================================================
 *
 *  TITLE   :  APP介绍页面
 *  for page:  动画场景二
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
  var IMG = window._IMG;
  var TEXT = window._TEXT;

  var W = window._VAR.w;
  var H = window._VAR.h;

  var Ease = createjs.Ease;
  var Tween = createjs.Tween;

  var lastMaskContainer = window._VAR.container_mask_0;



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
  $(window).on("showScene_1", HANDLER_animate);



  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_animate(event) {

    var container = new createjs.Container();   // 创建新容器
    window._VAR.container_1 = container;       // 添加到全局对象
    stage.addChild(container);                 // 加到舞台中

    // 入口
    showPicAndText();

    // 出现各种快照类型和相应的文字
    function showPicAndText() {
      // 对于的load.js中，对于的图片命名必须为 type0, type1, type2，且个数保持一致
      var textList = ["学籍照", "体检照", "毕业证照", "英语四级", "居住证", "结婚证"];
      var picList = textList.map(function(item, index, list) {
        var typePic = new createjs.Bitmap(IMG["type" + index]);
        container.addChild(typePic);
        var bounds = typePic.getBounds();
        typePic.regX = bounds.width/2;
        typePic.regY = bounds.height/2;
        typePic.x = W/2;
        typePic.y = H/(list.length) * (list.length - index - 0.5) - H;
        typePic.scaleX = 0.6;
        typePic.scaleY = 0.6;

        Tween.get(typePic).wait( index * 100)
             .to({y: H/(list.length) * (list.length - index - 0.5)}, 2000, Ease.getPowOut(5))
             .wait((list.length - index) * 30)
             .to({y: H - H/list.length*0.5, x: W/(list.length) * (index + 0.5), scaleX: 0.4, scaleY: 0.4}, 1200, Ease.cubicInOut);

        return typePic;
      });


    }

    // 出现底部的文字
    function showLeftWord() {
      var leftWord = new createjs.Text(TEXT.leftWord, "24px Heiti", "blue");
      container.addChild(leftWord);
      leftWord.textAlign = "center";
      leftWord.x = - W;
      leftWord.y = H * 0.65;
      Tween.get(leftWord).to({x: W * 0.4, y: H*0.6}, 1000, Ease.getBackIn(8.5));
      Tween.get(leftWord).wait(300).call(showRightWord);
    }

    // 图片排在底部
    function showRightWord() {
      var rightWord = new createjs.Text(TEXT.rightWord, "24px Heiti", "blue");
      container.addChild(rightWord);
      rightWord.textAlign = "center";
      rightWord.x = 2*W;
      rightWord.y = 0.7*H;
      Tween.get(rightWord).to({x:W * 0.6,y:H*0.68}, 1000, Ease.getBackIn(8.5)).call(moveHand);
    }

    // 出现主图片
    function moveHand() {
      var hand = new createjs.Bitmap(IMG.hand);
      container.addChild(hand);
      hand.x = W * 1;
      hand.y = H * 0.8;
      hand.setTransform(hand.x,hand.y,0.3,0.3);
      Tween.get(hand).to({x:W*0.5, y:H*0.35}, 1200, Ease.quadInOut).wait(200).call(showMask);
    }

    // 手指点击，跳到相应的图片大小
    function showMask() {
      var mask = new createjs.Bitmap(IMG.blueCircle);
      stage.addChild(mask);
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
    // 内容隐去，出现不同底色的照片

    // 手指点击该照片，出现完整的一版照片

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