/**
 * =============================================================================
 *
 *  TITLE   :  新手体验(组件)
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-6-22
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
  var $successWordImg = $(".success-word-img");
  var $bigGoodImg     = $(".big-good-img");
  var $mask           = $(".mask");
  var $maskBox        = $(".mask-box");
  var $photoBox       = $(".photo-box");
  var $finishMaskBox  = $(".finish-mask-box");
  var $hand           = $("#hand");

  var _goodProgress = 0;
  var _state        = "ready";    // "normal"  or   "animating" or "finish"
  var _deviceWidth  = document.documentElement.clientWidth;
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

  $('body').on('touchmove', function (event) {
    event.preventDefault();
  });

  $page.on("open", function() {
    $(window).trigger("loadMission", [_goodProgress]);
  });


  $(window).on("successAndNext", function(event, toIndex) {
    successAndNext(toIndex);
  });

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


  function successAndNext(toIndex) {
    RENDER_showALl();
    RENDER_successWordImg(toIndex);

    setTimeout(function() {
      RENDER_moveGoodImg(toIndex);
      RENDER_fadeWordAndMask();
      if (_goodProgress < 3) {
        RENDER_missionInfo(toIndex);
      }
    }, 1000);

    setTimeout(function() {
      RENDER_hideAll();
      _goodProgress += 1;
      RENDER_goodProgress(_goodProgress);
      if (_goodProgress < 4) {
        $(window).trigger("loadMission", [toIndex]);
        _state = "ready";
      } else {
        _state = "finish";
        RENDER_showFinishImg();
      }
    }, 2000);
  }


  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */
  function RENDER_showALl() {
    $maskBox.removeClass("hide");
    $bigGoodImg[0].style.width  = 160 + "px";
    $bigGoodImg[0].style.height = 160 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * 0.5 - 80 + "px";
    $bigGoodImg[0].style.bottom = 50 + "%";
  }
  function RENDER_successWordImg(toIndex) {
    $successWordImg[0].src = window.CONFIG.successWordImg[toIndex -1];
  }

  function RENDER_moveGoodImg(toIndex) {

    $bigGoodImg[0].style.width  = _deviceWidth * 0.15 + "px";
    $bigGoodImg[0].style.height = 60 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * (0.15 * (toIndex - 1) + 0.2) + "px";
    $bigGoodImg[0].style.bottom = 10 + "px";
  }
  function RENDER_fadeWordAndMask() {
    $mask.addClass("fade");
    $successWordImg.addClass("fade");
  }
  function RENDER_hideAll() {
    $mask.removeClass("fade");
    $successWordImg.removeClass("fade");
    $bigGoodImg[0].style.width  = 160 + "px";
    $bigGoodImg[0].style.height = 160 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * 0.5 - 80 + "px";
    $bigGoodImg[0].style.bottom = 50 + "%";
    $maskBox.addClass("hide");
  }
  function RENDER_goodProgress(num) {
    for (var i = 0; i < 4; i++) {
      if (num > i) {
        $goodList.find("li").eq(i).addClass("active");
      } else {
        $goodList.find("li").eq(i).removeClass("active");
      }
    }
  }


  function RENDER_missionInfo(toIndex) {
    $page.find(".main-word"  )[0].innerHTML = window.CONFIG.missionInfo[toIndex].mainWord;
    $page.find(".detail-word")[0].innerHTML = window.CONFIG.missionInfo[toIndex].detailWord;
  }
  function RENDER_showFinishImg() {
    $finishMaskBox.removeClass("hide");
  }

  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */



})(window, document, $);
