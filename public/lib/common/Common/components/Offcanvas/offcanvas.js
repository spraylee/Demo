/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  Offcanvas 滑动导航
 * =============================================================================
 *
 *  说明:
 *    实现点击隐藏滑动导航的功能
 *
 *  使用:
 *    1.HTML:
 *      1.添加 data-offcanvas 属性
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 20101-22
 * @version 1.0.0
 *
 */

(function (window, document, $) {

  "use strict";

  var $contarner = $(".offcanvas-container");

  if (!$contarner[0]) {
    return;
  }

  $("[data-open-offcanvas]").on("click", function (event) {
    $contarner.addClass('open-offcanvas');
  });


  $(".offcanvas").on("touchstart", function (event) {
    if (!event.stopOffcanvas) {
      event.preventDefault();
      event.stopPropagation();
      $contarner.removeClass('open-offcanvas');
    }
  }).find(".offcanvas-panel").on("touchstart", function (event) {
    event.stopOffcanvas = true;
  }).find(".js-close-offcanvas").on("click", function (event) {
    $contarner.removeClass('open-offcanvas');
  });


})(window, document, $);
