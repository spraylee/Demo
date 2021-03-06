/**
 * =============================================================================
 *
 *  TITLE   :  新手体验（游戏任务逻辑）
 *  for page:  #page-game
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-6-23
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */


  var $page           = $("#page-game");
  var $goodList       = $(".good-list");
  var $top            = $(".top-img");
  var $successWordImg = $(".success-word-img");
  var $bigGoodImg     = $(".big-good-img");
  var $mask           = $(".mask");
  var $maskBox        = $(".mask-box");
  var $photoBox       = $(".photo-box");
  var $finishMaskBox  = $(".finish-mask-box");
  var $hand           = $("#hand");
  var $carousel       = $("#carousel");
  var $hairTouchArea  = $(".hair-touch-area");


  var _posFrom = {      // 点击初始点
    x: 0,
    y: 0
  }
  var _leftFrom = 0;    // 元素初始位置
  var _topFrom  = 0;
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

  $(window).on("loadMission", HANDLER_loadMission);



  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  function HANDLER_loadMission(event, index) {
    initMissionStage(index);
    showTips(index);
    addEventBinding(index);
  }


  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */
  function initMissionStage(index) {
    console.log("initMissionStage: " + index);
    $photoBox.find(".mission").addClass("hide");
    $photoBox.find(".mission-" + index).removeClass("hide");
    $photoBox.find(".mission-" + index + ".first-hide").addClass("hide");
  }

  function showTips(index) {
    $hand.addClass("tips-" + index);
    $hand.removeClass("hide");
    $hand[0].dataset.word = window.CONFIG.tipsWord[index];


    // $photoBox.one("touchstart", function(event) {
    //
    //   $hand.addClass("hide");
    // });

  }
  function addEventBinding(index) {   // 第一关
    if (index === 0) {
      var success = false;
      // 调用第三方插件 interact, 提供相框惯性滑动效果
      interact('.mission-0.item')           // target the matches of that selector
        .draggable({                        // make the element fire drag events
          max: Infinity,                    // allow drags on multiple elements
          inertia: true,                    // 惯性
          onmove: function(event) {
            // 去掉手势提示
            $hand.addClass("hide");
            event.target.style.left = getStyleNum(event.target, "left") + event.dx + "px";
            event.target.style.top = getStyleNum(event.target, "top") + event.dy + "px";
          },
          onend: function(event) {
            if (checkAllOut() && !success) {
              success = true;
              $(window).trigger("successAndNext", [index + 1]);
            }
          }
        })

    } else if (index === 1) {     // 第二关
      // var state = "canMove";

      $carousel.on("touchend", function() {
        // 延时验证是否切换背景
        setTimeout(function() {
          if ($carousel.find(".carousel-indicators li").eq(1).hasClass("active")) {
            // 去掉手势提示
            $hand.addClass("hide");
            // 禁止再滑动回去
            $carousel[0].style.pointerEvents = "none";
            // 等待动画结束
            setTimeout(function() {
              // 出现正确人物图片
              $photoBox.find(".model-correct").removeClass("hide");
            }, 400);
            // 触发下一关
            setTimeout(function() {
              $(window).trigger("successAndNext", [index + 1]);
            }, 1400);
          }
        }, 10);
      });
    } else if (index === 2) {     // 第三关
      var MinDistance = 40;   // 最小触发距离
      var gapX, gapY;         // 各个方向上移动距离
      var success = false;    // 是否已经移动成功（避免多次触发下一关）
      $hairTouchArea.on("touchstart", function(event) {
        _posFrom.x = event.changedTouches[0].pageX;
        _posFrom.y = event.changedTouches[0].pageY;
      });
      $hairTouchArea.on("touchend", function(event) {
        gapX = event.changedTouches[0].pageX - _posFrom.x;
        gapY = event.changedTouches[0].pageY - _posFrom.y;
        if (gapX * gapX + gapY * gapY > MinDistance * MinDistance && !success) {
          // 去掉手势提示
          $hand.addClass("hide");
          success = true;
          $photoBox.find(".model-hair").addClass("hide");
          $photoBox.find(".model-hair-action-1").removeClass("hide");
          setTimeout(function() {
            $photoBox.find(".model-hair-action-2").removeClass("hide");
          $photoBox.find(".model-hair-action-1").addClass("hide");
          }, 500);
          setTimeout(function() {
            $photoBox.find(".model-correct").removeClass("hide");
            $photoBox.find(".model-hair-action-2").addClass("hide");
          }, 1000);
          setTimeout(function() {
            $(window).trigger("successAndNext", [index + 1]);
          }, 2000);
        }
      });
    } else if (index === 3) {    //  第四关
      $photoBox.find(".mission-3.item").on("touchstart", function(event) {
        // 去掉手势提醒
        $hand.addClass("hide");
        _posFrom.x = event.changedTouches[0].pageX;
        _posFrom.y = event.changedTouches[0].pageY;
        _leftFrom  = getStyleNum(this, "left");
        _topFrom   = getStyleNum(this, "top");
      });
      $photoBox.find(".mission-3.item").on("touchmove", function(event) {
        this.style.left = _leftFrom + event.changedTouches[0].pageX - _posFrom.x + "px";
        this.style.top = _topFrom + event.changedTouches[0].pageY - _posFrom.y + "px";
      });
      $photoBox.find(".mission-3.item").on("touchend", function(event) {
        var stageWidth = getStyleNum($photoBox[0], "width");
        var stageHeight = getStyleNum($photoBox[0], "height");
        _leftFrom  = getStyleNum(this, "left");
        _topFrom   = getStyleNum(this, "top");
        // 衣服验证区域
        if (_leftFrom > stageWidth / 2 - 100 && _leftFrom < stageWidth / 2 + 100 && _topFrom > stageHeight - 250 && _topFrom < stageHeight) {
          $photoBox.find(".model-clothes").addClass("hide");
          $photoBox.find(".model-correct").removeClass("hide");
          $(this).addClass("hide");
          setTimeout(function() {
            $(window).trigger("successAndNext", [index + 1]);
          }, 1000);
        } else {
          this.style.left = "20px";
          this.style.top = "20px";
        }
      });
    }
  }
  // 判断是否所有图片都移动到了框外（第一关）
  function checkAllOut() {
    var stageWidth = getStyleNum($photoBox[0], "width");
    var stageHeight = getStyleNum($photoBox[0], "height");
    var allOut = true;
    $.each($(".mission-0.item"), function(index, item) {
      var out = false;
      if (getStyleNum(item, "left") <= 10 - getStyleNum(item, "width")) {out = true;}
      if (getStyleNum(item, "left") >= stageWidth - 10) {out = true;}
      if (getStyleNum(item, "top") <= 10 - getStyleNum(item, "height")) {out = true;}
      if (getStyleNum(item, "top") >= stageHeight - 10) {out = true;}
      if (out === false) {
        allOut = false;
      }
    });
    return allOut;
  }

  // 获取元素的属性值（宽高、上下左右位置）
  function getStyleNum(obj, styleName) {
    var str = getStyle(obj, styleName);
    return Number(str.split("px")[0]);
  }
  function getStyle(obj, styleName) {
    if (obj.currentStyle) {
      return obj.currentStyle[styleName];
    } else {
      return getComputedStyle(obj, null)[styleName];
    }
  }





})(window, document, $);
