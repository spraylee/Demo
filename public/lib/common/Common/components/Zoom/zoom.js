/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  Zoom 查看大图
 * =============================================================================
 *
 *  说明:
 *    实现点击显示大图效果
 *
 *  结构:
 *    <img src="/photo1.jpg" data-zoomset='["http://wx.xfxg.cn/photo1.jpg", "http://wx.xfxg.cn/photo2.jpg"]'>
 *
 *  原理:
 *    使用微信JSSDK
 *
 *  使用:
 *    1.HTML:
 *      1.指定 <img> 标签的 data-zoomset 属性(图片完整地址数组)
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 2014-09-04
 * @update 2015-01-20
 *
 */

(function (window, document, $) {

  "use strict";

  $(document.body).on("click", function (event) {
    var target = event.target;
    if ("zoomset" in target.dataset) {
      var zoomset = target.dataset["zoomset"];
      zoomset = zoomset || "[\"" + target.src + "\"]";
      window.wx.previewImage({
        current: target.src,
        urls: JSON.parse(zoomset)
      });
      return false;
    }
  });

})(window, document, $);
