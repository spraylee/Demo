/**
 * @overview 工具库
 *
 * =============================================================================
 *  Date 时间处理
 * =============================================================================
 *
 *  API:
 *    1. $.util.date.format(timestamp);                       // 格式化日期
 *
 * =============================================================================
 *
 * @author 董经伟
 * @create 2016-01-18
 * @version 0.1.0
 * @todo Implement
 *
 */

(function DATE (window, document, $) {

  "use strict";

  Date.prototype.format = function(format) {
    var regx = {
      "(M+)" : this.getMonth() + 1,   // month
      "(D+)" : this.getDate(),        // day
      "(h+)" : this.getHours(),       // hour
      "(m+)" : this.getMinutes(),     // minute
      "(s+)" : this.getSeconds(),     // second
      "(q+)" : Math.floor((this.getMonth() + 3) / 3), //quarter
      "(ms)" : this.getMilliseconds() // millisecond
    }
    format = format || "YYYY-MM-DD";
    if ( /(Y+)/.test(format) ) {
      format = format.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
    }
    for ( var key in regx ) {
      if( new RegExp(key).test(format) ) {
        format = format.replace(RegExp.$1, 1 === RegExp.$1.length ? regx[key] : ("00" + regx[key]).substr(regx[key].toString().length));
      }
    }
    return format;
  };





})(window, document, $);
