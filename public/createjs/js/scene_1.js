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
      TEXT.typeList = ["学籍照", "体检照", "毕业证照", "英语四级", "居住证", "结婚证"];
      TEXT.sizeList = [[23,36], [28,40], [35, 50], [32, 45], [40,60], [42,55]];
      var picList = TEXT.typeList.map(function(item, index, list) {
        var typePic = new createjs.Bitmap(IMG["type" + index]);
        container.addChild(typePic);
        var bounds = typePic.getBounds();
        typePic.regX = bounds.width/2;
        typePic.regY = bounds.height/2;
        typePic.x = W/2;
        typePic.y = H/(list.length) * (list.length - index - 0.5) - H;
        typePic.scaleX = 1;
        typePic.scaleY = 1;

        Tween.get(typePic).wait( index * 100)
             .to({y: H/(list.length) * (list.length - index - 0.5)}, 2000, Ease.getPowOut(5))
             .wait((list.length - index) * 30)
             .to({y: H - H/list.length*0.6, x: W/(list.length) * (index + 0.5), scaleX: 0.8, scaleY: 0.8}, 1200, Ease.cubicInOut)
             .call(nextAnimation);
        function nextAnimation(argument) {
          if (index === 0) {   // 最后一个才触发下一个动画，避免多次触发
            showBottomTypeWord();
          }
        }

        return typePic;
      });


    }

    // 出现底部的文字
    function showBottomTypeWord() {
      var bottomTypeWordList = TEXT.typeList.map(function(item, index, list) {
        var length = list.length;

        var word = new createjs.Text(item, "28px Arial", "blue");
        container.addChild(word);
        word.textAlign = "center";
        word.alpha = 0;
        word.x = (W / length) * (index + 0.5);
        word.y = H - 45;
        Tween.get(word).wait(index * 100).to({alpha: 1, y: H - 30}, 800, Ease.quadInOut).call(function() {
          if (index === 0) {
          }
        });

        return word;
      });
      showDefaultSizePhoto();
    }

    // 出现默认大小的图片
    function showDefaultSizePhoto() {
      // 将图片及背景色放入一个新的容器中，方面大小调整
      var photoContainer = new createjs.Container();
      var photo = new createjs.Bitmap(IMG.photo);
      var photoBounds = photo.getBounds();
      var bg_white = new createjs.Graphics().beginFill("#ff0").drawRect(0, 0, photoBounds.width,photoBounds.height);
      var bgc = new createjs.Shape(bg_white);
      photoContainer.addChild(bgc);
      photoContainer.addChild(photo);
      container.addChild(photoContainer);

      var mask = new createjs.Shape(new createjs.Graphics().beginFill("#fff").drawRect(0, 0, photoBounds.width,photoBounds.height));
      photoContainer.addChild(mask);
      mask.regX = photoBounds.width/2;
      mask.regY = photoBounds.height/2;
      mask.visible = false;
      mask.x = photoBounds.width/2;
      mask.y = photoBounds.height/2;

      mask.scaleX = 0.8;

      bgc.mask = mask;
      photo.mask = mask;

      var photoContainerBounds =  photoContainer.getBounds();
      photoContainer.regX = photoContainerBounds.width / 2;
      photoContainer.regY = photoContainerBounds.height / 2;
      photoContainer.x = W * 0.5;
      photoContainer.y = H * 0.4;
      photoContainer.scaleX = 0;
      photoContainer.scaleY = 0;
      photoContainer.alpha = 1;
      Tween.get(photoContainer).to({alpha: 1, scaleX: 0.5, scaleY: 0.5}, 1800, Ease.getElasticOut(1.02, 0.3))
      .call(chooseTypeAndShowSize);

    }

    // 手指点击，跳到相应的图片大小
    function chooseTypeAndShowSize() {
      var currentIndex = 0;
      var hand = new createjs.Bitmap(IMG.hand);
      container.addChild(hand);
      hand.x = W * 0.8;
      hand.y = H * 1.2;
      hand.scaleX = 0.3;
      hand.scaleY = 0.3;

      // 点击第一个，点击第三个， 点击第四个
      choseType([0, 2, 3]);
      function choseType(indexList) {
        var typeLength = TEXT.typeList.length;
        if (currentIndex < indexList.length) {
          // 移动手指
          Tween.get(hand).to({x: (W / typeLength) * (indexList[currentIndex] + 0.5), y: H - H/typeLength*0.6}, 800, Ease.cubicInOut)
          .call(function() {
            // 改变尺寸
            console.dir(container);
          });


        }
      }



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