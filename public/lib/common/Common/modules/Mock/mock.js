/**
 * @overview 幸福相馆微信端
 *
 * =============================================================================
 *  前端测试机
 * =============================================================================
 *
 *  说明:
 *    模拟后台数据和微信JSSDK，跑通流程
 *
 *  原理:
 *    1.根据 请求URL 配置 对应的数据
 *    2.覆盖 window.wx 对象模拟微信JSSDK
 *    3.覆盖 $.post 方法模拟请求
 *
 *  使用:
 *    1.在 URL 的 QueryString 中添加 test 参数
 *      例: http://wx.xfxg.cn/devi/xfxg?test
 *
 * =============================================================================
 *
 * @require common/core/core.js
 * @require common/ui/page.js, common/ui/listForm.js
 *
 * @author 董经伟
 * @create 2014-08-29
 * @version 1.1.2
 *
 * @update 2015-02-02 董经伟
 * @update 2015-02-14 董经伟
 *   1.使用?test参数作为测试机开关
 *   2.更改 window.CONFIG.preview
 *   3.添加证照库的数据
 *   4.跟随 core.js 接口变动更改相应代码
 * @update 2015-03-12 董经伟
 *   1.添加文档注释
 *   2.重构data部分
 * @update 2016-01-16 董经伟
 *   1.分离为独立模块
 * @update 2016-05-12 董经伟
 *   1.Refactor
 */

$.test = (function (window, document, $) {

  "use strict";





  // Toggle Test
  if (!/[\?&]test\b/i.test(window.location.search)) {
    return { init: function () {} };
  }

  /**
   * 初始化测试机
   * @param {Object} config - 测试数据
   * @param {Object} config.forms   - 表单数据
   * @param {Object} config.jssdk   - 模拟 Jssdk 方法
   * @param {Object} config.post    - 模拟 Post 数据
   */
  function init (config) {
    emulateJssdk(config.jssdk);
    emulateAJAX(config.ajax);
    if("complete" === document.readyState) {
      fillForms(config.forms);
    } else {
      $(document).on("readystatechange", function (event) {
        if("complete" === document.readyState) {
          fillForms(config.forms);
        }
      });
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Core Logic
   * ---------------------------------------------------------------------------
   */

  /**
   * Fill Forms Data
   * @param {Object} config 配置数据
   */
  function fillForms (config) {
    for (var form in config) {
      $.ui.form.fill(document.forms[form], config[form]);
    }
  }

  /**
   * Emulate Wechat JSSDK API
   * @param {Object} config 配置数据
   */
  function emulateJssdk (config) {
    $.device = $.device || {};
    window.wx = window.wx || {};
    for (var api in config) {
      if (/choseImage/.test(api) && $.device.Wechat && 1 !== navigator.maxTouchPoints && window === window.top) {
      } else {
        window.wx[api] = config[api];
      }
    }
  }

  /**
   * Emulate Post API
   * @param {Object} config 配置数据
   * @require (project)/js/common/config.js
   */
  function emulateAJAX (config) {
    // 模拟响应数据
    var fakeDatas = getFakeDatas(window.CONFIG && window.CONFIG.url, config);
    var getFakeData = function (url) {
      if (!fakeDatas) {
        fakeDatas = getFakeDatas(window.CONFIG && window.CONFIG.url, config);
      }
      return fakeDatas && fakeDatas[url];
    };
    // 劫持 $.ajax 方法
    $.originAJAX = $.ajax;
    $.ajax = fakeAJAX.bind(undefined, getFakeData);
  }

  /**
   * ---------------------------------------------------------------------------
   *  Emulate Post API
   * ---------------------------------------------------------------------------
   */

  /**
   * 模拟 AJAX 提交
   * @param  {Object}   fakeDatas - 模拟数据
   * @param  {string}   url       - 提交地址
   * @param  {Object}   param     - 提交数据
   * @param  {Function} handler   - 回调函数
   * @param  {Object}   settings  - 提交设置
   * @return {Object}             - Promise 对象
   */
  function fakeAJAX (getFakeData, url, settings) {

    var options = {
      delay: 100
    };

    var request = settings["data"];
    var respond = getFakeData(url);
    var handler = settings["success"];

    if (/^\{.*\}$/.test(request)) {
      // Immi: { "liveTime": 0, "param": "{...}" }
      request = JSON.parse(request);
      var param = request.param;
    } else {
      request = $.util.deparam(request);
      try {
        // Xfxg: dcode=0&param="{...}"
        var param = JSON.parse(request.param);
      } catch (e) {
        // Bzt: a=1&b=2&c=3...
        var param = request;
      }
    }

    if ("function" === typeof respond) {
      respond = respond(param, options);
    }

    if (undefined === respond) {
      return $.originAJAX(url, settings);
    }

    var json = { state: 0, success: true, data: respond, message: "(模拟系统内部错误)" };
    var promise = { fail: null, always: null };

    window.setTimeout(function () {
      handler && handler(json);
      promise.always && promise.always();
    }, options.delay);

    return {
      fail: function (callback) { promise.fail = callback; },
      always: function (callback) { promise.always = callback; }
    };

  };

  /**
   * 获取响应假数据集合
   * { 网址: 数据 }
   * @param {Object} curls - 网址集合
   * @param {[type]} datas - 数据集合
   */
  function getFakeDatas (curls, datas) {
    if (!curls || !datas) { return null; }
    var result = {};
    for (var key in datas) {
      result[curls[key]] = datas[key];
    }
    return result;
  };





  return {
    init: init,
  };





})(window, document, $);
