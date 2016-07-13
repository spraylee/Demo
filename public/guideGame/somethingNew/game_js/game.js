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
  var $pageWelcome   = $("#page-welcome");
  var $page          = $("#page-game");
  var $goodList      = $(".good-list");
  var $successWord   = $(".success-word");
  var $bigGoodImg    = $(".big-good-img");
  var $mask          = $(".mask");
  var $maskBox       = $(".mask-box");
  var $photoBox      = $(".photo-box");
  var $finishMaskBox = $(".finish-mask-box");


  var _goodProgress = 0;
  var _state        = "ready";    // "normal"  or   "animating" or "finish"
  var _deviceWidth  = document.documentElement.clientWidth;
  var _audio        = {};





  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */

  $("audio").forEach(function (item) {
    _audio[item.id.split("-")[1]] = item;
  });





  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  $('body').on('touchmove', function (event) {
    event.preventDefault();
  });

  $pageWelcome.on("open", function (event) {
    if (event.referrer === "#page-game") {
      window.location.reload();
      // $page.find("*").forEach(function (item) {
      //   if (item.style) {
      //     item.style = "";
      //   }
      // });
      // _goodProgress = 0;
      // _state        = "ready";
      // $(window).trigger("reloadMission");
    }
  });

  $page.on("open", function () {
    // 播放背景音乐
    _audio["bgm"].play();
    _audio["bgm"].volume = 0.5;

    $(window).trigger("loadMission", [_goodProgress]);
    RENDER_missionInfo(_goodProgress);
    RENDER_goodProgress(_goodProgress);
  });

  // 下一关（公共事件）
  $(window).on("successAndNext", function (event, toIndex) {
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
  // 按顺序执行过关的各个流程
  function successAndNext (toIndex) {
    RENDER_showSuccess(toIndex);              // 出现过关提示

    window.setTimeout(function () {
      RENDER_fadeWordAndMoveImg(toIndex);     // 文字和遮罩消失，大拇指开始想底部移动
    }, 2000);

    window.setTimeout(function () {
      RENDER_hideSuccess();
      RENDER_goodProgress(_goodProgress + 1);
      if (_goodProgress < 3) {
        _goodProgress += 1;
        RENDER_missionInfo(toIndex);
        $(window).trigger("loadMission", [toIndex]);   // 载入下一关的内容
        _state = "ready";
      } else {
        _state = "finish";
        RENDER_showFinishImg();   // 显示结束的信息
      }
    }, 3000);
  }





  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */
  function RENDER_showSuccess (toIndex) {

    // 播放过关的音效，并短暂暂停BGM
    _audio["success"].play();
    window.setTimeout(function () {
      _audio["bgm"].pause();
    }, 300);
    window.setTimeout(function () {
      _audio["bgm"].play();
    }, 1200);

    // 出现过关的提示
    $maskBox.removeClass("hide");
    $bigGoodImg[0].style.width  = 160 + "px";
    $bigGoodImg[0].style.height = 160 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * 0.5 - 80 + "px";
    $bigGoodImg[0].style.bottom = 50 + "%";
    $successWord[0].innerHTML = window.CONFIG.successWord[toIndex -1];
  }

  function RENDER_fadeWordAndMoveImg (toIndex) {
    // 提示消失，大拇指飞向底部
    $bigGoodImg[0].style.width  = _deviceWidth * 0.15 + "px";
    $bigGoodImg[0].style.height = 60 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * (0.15 * (toIndex - 1) + 0.2) + "px";
    $bigGoodImg[0].style.bottom = 10 + "px";
    $mask.addClass("fade");
    $successWord.addClass("fade");
  }

  function RENDER_hideSuccess () {
    $mask.removeClass("fade");
    $successWord.removeClass("fade");
    $maskBox.addClass("hide");
    // 大拇指图片隐藏后，大小位置复原
    $bigGoodImg[0].style.width  = 160 + "px";
    $bigGoodImg[0].style.height = 160 + "px";
    $bigGoodImg[0].style.left   = _deviceWidth * 0.5 - 80 + "px";
    $bigGoodImg[0].style.bottom = 50 + "%";
  }

  // 渲染底部的大拇指显示效果
  function RENDER_goodProgress (num) {
    for (var i = 0; i < 4; i++) {
      if (num > i) {
        $goodList.find("li").eq(i).addClass("active");
      } else {
        $goodList.find("li").eq(i).removeClass("active");
      }
    }
  }

  // 出现每一关的文字标题，按顺序并附带动画
  function RENDER_missionInfo (toIndex) {
    $page.find(".main-word")[0].innerHTML = "　";
    $page.find(".detail-word")[0].innerHTML = "　";

    $page.find(".main-word").addClass("animated bounceInDown");
    $page.find(".main-word")[0].innerHTML = window.CONFIG.missionInfo[toIndex].mainWord;

    window.setTimeout(function () {
      $page.find(".detail-word").addClass("animated bounceIn");
      $page.find(".detail-word")[0].innerHTML = window.CONFIG.missionInfo[toIndex].detailWord;
    }, 1000);

    window.setTimeout(function () {
      $page.find(".main-word").removeClass("animated bounceInDown");
      $page.find(".detail-word").removeClass("animated bounceIn");
    }, 4000);
  }

  // 出现通关信息和音效，并停止BGM
  function RENDER_showFinishImg () {
    $finishMaskBox.removeClass("hide");
    _audio["bgm"].pause();
    _audio["finish"].play();
  }





})(window, document, $);
