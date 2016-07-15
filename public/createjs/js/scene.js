/**
 * =============================================================================
 *
 *  TITLE   :  APP介绍动画
 *  for page:  动画场景控制组件
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
  $(window).on("sceneStart", HANDLER_sceneStart);

  $(window).on("showScene_0_over", function() {
    console.log(0);
    $(window).trigger("showScene_1");
  });




  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_sceneStart(event) {
    $(window).trigger("showScene_0");
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