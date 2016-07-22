/**
 * =============================================================================
 *
 *  TITLE   :  重庆公安出入境
 *  for page:  #page-main
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-20
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var $page = $("#page-main");
  var $changeSkin = $(".change-skin");

  var _skins = ["skin-1", "skin-2", "skin-3", "skin-4", "skin-5"];


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

  $changeSkin.on("click", HANDLER_changeSkin);

  $page.on("open", HANDLER_loadSkin);

  // setInterval(function () {
  //   HANDLER_changeSkin();
  // }, 1000);
  //

  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_loadSkin(event) {
    // #page-main 的Class中有提供的时候，默认为提供的那个
    var defaultIndex;
    _skins.forEach(function(skin, index, skins) {
      if ($page.hasClass(skin)) {
        defaultIndex = index;
      }
    });
    if (!!defaultIndex) {
      window.localStorage.setItem("skin", _skins[defaultIndex]);
      return;
    }
    // 未提供Class则从本地储存中寻找
    var skin = window.localStorage.getItem("skin");
    if (!!skin) {
      $page.addClass(skin);
    } else {
      // 本地储存中未找到，则默认第一个皮肤
      $page.addClass(_skins[0]);
      window.localStorage.setItem("skin", _skins[0]);
    }
  }


  function HANDLER_changeSkin(event) {
    var nowIndex;
    _skins.forEach(function(skin, index, skins) {
      if ($page.hasClass(skin)) {
        nowIndex = index;
        $page.removeClass(skin);
      }
    });
    if (nowIndex === _skins.length - 1) {
      nowIndex = -1;
    }
    $page.addClass(_skins[nowIndex + 1]);
    window.localStorage.setItem("skin", _skins[nowIndex + 1]);
  }




  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */



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