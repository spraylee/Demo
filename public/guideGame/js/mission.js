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


  var $page        = $("#page-game");
  var $goodList    = $(".good-list");
  var $top         = $(".top-img");
  var $successWordImg = $(".success-word-img");
  var $bigGoodImg  = $(".big-good-img");
  var $mask        = $(".mask");
  var $maskBox     = $(".mask-box");
  var $photoBox    = $(".photo-box");
  var $finishMaskBox = $(".finish-mask-box");
  var $hand = $("#hand");
  var $carousel = $("#carousel");
  var $hairTouchArea = $(".hair-touch-area");


  var _posFrom = {
    x: 0,
    y: 0
  }
  var _leftFrom = 0;
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
    $hand.removeClass("hide");
    $hand.addClass("tips-" + index);
    // $photoBox.one("touchstart", function(event) {
    //   $hand.removeClass("tips-" + index);
    //   $hand.addClass("hide");
    // });

  }
  function addEventBinding(index) {
    if (index === 0) {

      $photoBox.find(".mission-0.item").on("touchstart", function(event) {
        $hand.removeClass("tips-" + index);
        $hand.addClass("hide");
        // console.log("start");
        _posFrom.x = event.changedTouches[0].pageX;
        _posFrom.y = event.changedTouches[0].pageY;
        _leftFrom  = getStyleNum(this, "left");
        _topFrom   = getStyleNum(this, "top");
      });
      $photoBox.find(".mission-0.item").on("touchmove", function(event) {
        this.style.left = _leftFrom + event.changedTouches[0].pageX - _posFrom.x + "px";
        this.style.top = _topFrom + event.changedTouches[0].pageY - _posFrom.y + "px";
      });
      $photoBox.find(".mission-0.item").on("touchend", function(event) {
        if (checkAllOut()) {
          $(window).trigger("successAndNext", [index + 1]);
        }
      });

    } else if (index === 1) {
      var state = "canMove";
      $carousel.on("touchstart", function() {
        $carousel.find(".model-light-in").addClass("hide");
        $photoBox.find(".model-light-out").removeClass("hide");
        $hand.removeClass("tips-" + index);
        $hand.addClass("hide");
      });
      $carousel.on("touchend", function() {
        // $hand.removeClass("tips-" + index);
        // $hand.addClass("hide");
        if (state === "canMove") {
          setTimeout(function() {
            if ($carousel.find(".carousel-indicators li").eq(1).hasClass("active")) {
              $photoBox.find(".model-correct").removeClass("hide");
              state = "cannotMove";
              setTimeout(function() {
                $(window).trigger("successAndNext", [index + 1]);
              }, 1000);
            } else {
              setTimeout(function() {
                $carousel.find(".model-light-in").removeClass("hide");
                $photoBox.find(".model-light-out").addClass("hide");
              }, 334);
            }
          }, 334);
        }
      });
    } else if (index === 2) {
      var gapX, gapY;
      $hairTouchArea.on("touchstart", function(event) {
        $hand.removeClass("tips-" + index);
        $hand.addClass("hide");
        _posFrom.x = event.changedTouches[0].pageX;
        _posFrom.y = event.changedTouches[0].pageY;
      });
      $hairTouchArea.on("touchend", function(event) {
        gapX = event.changedTouches[0].pageX - _posFrom.x;
        gapY = event.changedTouches[0].pageY - _posFrom.y;
        if (gapX * gapX + gapY * gapY > 1600) {
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
    } else if (index === 3) {
      $photoBox.find(".mission-3.item").on("touchstart", function(event) {
        $hand.removeClass("tips-" + index);
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
  window.getStyleNum = getStyleNum;
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
