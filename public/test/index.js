(function () {
  var script = document.querySelectorAll("script");
  var testScript = [];
  for (var i = 0; i < script.length; i++) {
    if (script[i].src.match("/test/index.js")) {
      testScript.push(script[i]);
    }
  }
  if (testScript.length > 1) {
    console.log("Error, find more than one script named './test/index.js'.");
    return false;
  }
  var baseUrl = testScript[0].src.split("/index.js")[0] + "/";


  var jsList = [];
  var cssList = [];

  cssList.push("base/base.css");         // 基本CSS

  jsList.push("refresh/refresh.js");     // 提供刷新按钮
  cssList.push("refresh/refresh.css");

  jsList.push("fps/fps.js");             // 显示FPS
  cssList.push("fps/fps.css");

  var containerId = "test-resource";    // 更改容器ID， 也要同步更改base/base.css中的ID

  if (!!window.TEST) {
    console.log("window.TEST is already exist! This may cause some error!");
  }
  window.TEST = window.TEST || {};
  window.TEST.jsList = jsList;
  window.TEST.cssList = cssList;
  window.TEST.containerId = containerId;
  window.TEST.baseUrl = baseUrl;


  window.addEventListener("load", function(event) {
    var div = document.createElement("div");
    div.id = "test-resource";
    document.body.appendChild(div);
    loadJs(jsList, baseUrl, div);
    loadCss(cssList, baseUrl, div);
  });

  function loadJs(list, baseUrl, container) {
    list.forEach(function(item, index, list) {
      var script = document.createElement("script");
      script.src = baseUrl + item;
      container.appendChild(script);
      var startTime = new Date().getTime();
      script.onload = function () {
        var loadTime = new Date().getTime();
        var useTime = loadTime - startTime;
        console.log("JS  loaded, use time: " + useTime + " ms, value: " +  item);
      }

    });

  }
  function loadCss(list, baseUrl, container) {
    list.forEach(function(item, index, list) {
      var link = document.createElement("link");
      link.href = baseUrl + item;
      link.rel = "stylesheet";
      container.appendChild(link);
      var startTime = new Date().getTime();
      link.onload = function () {
        var loadTime = new Date().getTime();
        var useTime = loadTime - startTime;
        console.log("CSS loaded, use time: " + useTime + " ms, value: " +  item);
      }

    });

  }
})();