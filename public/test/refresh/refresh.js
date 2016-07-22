(function () {
  var container = document.getElementById(window.TEST.containerId);
  var btn = document.createElement("span");
  btn.innerHTML = "&#xf021;";
  btn.classList.add("test-refresh-btn");
  if (!container) {
    console.log("Don't find container.");
    return false;
  }
  container.appendChild(btn);
  btn.addEventListener("touchstart", function(event) {
    window.location.reload();
  });
})();