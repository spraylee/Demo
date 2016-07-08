/**
 * @overview 工具库
 *
 * =============================================================================
 *  Alert 警告框
 * =============================================================================
 *
 *  原理:
 *    1.覆盖原生 alert, confirm 方法
 *    2.使用 ui/modal 组件显示内容
 *
 *  说明:
 *    1.Alert 多次调用将依次显示 (需按关闭)
 *    2.兼容原生的调用方式
 *
 *  API:
 *    1. alert(message, [title]);
 *    2. confirm(message, callback, [title]);
 *
 * =============================================================================
 *
 * @require Applaction/Common/View/_common/alert.html
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 * @require ../ui/modal.js
 *
 * @author 董经伟
 * @create 2014-09-03
 * @version 1.1.0
 *
 * @update 2015-02-11 董经伟
 * @update 2015-10-14 董经伟
 *   1.分离 window.onerror 功能为 common/util/log.js
 *   2.重构代码
 *   3.添加 confirm 功能
 * @update 2016-04-25 董经伟
 *   1.合并 alert.html
 *
 */

(function (window, document, $) {

  "use strict";





  /**
   * ---------------------------------------------------------------------------
   *  Init
   *  @since 1.1.0
   * ---------------------------------------------------------------------------
   */
  var template_alert =
    '<div class="modal scrollable fade" id="modal-alert" style="z-index:3001" data-dismiss="#modal-alert">\
      <div class="modal-dialog modal-dialog-middle">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h4 class="modal-title" id="alert-title">温馨提示</h4>\
          </div>\
          <div class="modal-body text-center">\
            <p class="text-left" id="alert-message"></p>\
          </div>\
          <div class="modal-footer">\
            <button class="btn btn-block btn-md" type="button" data-dismiss="#modal-alert">关闭</button>\
          </div>\
        </div>\
      </div>\
    </div>'

  var template_confirm =
    '<div class="modal scrollable fade" id="modal-confirm" style="z-index:3001" data-dismiss="#modal-confirm">\
      <div class="modal-dialog modal-dialog-middle">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h4 class="modal-title" id="confirm-title">温馨提示</h4>\
          </div>\
          <div class="modal-body text-center" style="padding:25px 15px;">\
            <p class="text-left" id="confirm-message"></p>\
          </div>\
          <div class="modal-footer">\
            <div class="col-xs-6">\
              <button class="btn btn-block btn-md btn-default" type="button" data-dismiss="#modal-confirm" data-value="true">是</button>\
            </div>\
            <div class="col-xs-6">\
              <button class="btn btn-block btn-md" type="button" data-dismiss="#modal-confirm">否</button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>';

  document.body.appendChild((function () {
    var div = document.createElement("div");
    div.innerHTML = template_alert + template_confirm;
    return div;
  })());




  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */

  // Element
  var $alertModal  = $("#modal-alert");                             // Alert 弹框
  var alertTitle   = document.getElementById("alert-title");        // Alert 标题
  var alertMessage = document.getElementById("alert-message");      // Alert 内容

  var $confirmModal  = $("#modal-confirm");                         // Confirm 弹框
  var confirmTitle   = document.getElementById("confirm-title");    // Confirm 标题
  var confirmMessage = document.getElementById("confirm-message");  // Confirm 内容

  // Data
  var _alertDatas    = [];    // Alert 数据栈

  var _originAlert   = window.alert;
  var _originConfirm = window.confirm;





  /**
   * ---------------------------------------------------------------------------
   *  Exports
   * ---------------------------------------------------------------------------
   */

  window.alert   = customAlert;   // 覆盖原生 alert 函数
  window.confirm = customConfirm; // 覆盖原生 confirm 函数

  /**
   * HACK: Fixed Wechat Override
   * document.__wxjsjs__isLoaded
   */
  window.setTimeout(function () {
    window.alert = customAlert;
  }, 0);





  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  // Alert 弹框关闭事件
  $alertModal.on("close", showNextAlert);

  // Confirm 弹框关闭事件
  $confirmModal.on("close", HANDLER_closeConfirmModal);





  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  // 处理 Confirm 弹框关闭事件
  function HANDLER_closeConfirmModal (event) {
    var isYes = !!event.relatedTarget.dataset["value"];
    if (isYes) {
      $confirmModal.yesCallback && $confirmModal.yesCallback();
    } else {
      $confirmModal.noCallback && $confirmModal.noCallback();
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */

  // 显示 Alert 弹框
  function RENDER_showAlertModal (message, title) {
    RENDER_showModal($alertModal, alertTitle, alertMessage, message, title);
  }

  // 显示 Confirm 弹框
  function RENDER_showComfirmModal (message, title) {
    RENDER_showModal($confirmModal, confirmTitle, confirmMessage, message, title);
  }

  // 显示弹框
  function RENDER_showModal ($modal, modalTitle, modalMessage, message, title) {
    if (title) {
      modalTitle.innerHTML = title;
      modalTitle.parentNode.style.display = "block"; // 显示标题
    } else {
      modalTitle.parentNode.style.display = "none"; // 隐藏标题
    }
    modalMessage.innerHTML = ("" + message).replace(/\n/g, "<br>"); // 转换 \n 为 <br>
    $.ui.modal.open($modal);
  };





  /**
   * ---------------------------------------------------------------------------
   *  Core Logic
   * ---------------------------------------------------------------------------
   */

  // 自定义 Alert
  function customAlert (message, title) {
    if ("block" === $alertModal[0].style.display) {
      // 如果已显示 Alert 则把数据压栈
      _alertDatas.push([message, title]);
    } else {
      RENDER_showAlertModal(message, title);
    }
  };

  // 自定义 Confirm
  function customConfirm (message, yesCallback, noCallback, title) {
    if (yesCallback || noCallback) {
      $confirmModal.yesCallback = yesCallback;
      $confirmModal.noCallback  = noCallback;
      RENDER_showComfirmModal(message, title);
    } else {
      return _originConfirm(message);
    }
  };

  // 显示下一条 Alert
  function showNextAlert () {
    var alertData = _alertDatas.pop();
    if (alertData) {
      RENDER_showAlertModal(alertData[0], alertData[1]);
    }
  }





})(window, document, $);
