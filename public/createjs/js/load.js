/**
 * =============================================================================
 *
 *  TITLE   :  APP介绍页
 *  for page:  图片载入组件
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-15
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var IMG = window._IMG;



  var path = "./img/";     // 图片文件夹位置

  var imgs = {
    logo: "logo.png",
    hand: "hand.png",
    blueCircle: "blueCircle.png",

    type0: "type0.png",
    type1: "type1.png",
    type2: "type2.png",
    type3: "type3.png",
    type4: "type4.png",
    type5: "type5.png"

  }



  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  $(window).on("loadImages", HANDLER_loadImages);


  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  function HANDLER_loadImages(event) {

    var imgCenter = new ImgCenter();
    IMG.logo = imgCenter.addImg(path + "logo.png");
    for (var name in imgs) {
      IMG[name] = imgCenter.addImg(path + imgs[name]);
    }




    imgCenter.onload = function(event) {
      $(window).trigger("loadImages_over");
    }





  }




  /**
   * ---------------------------------------------------------------------------
   *  Util Function
   * ---------------------------------------------------------------------------
   */
  function ImgCenter(dom) {
    this.dom = dom;
    this.imgs = [];
    this.length = 0;
    this.loadedImgs = [];
    this.loadedLength = 0;
    this.progress = "0%";
    this.loadTime = "loading...";
    this.onload = null;
    this.onchange = null;
    this.addImg = function (src) {
      if (this.length === 0) {
        this.firstLoadTime = new Date().getTime();
        if (dom) {
          dom.innerHTML = this.progress;
        }
      }
      var img = new Image();
      img.src = src;
      this.imgs.push(img);
      this.length += 1;
      var self = this;
      img.onload = function(event) {
        self.loadedImgs.push(img);
        self.loadedLength += 1;
        self.progress = Math.floor(100 * self.loadedLength / self.length) + "%";
        if (dom) {
          dom.innerHTML = self.progress;
        }
        if (typeof self.onchange === "function") {
          self.onchange();
        }
        if (self.loadedLength === self.length) {
          self.endLoadTime = new Date().getTime();
          self.loadTime = self.endLoadTime - self.firstLoadTime + "ms";
          if (typeof self.onload === "function") {
            self.onload();
          }
        }
      }
      return img;
    }
  }


  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */



  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */




  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */



})(window, document, $);