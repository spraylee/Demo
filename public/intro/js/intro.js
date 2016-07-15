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



  // window.imgCenter = {
  //   allImg: [],
  //   loadedImg: [],
  //   length: 0,
  //   loadedNum: 0,
  //   loadProgress: "0%",
  //   onload: null,
  //   showProgressDom: $("#loadingProgress")[0],
  //   addImg: function(url) {
  //     if (this.length === 0 && this.showProgressDom) {
  //       this.showProgressDom.innerHTML = this.loadProgress;
  //     }
  //     var img = new Image();
  //     img.src = url;
  //     this.allImg.push(img);
  //     this.length += 1;
  //     var self = this;
  //     img.onload = function(event) {
  //       self.loadedNum += 1;
  //       self.loadedImg.push(img);
  //       self.loadProgress = Math.floor(100 * self.loadedNum / self.length) + "%";
  //       if (self.showProgressDom) {
  //         self.showProgressDom.innerHTML = self.loadProgress;
  //       }
  //       if (self.loadedNum === self.length) {
  //         if (typeof self.onload === "function") {
  //           self.onload();
  //         }
  //       }
  //     }
  //     return img;
  //   }
  // }

  // 图片加载管理器
  // 参数为显示百分比进度的DOM结构
  // 每次载入图片都会触发onchang事件
  // 所有图片载入完成后，触发onload事件
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
   *  Init
   * ---------------------------------------------------------------------------
   */
  window.imgs = new ImgCenter($(".loadingProgress")[0]);
  var pic = imgs.addImg("img/logo.png");

  imgs.onload = function() {
    animation();
    setTimeout(function() {
      if (imgs.dom) {
        $(imgs.dom).addClass("hide");
      }
    }, 500);
  }
  imgs.onchange = function (event) {
    $(".progress")[0].style.width = imgs.progress;
  }


  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
  function Stage (canvasDom) {
    var self = this;
    this.items = [];
    this.animating = true;
    this.itemLength = 0;
    this.fps = "--";
    var n = 0;
    var now;
    var startTime = new Date().getTime();
    this.render = function(fps) {
      var renderLoop = setInterval(function() {
        if (this.animating === false) {
          clearInterval(renderLoop);
          return;
        }
        n += 1;
        if (n >= 60) {
          now = new Date().getTime();
          self.fps = Math.floor(60000/(now - startTime));
          startTime = now;
          n = 0;
          console.log(self.fps);
        }

      }, 16);
    }

    this.render();

  }
  // var stage = new Stage();


  function TimeLine() {
    this.items = [];
    this.goalFps = 10;
    this.realFps = "--";
    var time = 0;
    var self = this;
    this.run = function() {
      var loop = setInterval(function() {
        time += 1000/self.goalFps;

        self.items.forEach(function(item, index) {
          if (time >= item.startTime) {
            item.actions.forEach(function(action, actionIndex) {
              if (!action.done) {

                if (time >= action.time + item.startTime) {
                  $(item.dom)[action.action.split("(")[0]](action.action.match(/('\S+'|"\S")/)[0].slice(1,-1));
                  action.done = true;
                }
              }
            });

          }
        });

        // console.log(time);
      }, 1000/self.goalFps);
    }
    this.addItem = function (dom, startTime, actions) {
      self.items.push({
        dom: dom,
        startTime: startTime,
        actions: actions
      });
    }
    this.run();
  }

  function animation() {

    var timeLine = new TimeLine();
    timeLine.goalFps = 5;

    timeLine.addItem($(".progress")[0], 3000, [{
      action: "addClass('hide')",
      time: 0
    },
    {
      action: "removeClass('hide')",
      time: 2000
    }]);

    timeLine.addItem($(".hand-0")[0], 2000, [{
      action: "addClass('move-center')",
      time: 0
    }]);

  }


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