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
  var $successWord = $(".success-word");
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

  // var _thinkTime = 0;
  var _index;

  // 纪录每一关有没有进行过去掉tips的动作，避免重复出现tips
  var _moved = [false, false, false, false];





  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  $(window).on("loadMission", HANDLER_loadMission);
  // $(window).on("reloadMission", function (event) {
  //   _moved = [false, false, false, false];
  // });





  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  function  HANDLER_loadMission(event, index) {
    _index = index;
    initMissionStage(index);
    window.setTimeout(function (event) {
      showTips(index);
    }, 2500);
    addEventBinding(index);
  }





  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */

  // function isThinking() {
  //   var thinkTimer = setInterval(function () {
  //     _thinkTime += 200;
  //     if (_thinkTime > 2000) {
  //       showTips(_index);
  //     }
  //   }, 200);
  // }

  function initMissionStage (index) {
    $photoBox.find(".mission").addClass("hide");
    $photoBox.find(".mission-" + index).removeClass("hide");
    $photoBox.find(".mission-" + index + ".first-hide").addClass("hide");
    $photoBox.find(".howToDo")[0].style.display = "none";
    // 淡入显示操作提示文本
    window.setTimeout(function() {
      $photoBox.find(".howToDo")[0].style.display = "";
      $photoBox.find(".howToDo")[0].innerHTML = window.CONFIG.tipsWord[index];
      $photoBox.find(".howToDo").addClass("animated fadeIn");
    }, 1500);
    // 去除淡入的class
    window.setTimeout(function() {
      $photoBox.find(".howToDo").removeClass("animated fadeIn");
    }, 3000);
  }


  function showTips (index) {
    if (!_moved[index]) {
      // for (var i = 0; i < 4; i++) {
      //   $hand.removeClass("tips-" + i);
      // }
      $hand.addClass("tips-" + index);
      $hand.removeClass("hide");
    }
  }

  function addEventBinding (index) {   // 第一关
    if (index === 0) {
      mission_0(index);
    } else if (index === 1) {     // 第二关
      mission_1(index);
    } else if (index === 2) {     // 第三关
      mission_2(index)
    } else if (index === 3) {    //  第四关
      mission_3(index);
    }
  }

  function mission_0 (index) {
    var success = false;
    // 调用第三方插件 interact, 提供相框惯性滑动效果
    interact('.mission-0.item')           // target the matches of that selector
      .draggable({                        // make the element fire drag events
        max: Infinity,                    // allow drags on multiple elements
        inertia: {                        // 惯性
          resistance: 5,
          minSpeed: 10,
        },
        onmove: function (event) {
          // 去掉手势提示
          $hand.addClass("hide");
          _moved[index] = true;
          event.target.style.left = getStyleNum(event.target, "left") + event.dx + "px";
          event.target.style.top = getStyleNum(event.target, "top") + event.dy + "px";
        },
        onend: function (event) {
          if (checkAllOut() && !success) {
            success = true;
            $(window).trigger("successAndNext", [index + 1]);
          }
        }
      });
  }

  function mission_1 (index) {
    $carousel.on("touchend", function () {
      // 延时验证是否切换背景
      window.setTimeout(function () {
        if ($carousel.find(".carousel-indicators li").eq(1).hasClass("active")) {
          // 去掉手势提示
          $hand.addClass("hide");
          _moved[index] = true;
          // 禁止再滑动回去
          $carousel[0].style.pointerEvents = "none";
          // 等待动画结束
          window.setTimeout(function () {
            // 出现正确人物图片
            $photoBox.find(".model-correct").removeClass("hide");
          }, 400);
          // 触发下一关
          window.setTimeout(function () {
            $(window).trigger("successAndNext", [index + 1]);
          }, 1400);
        }
      }, 10);
    });
  }

  function mission_2 (index) {
    var MinDistance = 40;   // 最小触发距离
    var gapX, gapY;         // 各个方向上移动距离
    var success = false;    // 是否已经移动成功（避免多次触发下一关）
    $hairTouchArea.on("touchstart", function (event) {
      _posFrom.x = event.changedTouches[0].pageX;
      _posFrom.y = event.changedTouches[0].pageY;
    });
    $hairTouchArea.on("touchend", function (event) {
      gapX = event.changedTouches[0].pageX - _posFrom.x;
      gapY = event.changedTouches[0].pageY - _posFrom.y;
      if (gapX * gapX + gapY * gapY > MinDistance * MinDistance && !success) {
        // 去掉手势提示
        $hand.addClass("hide");
        _moved[index] = true;
        success = true;
        $photoBox.find(".model-hair").addClass("hide");
        $photoBox.find(".model-hair-action-1").removeClass("hide");
        window.setTimeout(function () {
          $photoBox.find(".model-hair-action-2").removeClass("hide");
        $photoBox.find(".model-hair-action-1").addClass("hide");
        }, 500);
        window.setTimeout(function () {
          $photoBox.find(".model-correct").removeClass("hide");
          $photoBox.find(".model-hair-action-2").addClass("hide");
        }, 1000);
        window.setTimeout(function () {
          $(window).trigger("successAndNext", [index + 1]);
        }, 2000);
      }
    });
  }

  function mission_3 (index) {
    $photoBox.find(".mission-3.item").on("touchstart", function (event) {
      // 去掉手势提醒
      $hand.addClass("hide");
      _moved[index] = true;
      _posFrom.x = event.changedTouches[0].pageX;
      _posFrom.y = event.changedTouches[0].pageY;
      _leftFrom  = getStyleNum(this, "left");
      _topFrom   = getStyleNum(this, "top");
    });
    $photoBox.find(".mission-3.item").on("touchmove", function (event) {
      this.style.left = _leftFrom + event.changedTouches[0].pageX - _posFrom.x + "px";
      this.style.top = _topFrom + event.changedTouches[0].pageY - _posFrom.y + "px";
    });
    $photoBox.find(".mission-3.item").on("touchend", function (event) {
      var stageWidth = getStyleNum($photoBox[0], "width");
      var stageHeight = getStyleNum($photoBox[0], "height");
      _leftFrom  = getStyleNum(this, "left");
      _topFrom   = getStyleNum(this, "top");
      // 衣服验证区域
      if (_leftFrom > stageWidth / 2 - 100 && _leftFrom < stageWidth / 2 + 100 && _topFrom > stageHeight - 250 && _topFrom < stageHeight) {
        $photoBox.find(".model-clothes").addClass("hide");
        $photoBox.find(".model-correct").removeClass("hide");
        $(this).addClass("hide");
        window.setTimeout(function () {
          $(window).trigger("successAndNext", [index + 1]);
        }, 1000);
      } else {
        this.style.left = "20px";
        this.style.top = "20px";
      }
    });
  }


  // 判断是否所有图片都移动到了框外（第一关）
  function checkAllOut () {
    var stageWidth = getStyleNum($photoBox[0], "width");
    var stageHeight = getStyleNum($photoBox[0], "height");
    var allOut = true; // 是否所有图片都在框外
    $.each($(".mission-0.item"), function (index, item) {
      var out = false;
      if (getStyleNum(item, "left") <= 10 - getStyleNum(item, "width")) {out = true;}
      if (getStyleNum(item, "left") >= stageWidth - 10) {out = true;}
      if (getStyleNum(item, "top") <= 10 - getStyleNum(item, "height")) {out = true;}
      if (getStyleNum(item, "top") >= stageHeight - 10) {out = true;}
      if (out === false) {  // 在框内，如果被人像挡住，也按出框计算
        var itemWidth  = getStyleNum(item, "width");
        var itemHeight = getStyleNum(item, "height");
        var isCovered = true;
        if (getStyleNum(item, "left") <= stageWidth * 0.2) {isCovered = false;}
        if (getStyleNum(item, "left") >= stageWidth * 0.8 - itemWidth) {isCovered = false;}
        if (getStyleNum(item, "top") <= stageHeight - stageWidth * 0.59) {isCovered = false;}
        if (getStyleNum(item, "top") >= stageHeight) {isCovered = false;}
        if (isCovered === true) {out = true;}
      }
      if (out === false) {
        allOut = false;
      }
    });
    return allOut;
  }

  // 获取元素的属性值（宽高、上左位置）
  function getStyleNum (obj, styleName) {
    var str = getStyle(obj, styleName);
    if (str.match("px")) {
      return Number(str.split("px")[0]);
    } else {
      console.log(styleName + "属性为" + str + ",后续解析失败！");
      return false;
    }
  }
  function getStyle (obj, styleName) {
    if (obj.currentStyle) {
      return obj.currentStyle[styleName];
    } else {
      return getComputedStyle(obj, null)[styleName];
    }
  }





})(window, document, $);
