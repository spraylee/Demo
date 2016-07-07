/**
 * =============================================================================
 *
 *  TITLE   :  CUBE
 *  for page:  page-main
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-7
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var $page = $("#page-main");
  var $cube = $("#cube");

  var _color = ["red", "green", "grey", "pink", "yellow", "blue"]

  var _cubeSize = 50;



  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */





  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
  $page.on("open", HANDLER_initPage);



  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_initPage(event) {

    // Create Cells
    RENDER_createCells();

    // Init Color
    $cube.find(".cell-face").forEach(function(item) {
      item.style.backgroundColor = "black";
    });
    _color.forEach(function(color, index) {
      console.log(index);
      $cube.find(".cell-face-" + index).find(".cell-inner").forEach(function(item) {
        item.style.backgroundColor = color;
      });
    });

    // Init CellFace Size And Position
    $cube.find(".cell-face").forEach(function(item) {
      item.style.width = _cubeSize + "px";
      item.style.height = _cubeSize + "px";
    });
    var halfSize = _cubeSize / 2;
    $cube.find(".cell-face-0").forEach(function(item) {
      item.style.transform = "translate3d(0, " + halfSize * -1 +"px, 0) rotate3d(0, 1, 0, 90deg)"
    });
    $cube.find(".cell-face-1").forEach(function(item) {
      item.style.transform = "translate3d(" + halfSize * -2 + "px , " + halfSize * -1 +"px, 0) rotate3d(0, 1, 0, -90deg)"
    });
    $cube.find(".cell-face-2").forEach(function(item) {
      item.style.transform = "translate3d(" + halfSize * -1 + "px , 0, 0) rotate3d(1, 0, 0, 90deg)"
    });
    $cube.find(".cell-face-3").forEach(function(item) {
      item.style.transform = "translate3d(" + halfSize * -1 + "px , " + halfSize * -2 +"px, 0) rotate3d(1, 0, 0, -90deg)"
    });
    $cube.find(".cell-face-4").forEach(function(item) {
      item.style.transform = "translate3d(" + halfSize * -1 + "px , " + halfSize * -1 +"px, " + halfSize * 1 +"px) rotate3d(0, 0, 1, 90deg)"
    });
    $cube.find(".cell-face-5").forEach(function(item) {
      item.style.transform = "translate3d(" + halfSize * -1 + "px , " + halfSize * -1 +"px, " + halfSize * -1 +"px) rotate3d(0, 0, 1, -90deg)"
    });

    // Init Colors
    $cube.find(".cell-face").forEach(function(item) {
      item.style.backgroundColor = "black";
    });
    _color.forEach(function(color, index) {
      $cube.find(".cell-face-" + index).find(".cell-inner").forEach(function(item) {
        item.style.backgroundColor = color;
      });
    });

    // Init Cell Postion
    for (var i = 0; i < 27 ; i++) {
      var n_z = - Math.floor(i / 9) + 1;
      var n_x = i % 3 - 1;
      var n_y = Math.floor((i % 9) / 3) - 1;
      $cube.find(".cell-"+i)[0].style.transform = "translate3d(" + n_x*_cubeSize + "px, " + n_y*_cubeSize + "px, " + n_z*_cubeSize + "px)"
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

  function RENDER_createCells() {
    $.util.render("#tmp-cube", 27);  // How Many
  }




  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */



})(window, document, $);