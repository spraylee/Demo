/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  Sticky 滑动固定
 * =============================================================================
 *
 *  说明:
 *    屏幕滚动时固定元素位置
 *
 *  API:
 *    1.HTML:
 *      1.配置 data-sticky 属性
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 2016-05-11
 * @todo Refactor
 *
 */

(function tabs (window, document, $) {

  "use strict";

  $.each($(".sticky"), function (i, sticky) {
    $(sticky).closest(".page").one("open", function (event) {
      window.setTimeout(function () {
        var top = sticky.offsetTop;
        var parent = sticky.parentNode;
        var inner = sticky.children[0];
        var timer = -1;
        sticky.style.height = sticky.offsetHeight + "px";
        parent.addEventListener("scroll", function (event) {
          window.clearTimeout(timer);
          timer = window.setTimeout(function () {
            if (top < parent.scrollTop) {
              inner.style.position = "fixed";
              inner.style.top = 0;
            } else {
              inner.style.position = "";
            }
          }, 10);
        });
      });
    });
  });

})(window, document, $);
