/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  Amount 设置商品数量
 * =============================================================================
 *
 *  说明:
 *    实现数量的增减功能
 *
 *  结构:
 *    <!-- 显示总价的目标元素 -->
 *    <span id="target-id">...</span>
 *    <!-- 设置商品数量的组件 -->
 *    <div class="amount-box">
 *      <button type="button" dir="-">-</button>
 *      <input type="text" name="name" min="1" value="1"
 *             data-target="#taget-id" data-price="0" data-free="1">
 *      <button type="button" dir="+">+</button>
 *    </div>
 *
 *  API:
 *    1.HTML:
 *      1.data-target: 显示总价的目标元素 (可选)
 *      2.data-price:  指定商品单价
 *      3.data-free:   指定免费数量 (可选)
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 2014-08-29
 *
 * @update 2015-01-22 董经伟
 * @update 2016-03-24 董经伟
 *   1.改为 delegate 方式
 *
 */

(function amount (window, document, $) {

  "use strict";


  /**
   * ---------------------------------------------------------------------------
   * Event Binding
   * ---------------------------------------------------------------------------
   */
  $(document.body).on("touchstart", function (event) {
    if (/amount\-box/.test(event.target.parentNode.className)) {
      event.preventDefault();
      event.stopPropagation();
      if ("BUTTON" === event.target.nodeName) {
        var btn = event.target;
        var num = $("input", btn.parentNode)[0];
        var dir = btn.getAttribute("dir") || btn.innerHTML;
        updateNum(num, dir);
      }
    }
  });


  /**
   * ---------------------------------------------------------------------------
   *  Core Logic
   * ---------------------------------------------------------------------------
   */

  /**
   * 改变数量
   * @param  {Object} num - input 元素
   * @param  {string} dir - 加减操作类型
   */
  function updateNum (num, dir) {
    var min = +num.getAttribute("min") || 0;
    if ("-" === dir) {
      if (--num.value < min) {
        num.value = min;
      }
    }
    if ("+" === dir) {
      ++num.value;
    }
    updatePrice(num);
  }

  /**
   * 改变价格
   * @param  {Object} num - input 元素
   */
  function updatePrice (num) {
    var target = $(num.dataset.target)[0]; // 显示价格的目标元素
    if (target) {
      var price = num.dataset.price;
      var free  = num.dataset.free;
      var value = num.value;
      target.innerHTML = ((value - free) * price).toFixed(2);
    }
  }


})(window, document, $);
