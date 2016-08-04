(function () {
  var container = document.getElementById(window.TEST.containerId);
  var btn = document.createElement("span");
  btn.innerHTML = "&#xf021;";  // refresh.ttf中定义的刷新图标样式
  btn.classList.add("test-refresh-btn");
  if (!container) {
    console.log("Don't find test container.");
    return false;
  }
  container.appendChild(btn);
  btn.addEventListener("click", function(event) {
    window.location.reload(true);
  });
})();