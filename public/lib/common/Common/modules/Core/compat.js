/**
 * @overview 底层核心库
 *
 * =============================================================================
 *  Core Compat 浏览器兼容
 * =============================================================================
 *
 *  说明:
 *    1.非 jQuery API 设计
 *
 *  API:
 *    1. $.device:  设备检测
 *    2. $.support: 特性检测
 *    3. Polyfill & Shim
 *
 * =============================================================================
 *
 * @requires ./core.js
 *
 * @author 董经伟
 * @create 2015-11-13
 * @version 1.0.2
 *
 * @update 2016-07-05
 *   1.Add: Audio fixed
 *
 */

(function (window, document, $) {

  "use strict";





  /**
   * ---------------------------------------------------------------------------
   *  Device detection 设备检测
   * ---------------------------------------------------------------------------
   */

  /** @private {string} */
  var ua = window.navigator.userAgent;

  /**
   * Detect Device's OS
   * @constant {Object}
   * @readonly
   */
  $.device = {
    Wechat:       /MicroMessenger/i.test(ua),        // 微信
    WindowsPhone: 0 <= ua.indexOf("Windows Phone"),  // 微软
    BlackBerry10: 0 <  ua.indexOf('BB10')            // 黑莓
  };

  if (!$.device.WindowsPhone) {
    $.device.Android = 0 < ua.indexOf('Android');     // 安卓
    $.device.iOS     = /iP(?:hone|ad|od)/i.test(ua);  // 苹果
    if ($.device.iOS) {
      $.device.iOS4             = /OS 4_\d(?:_\d)?/i.test(ua);
      $.device.iOS9             = /OS 9_\d(?:_\d)?/i.test(ua);
      $.device.iOSWithBadTarget = /OS (?:[6-9]|\d{2})_\d/i.test(ua);
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Feature detection 特性检测
   * ---------------------------------------------------------------------------
   */

  // /**
  //  * Detect Feature Supported
  //  * @readonly
  //  * @constant {Object}
  //  */
  // $.support = {
  //   fileReader: !!window.FileReader,
  //   // accept: "accept" in document.createElement("input"),
  //   capture: "capture" in document.createElement("input"),
  //   canvas: (function (document) {
  //     var canvas = document.createElement("canvas");
  //     var result = false;
  //     if (!!(canvas.getContext && canvas.getContext('2d'))) {
  //       result = {
  //         toDataURL_jpeg: 0 === canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg')
  //       };
  //     }
  //     canvas = null;
  //     return result;
  //   })(document)
  // };

})(window, document, window.$ || (window.$ = {}));










/**
 * ---------------------------------------------------------------------------
 *  Polyfill & Shim
 * ---------------------------------------------------------------------------
 */
(function (window, document) {

  "use strict";

  // // URL
  // window.URL = window.URL || window.mozURL || window.webkitURL;

  // // getUserMedia
  // window.navigator.getUserMedia = window.navigator.getUserMedia ||
  //                                 window.navigator.mozGetUserMedia ||
  //                                 window.navigator.webkitGetUserMedia;

  // requestAnimationFrame
  window.requestAnimationFrame = window.requestAnimationFrame ||
                                 function (callback) { callback(); };

  // Array.forEach
  if (!("forEach" in Array.prototype)) {
    Array.prototype.forEach = function (callback) {
      var item = null;
      for (var index = 0; item = this[index]; index++ ) {
        callback(item, index);
      }
    };
  }

  // Object.assign
  if ("function" != typeof Object.assign) {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  }





  if ("function" != typeof Object.defineProperty) {
    return;
  }

  if (!window.RadioNodeList) {
    window.RadioNodeList = window.NodeList;
  }

  // Polyfill: form.radio.value
  if (!("value" in RadioNodeList.prototype)) {
    Object.defineProperty(RadioNodeList.prototype, "value", {
      get: function () {
        for (var i = 0, el = null; el = this[i]; i++) {
          if (el.checked) {
            return el.value;
          }
        }
      },
      set: function (value) {
        for (var i = 0, el = null; el = this[i]; i++) {
          if (!el.checked && el.value === value) {
            el.checked = true;
            break;
          }
        }
      },
      configurable: true
    });
  }

  // form.radio.index shim
  // Object.defineProperty(RadioNodeList.prototype, "selectedIndex", {
  //   get: function () {
  //     for (var i = 0, el = null; el = this[i]; i++) {
  //       if (el.checked) {
  //         return i;
  //       }
  //     }
  //   },
  //   set: function (index) {
  //     for (var i = 0, el = null; el = this[i]; i++) {
  //       if (!el.checked && i === index) {
  //         el.checked = true;
  //         break;
  //       }
  //     }
  //   },
  //   configurable: true
  // });

  /**
   * For Android
   * @since 1.0.2
   */
  if (!("selectedOptions" in HTMLSelectElement.prototype)) {
    Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
      get: function () {
        var result = [];
        for (var i = 0, el = null; el = this.options[i]; i++) {
          if (el.selected) {
            result.push(el);
          }
        }
        return result[0] ? result : undefined;
      }
    });
  }





})(window, document);










/**
 * ---------------------------------------------------------------------------
 *  Feature Fixed
 * ---------------------------------------------------------------------------
 * @author 董经伟
 * @create 2016-07-05
 */
(function (window, document) {

  "use strict";


  document.body.addEventListener("touchstart", HANDLER_touchBody);

  function HANDLER_touchBody (event) {
    document.body.removeEventListener("touchstart", HANDLER_touchBody);
    audioFixed();
  }

  // Fixed: Some Android can't use play() by javascript
  function audioFixed () {
    var audios = document.getElementsByTagName("audio");
    Array.prototype.forEach.call(audios, function (audio) {
      if (audio.paused) {
        audio.play();
        audio.pause();
      }
    });
  }

})(window, document);
