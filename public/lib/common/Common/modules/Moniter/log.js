/**
 * @overview 工具库
 *
 * =============================================================================
 *  Log 错误日志记录
 * =============================================================================
 *
 *  原理: 使用 window.onerror 暴力捕获错误
 *
 * =============================================================================
 *
 * @author 董经伟
 * @create 2014-09-03
 * @version 1.5.0
 *
 * @update 2015-10-14 董经伟
 *   1.重构
 * @update 2015-11-13 董经伟
 *   1.JSDoc
 * @update 2016-01-20 董经伟
 *   1.PHP: 修改 jsLog() 方法的位置
 *   2.重构: 原生JS
 *
 */

(function log (window, document) {

  "use strict";

  // 捕获错误
  window.onerror = function (message, path, line, column, exception) {
    try {
      HANDLER_error(message, path, line, column, exception);
    } catch (e) {
      console.log(e);
    }
    // return true;
  };

  /**
   * 处理错误
   * @param  {string} message   - 错误消息
   * @param  {string} path      - 文件路径
   * @param  {number} line      - 错误代码所在行
   * @param  {number} column    - 错误代码所在列
   * @param  {Object} exception - Exception 对象
   */
  function HANDLER_error (message, path, line, column, exception) {
    // 获取错误信息
    var login = window.SESSION && window.SESSION.user && (window.SESSION.user.login || window.SESSION.user.username);
    var file  = path ? "\nFile：" + path + " (" + [line, column].join(":") + ")" : "";
    var user  = login ? "\nUser: " + login : "";
    var url   = "\nURL：" + window.location.href;
    var agent = "\nAgent: " + window.navigator.userAgent;
    var stack = exception && exception.stack || (message + file);
    var log   = stack + url + user + agent + "\n";
    // 前端提示错误
    if (/\.dev$/.test(window.location.host)) { // Alert on developing
      window.alert("系统内部错误: " + message);
      console.log(stack);
    }
    // 向后台提交错误
    if (window.location.host &&
        !/a\.childNodes/.test(message) /*&&*/ // IOS7 Wechat Selection Bug
        /*!/script error/i.test(message)*/) { // Baidu Map script error
      AJAX_postJsLog(log);
    }
  };

  /**
   * 提交错误日志
   * @param {Object} log - 日志对象
   */
  function AJAX_postJsLog (log) {
    var url  = window.location.pathname.match(/(?:\/(?:devi|tiger))?\/\w+/)[0] + "/index/jsLog";
    var data = "log=" + log;
    var xhr  = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
  }


})(window, document);
