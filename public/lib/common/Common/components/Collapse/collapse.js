/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  折叠内容 Collapse
 * =============================================================================
 *
 *  说明:
 *    实现元素显示/隐藏效果
 *
 *  结构:
 *    <!-- 触发元素 -->
 *    <button data-collapse="#collapse-id">...</button>
 *    <!-- 目标元素 -->
 *    <div class="collapse" id="collapse-id">...</div>
 *
 *  原理:
 *    1.设置 .collapse 会将目标元素隐藏
 *    2.添加 .in 将目标元素显示，同时会向触发元素添加 .avtive
 *
 *  使用:
 *    1.HTML:
 *      1.显示/隐藏目标元素：指定任意元素的 data-collapse 属性(collapse_id)
 *    1.Javascript:
 *      1.显示目标元素: $(collapse_id).addClass("in");
 *      2.隐藏目标元素: $(collapse_id).removeClass("in");
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 2014-08-28
 * @update 2014-12-19
 */

(function collapse (window, document, $) {

  "use strict";

  // 展开/收缩按钮
  $("[data-collapse]").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var $target = $(this.dataset.collapse);
    $target.toggleClass("in");
    $(this).toggleClass("active");
  });

})(window, document, $);
