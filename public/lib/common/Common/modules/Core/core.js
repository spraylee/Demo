/**
 * @overview 底层核心库
 *
 * =============================================================================
 *  Core 核心逻辑
 * =============================================================================
 *
 *  说明:
 *    1.参考 jQuery API 的设计, 实现 $() 及部分核心功能
 *    2.可用 jQuery 1.7+ 或 Zepto 替代
 *
 *  API:
 *    1.选择器/包装器:
 *      1. $(selector);                  // 包装所查询的元素集合
 *    2.核心方法:
 *      2. $.isArray(data);              // 判断数据是否数组类型
 *      1. $.inArray(data, array);       // 判断数据是否在数组中
 *      3. $.each(array, handler);       // 遍历数组
 *
 *  注意:
 *    1.包装器返回的是 数组 而不是 类数组
 *      例：$(document.body) 会返回 [document.body]
 *    2.功能有限: 只针对业务需要
 *    3.容错性低: 严格限制使用方式和参数类型
 *    4.兼容性低: 基于 ECMAScript 5
 *      例：Dom: querySelector; Array: forEach, isArray...
 *
 * =============================================================================
 *
 * @author 董经伟
 * @create 2014-09-15
 * @version 1.3.2
 * @todo 优化, 重构
 *
 * @update 2015-03-20 董经伟
 *   1.添加 $.fn.one
 * @update 2015-04-02 董经伟
 *   1.优化 wrapper 方法：使用 apply、优化正则
 *   2.注释掉 $.support
 * @update 2015-06-19 董经伟
 *   1. $.fn.on 添加参数 useCapture
 * @update 2015-10-27 董经伟
 *   1.重构
 *   2.完善注释
 *   3.加入版本号 1.0.0
 * @update 2015-11-13 董经伟
 *   1.分离 compat.js
 *   2.分离 ajax.js
 *   3.分离 proto.js
 *   4.版本号升级 1.2.0
 * @update 2016-03-14 董经伟
 *   1.优化 querySelector
 * @update 2016-04-25 董经伟
 *   1.Fixed: "this" in $.each
 *
 */

(function (window, document) {

  "use strict";





  /**
   * ---------------------------------------------------------------------------
   *  Exports
   * ---------------------------------------------------------------------------
   */

  /**
   * 包装器
   * @type {Function}
   * @exports $
   * @namespace
   * @global
   */
  window.$ = wrapper;

  /**
   * 核心方法
   * @type {Function}
   * @memberOf $
   * @global
   */
  $.isArray = isArray;
  $.inArray = inArray;
  $.each    = forEach;





  /**
   * ---------------------------------------------------------------------------
   *  Core Logic 核心逻辑
   * ---------------------------------------------------------------------------
   */

  /**
   * $包装器, 包装所查询的元素集合
   * @param  {(string|*)} [selector] - 选择器字符串或任意数据
   * @param  {Object[]}   [contexts] - 父节点集合, 默认为 [document]
   * @return {Array}      collection - 包装结果
   * @private
   */
  function wrapper (selector, contexts) {
    // 非选择器不进行查询
    if (!selector || "string" !== typeof selector) {
      return toArray(selector);
    }
    try {
      var collection = [];
      // 遍历父节点集合
      forEach(contexts || [document], function (i, context) {
        if (context instanceof Node) {
          // 查询元素
          var nodeList = querySelector(selector, context);
          Array.prototype.push.apply(collection, nodeList);
        }
      });
      // 结果为空
      if (!collection[0]) {
        console.log("%cNot Found: %s", "color:grey;font-size:10px", selector);
      }
      return collection;
    } catch (e) {
      throw e;
    }
  };

  /**
   * 根据选择器字符串查询元素集合
   * @param  {string} selector - 选择器字符串
   * @param  {Object} context  - 父节点
   * @return {Array}  nodeList - 查询元素集合
   * @private
   */
  function querySelector (selector, context) {
    // 查询 ID
    if (/^#(:?\w\-?)*$/.test(selector)) {
      var result = context.getElementById(selector.substring(1));
      return result ? [result] : [];
    }
    // 查询 Class
    if (/^\.(:?\w\-?)*$/.test(selector)) {
      return context.getElementsByClassName(selector.substring(1));
    }
    // 查询 Tag
    if (/^\w+$/.test(selector)) {
      return context.getElementsByTagName(selector);
    }
    // 查询复合选择器
    try {
      return context.querySelectorAll(selector);
    } catch (e) {
      return [];
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Core Function 核心方法
   * ---------------------------------------------------------------------------
   */

  /**
   * 判断数据是否数组类型
   * @param  {*}       data - 数据
   * @return {Boolean}
   * @memberOf $
   */
  function isArray (data) {
    return Array.isArray(data);
    // return data instanceof Array;
    // return "[object Array]" === Object.prototype.toString.call(data);
  }

  /**
   * 判断数据是否类数组
   * @param  {*}       data - 数据
   * @return {Boolean}
   * @since 1.3.1
   */
  function isArrayLike (data) {
    return data instanceof NodeList ||
           data instanceof HTMLCollection ||
           "[object Arguments]" === data.toString();
  }

  /**
   * 判断数据是否在数组中
   * @param  {*}       data  - 数据
   * @param  {Array}   array - 数组
   * @return {Boolean}
   * @memberOf $
   */
  function inArray (data, array) {
    return -1 < array.indexOf(data);
  }

  /**
   * 将任意类型数据转换为数组
   * @param  {*}     data - 数据
   * @return {Array}      - 数组
   * @memberOf $
   */
  function toArray (data) {
    if (!data) {
      return [];
    }
    if (isArray(data)) {
      return data;
    }
    if (isArrayLike(data)) {
      return Array.prototype.slice.call(data);
    } else {
      return [data];
    }
  }

  /**
   * 遍历数组
   * @param  {?Array}   array   - 数组
   * @param  {Function} handler - 处理函数
   * @memberOf $
   */
  function forEach (array, handler) {
    if (array) {
      array = toArray(array);
      array.forEach(function (item, index) {
        item && handler.call(item, index, item);
      });
    }
  }





})(window, document);
