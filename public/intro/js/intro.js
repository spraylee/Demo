/**
 * =============================================================================
 *
 *  TITLE   :  INTRO
 *  for page:  #page-intro
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-13
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */

  var canvas = $("canvas")[0];
  var ctx    = canvas.getContext("2d");

  window.imgCenter = {
    allImg: [],
    loadedImg: [],
    length: 0,
    loadedNum: 0,
    loadProgress: "0%",
    onload: null,
    showProgressDom: $("#loadingProgress")[0],
    addImg: function(url) {
      if (this.length === 0 && this.showProgressDom) {
        this.showProgressDom.innerHTML = this.loadProgress;
      }
      var img = new Image();
      img.src = url;
      this.allImg.push(img);
      this.length += 1;
      var self = this;
      img.onload = function(event) {
        self.loadedNum += 1;
        self.loadedImg.push(img);
        self.loadProgress = Math.floor(100 * self.loadedNum / self.length) + "%";
        if (self.showProgressDom) {
          self.showProgressDom.innerHTML = self.loadProgress;
        }
        if (self.loadedNum === self.length) {
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
   *  Init
   * ---------------------------------------------------------------------------
   */
  var pic = imgCenter.addImg("img/pic (2).png");
  var qqimg = imgCenter.addImg("img/QQ截图20160713144714.png");
  var photo = imgCenter.addImg("img/照片.jpg");

  imgCenter.onload = function() {
    alert("加载完成！");
  }


  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */




  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */




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
  function RENDER_items(items) {

  }



  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */



})(window, document, $);