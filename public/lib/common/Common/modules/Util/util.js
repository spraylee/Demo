/**
 * @overview 工具库
 *
 * =============================================================================
 *  扩展工具
 * =============================================================================
 *
 *  API:
 *    1. $.util.deparam(urlParam);                            // 地址参数反序列化
 *    2. $.util.img.layzr;                                    // Layzr 实例
 *    4. $.util.post(url, [param], [success], [unsuccess]);   // 统一处理 post 请求，使之符合业务需求
 *    5. $.util.render(tmpl, json, [container], [isAppend]);  // 渲染模板
 *
 * =============================================================================
 *
 * @require ../lib/doT.js
 *
 * @author 董经伟
 * @create 2014-09-03
 *
 * @update 2015-02-11 董经伟
 * @update 2016-04-14 董经伟
 *   1. layzr
 * @update 2016-04-25 董经伟
 *   1. deparam, format
 * @update 2016-05-17 董经伟
 *   1. post: unsuccess
 * @update 2016-05-19 董经伟
 *   1. render: inderBefore
 */

(function (window, document, $) {

  "use strict";

  $.util = $.util || {};
  $.util.img = {};
  $.util.date = {};


  // 地址参数反序列化
  $.util.deparam = function (urlParam) {
    if ("string" !== typeof urlParam) { return false; }
    urlParam = urlParam.replace(/^[#\?]/, "");
    var result = {};
    urlParam.split("&").forEach(function (param) {
      param = param.split("=");
      result[param[0]] = param[1];
    });
    return result;
  };


  // 图片延时加载
  if (window.Layzr) {
    $.util.img.layzr = new Layzr();
    $.util.img.layzr.update().check().handlers(true);

    // 捕获加载失败的事件
    document.body.addEventListener("error", function (event) {
      var img = event.target;
      if ("IMG" === img.nodeName) {
        var times = +img.dataset["loadTimes"] || 0;
        if (2 > times) {
          window.setTimeout(function () {
            img.src = img.src.split("?")[0] + "?" + Math.random();
          }, 600);
        } else if (3 > times) {
          img.src = img.dataset["default"] || "/Public/Common/_dist/1.0.0/default_cert.png";
        }
        img.dataset["loadTimes"] = times + 1;
      }
    }, true);
  }








  /**
   * 格式化日期
   * @param  {number|string} timestamp - 时间对象 或 时间戳 或 日期字符串
   * @return {string}                  - 格式化后的日期 (例如: 2016-01-20)
   */
  $.util.date.format = function (timestamp, showTime) {
    var date = timestamp;
    if (!(timestamp instanceof Date)) {
      var date = new Date(timestamp || null);
    }
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000); /*时差*/
    if (showTime) {
      return date.toJSON().split(".")[0].replace("T", " ").replace(/z/i, "");
    } else {
      return date.toJSON().split("T")[0].replace(/z/i, "");
    }
  }











  /**
   * 封装 post
   * @param  {string}   url       - 提交地址
   * @param  {JSON}     param     - 提交参数
   * @param  {function} success   - 成功回调
   * @param  {function} unsuccess - 失败回调
   * @param  {Object}   settings  - AJAX 设置
   * @return {promise}            - Promise 对象
   */
  var dcode = window.location.search.match(/.*[\?&]dcode=([^\?=&]+)|/)[1] || "";
  $.util.post = function (url, param, success, unsuccess, settings) {
    var data = { dcode: dcode, param: JSON.stringify(param) };
    var callback = function (json) {
      if (json.success) {
        success && success(json);
      } else if (unsuccess) {
        unsuccess(json);
      } else {
        window.alert(json.message || "提交失败");
      }
    };
    return $.post(url, data, callback, settings);
  };

  // 封装 POST 接入服务
  $.util.postAS = function (url, param, success, unsuccess, settings) {
    var data = JSON.stringify({ param: param, liveTime: 0 });
    var callback = function (json) {
      if (0 === json.state) {
        success && success(json);
      } else if (unsuccess) {
        unsuccess(json);
      } else {
        window.alert(json.message || "提交失败");
      }
    };
    settings = settings || {};
    settings["contentType"] = "application/json;charset=utf-8";
    return $.post(url, data, callback, settings);
  };





  /**
   * 封装 template
   * @param  {string}  tmplID   - 模板 ID
   * @param  {json}    json     - 数据
   * @param  {string}  options  - 容器 ID
   * @param  {string}  options.container - 容器 ID
   * @param  {boolean} options.append    - 是否追加内容
   * @param  {boolean} options.inert     - 是否在前插入内容
   * @require common/lib/doT.js
   * @update 2015-12-16 董经伟
   * @update 2016-05-20 董经伟
   * @update 2016-06-16 董经伟
   *   1.Optimize
   */
  $.util.render = function (tmplID, json, options) {
    var tmpl = $(tmplID)[0];
    if (!tmpl) { return; }
    options = Object.assign({
      container: "",
      append: false,
      insert: false,
      replace: false
    }, options);
    var containerID = options.container || tmpl.dataset.container || tmplID.replace("tmp-", "");
    var container = $(containerID)[0] || tmpl.parentNode;
    var html = window.doT.compile(tmpl.innerHTML)(json || null).replace(/(^\s+|\s+$)/, "");
    if (options.append) {
      var frag = getFragment(html);
      container.appendChild(frag);
    } else if (options.insert) {
      var frag = getFragment(html);
      container.insertBefore(frag, container.firstChild);
    } else if (options.replace) {
      container.outerHTML = html;
    } else {
      container.innerHTML = html;
    }
  };

  function getFragment (html) {
    var div  = document.createElement("div");
    var frag = document.createDocumentFragment();
    div.innerHTML = html;
    $.each(div.children, function (i, node) {
      frag.appendChild(node.cloneNode(true));
    });
    return frag;
  }





})(window, document, window.$ || (window.$ = {}));
