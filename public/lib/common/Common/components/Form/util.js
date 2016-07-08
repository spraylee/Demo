/**
 * @overview 工具库
 *
 * =============================================================================
 *  扩展工具
 * =============================================================================
 *
 *  API:
 *    1. $.util.form.getData(form);         // 获取表单数据
 *    2. $.util.form.submit(form, handler); // 统一处理表单提交，包括表单验证、按钮状态和加载状态
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 * @require ./validate.js
 *
 * @author 董经伟
 * @create 2014-09-03
 *
 * @update 2015-02-11 董经伟
 * @update 2016-04-15 董经伟
 *   1.修复: Android 软键盘覆盖正在编辑的表单元素的问题
 */

(function (window, document, $) {

  "use strict";

  $.util = $.util || {};
  $.util.form = $.util.form || {};





  // Fixed Andriod keyboard coverlap editing element
  if ($.device.Android) {
    var _editDom = null;
    var _editTimer = null;
    $(window).on("resize", function (event) {
      window.clearTimeout(_editTimer);
      _editTimer = window.setTimeout(function () {
        if (_editDom) {
          _editDom.scrollIntoView(false);
          _editDom = null;
        }
      }, 300);
    });
    $(document.body).on("focusin", function (event) {
      if (/INPUT|TEXAREA|SELECT/.test(event.target.nodeName)) {
        _editDom = event.target;
      }
    });
  }







  /**
   * 获取表单数据
   * @todo 优化
   * @param  {Object} form - 表单元素
   * @return {Object}
   */
  $.util.form.getData = function (form) {
    var data = {};
    $.each(form.elements, function (i, field) {
      if (!field.name || field.hidden ||
          /FIELDSET|BUTTON/.test(field.nodeName) ||
          "ignore" in field.dataset) {
        return;
      }
      var result = getFieldValueAndText(field);
      if ("" === result.value) { return; }
      nameToObject(data, field.name, result.value, result.text);
      // 附加数据
      var attach = field.dataset["attachField"];
      if (attach) {
        nameToObject(data, attach, field.dataset["attachValue"], field.dataset["attachText"]);
      }
    });
    return data;
  }

  function getFieldValueAndText (field) {
    var value = null;
    var text  = "";
    switch (field.type) {
      case "select-one":
        value = field.value;
        text  = field.selectedOptions[0].text;
        break;
      case "radio":
      case "checkbox":
        if (field.checked) {
          value = field.value || true;
        } else {
          value = "";
        }
        break;
      case "hidden":
        text = field.dataset["label"];
      default:
        value = field.value;
        break;
    }
    if ("date" === field.dataset["type"]) {
      if (/^\d{8}$/.test(value)) {
        value = [value.slice(0,4), value.slice(4,6), value.slice(6,8)].join("-");
      }
      text = value;
      value = +new Date(value);
    }
    return { value: value, text: text };
  }

  // <input name="a[b][]" value="1"> -> { a: { b: [1] } }
  function nameToObject (object, name, value, text) {
    var lookup = object || {};
    var keys   = name.match(/[a-z0-9_]+|\[\]/gi) || [];
    var last   = keys.length - 1;
    for (var i = 0, key = null; key = keys[i]; i++) {
      var needPush = /^\[\]$/.test(key);
      // Last Key
      if (i === last) {
        if (needPush) {
          lookup.push(value);
        } else {
          lookup[key] = value;
          if (text) {
            lookup[key + "_label"] = text;
          }
        }
        break;
      }
      // Multidimensional Array
      if (needPush) {
        var arr = [];
        lookup.push(arr);
        lookup = arr;
        continue;
      }
      // Generate key
      if ("object" !== typeof lookup[key]) {
        var isArray = /^\d+$|^\[\]$/.test(keys[i+1]);
        lookup[key] = isArray ? [] : {};
      }
      lookup = lookup[key];
    }
    return object;
  }









  /**
   * 封装 表单提交 事件
   * @param  {Object}   form    - 表单元素
   * @param  {Function} handler - 事件处理函数
   * @require ./validate.js
   * @update 2016-03-15 董经伟
   *   1. $body 改成 page
   */
  $.util.form.submit = function (form, handler) {

    var isHold = false;

    var btn  = form["dosubmit"] || {};
    var page = $(form).closest(".page")[0] || document.body;

    var hold = function () {
      if (!isHold) {
        isHold = true;
        page.classList.add("loading");
        btn.disabled = true;
      }
    };

    var unhold = function () {
      if (isHold) {
        isHold = false;
        page.classList.remove("loading");
        btn.disabled = false;
      }
    };

    $(form).on("submit", function (event, data) {
      event.preventDefault();
      if (!form.checkValidity()) {
        return false;
      }
      if (!btn.disabled) {
        hold();
        try {
          var res = handler(event, data, unhold);
          if (event.holdon) {
            return;
          }
          if (res && res.always) {
            res.always && res.always(unhold);
          } else {
            unhold();
          }
        } catch (e) {
          unhold();
          throw e;
        }
      }
    });

  };










})(window, document, window.$ || (window.$ = {}));
