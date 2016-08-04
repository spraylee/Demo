(function(window, document) {

  "use strict";

  var time = new Date().getSeconds();   // 上次秒数改变时的秒数
  var newTime;                          // 当前秒数，若与上次不同，替换上次的秒数
  var fpsCount = 0;      // 在一秒内，没刷新一帧，加一，下一秒重置

  // 添加DOM
  var container = document.getElementById(window.TEST.containerId);
  var fpsDom = document.createElement("p");
  fpsDom.id = "test-fps";
  if (!container) {
    console.log("Don't find test container.");
    return false;
  }
  container.appendChild(fpsDom);
  // 初始化渲染
  RENDER_fps(0);

  // 循环计算FPS
  window.requestAnimationFrame(function animation() {
    fpsCount++;
    newTime = new Date().getSeconds();
    if (newTime !== time) {
      time = newTime;
      RENDER_fps(fpsCount);
      fpsCount = 0;
    }

    window.requestAnimationFrame(animation);
  });

  // 渲染FPS
  function RENDER_fps(fpsCount) {
    fpsDom.innerHTML = fpsCount;
    // 根据fps改变背景颜色
    if (fpsCount >= 60) {
      fpsDom.style.backgroundColor = "green";
    } else if (fpsCount < 60 && fpsCount >= 30) {
      fpsDom.style.backgroundColor = "orange";
    } else if (fpsCount < 30) {
      fpsDom.style.backgroundColor = "red";
    }
  }


})(window, document);