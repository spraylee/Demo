/**
 * @overview 工具库
 *
 * =============================================================================
 *  扩展工具 - 表单
 * =============================================================================
 *
 *  API:
 *    1. $.util.form.linkage(form, linkage_items, linkeage_values, mixin);  // 表单数据联动
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 *
 * @author 董经伟
 * @create 2016-01-08
 * @version 1.0.0
 * @todo Refactor
 *
 */

(function (window, document, $) {

  "use strict";





  $.util = $.util || {};
  $.util.form = $.util.form || {};
  $.util.form.linkage = linkage;
  $.util.form.linkage.setOptions = linkageSetOptions;





  /**
   * 表单数据联动
   * @todo 优化
   * @param  {Object} form           - 表单元素
   * @param  {Object} linkage_items  - 联动数据映射表: 值->字段
   * @param  {Object} linkage_values - 联动数据映射表: 值->值
   * @param  {Object} mixinHandler   - 监听 change 事件的处理函数
   * @return {Object}
   */
  function linkage (form, linkage_items, linkage_values, mixinHandler) {
    $(form).on("change", function (event) {
      linkageItems(form, linkage_items, event.target);
      linkageValues(form, linkage_values, event.target);
      mixinHandler && mixinHandler(event);
    });
  };




  function linkageSetOptions (field, values, isInit) {
    if (!field || !values) { return; }
    var selectItem = $(field).closest(".list-item")[0];
    var target = selectItem.dataset["modal"] || (/#page-/.test(selectItem.hash) && selectItem.hash);
    var optionItems = $(target).find(".list-item");
    $.each(optionItems, function (i, item) {
      var $item = $(item);
      // Show or hide option items
      if ($.inArray(item.dataset["value"], values)) {
        $item.removeClass("hide")
        if (field.options[0].selected) {
          $item.removeClass("active");
        }
      } else {
        $item.addClass("hide");
      }
      // If there is only one option value
      if (selectItem.dataset["modal"] && 1 === values.length && !isInit) {
        $item.trigger("click");
      }
    });
  }





  function linkageItems (form, linkage_items, field) {
    if (!linkage_items) { return; }
    var linkage_item = linkage_items[field.name];
    if (!linkage_item) { return; }
    if ("checkbox" === field.type) {
      if (field.checked) {
        $.ui.form.showItems(getFieldsByNames(form, linkage_item[field.value]));
      } else {
        $.ui.form.hideItems(getFieldsByNames(form, linkage_item[field.value]));
      }
    } else {
      if (linkage_item["*"]) {
        if (field.value) {
          $.ui.form.showItems(getFieldsByNames(form, linkage_item["*"]));
        } else {
          $.ui.form.hideItems(getFieldsByNames(form, linkage_item["*"]));
        }
      }
      if (linkage_item[field.value]) {
        $.ui.form.showItems(getFieldsByNames(form, linkage_item[field.value]));
      }
      for (var key in linkage_item) {
        if ("*" !== key) {
          $.ui.form.hideItems(getFieldsByNames(form, linkage_item[key], linkage_item[field.value]));
        }
      }
    }
  }





  function linkageValues (form, linkage_values, field) {
    if (!linkage_values) { return; }
    var linkage_value = linkage_values[field.name];
    if (!linkage_value) { return; }
    for (var key in linkage_value) {
      var targetField = form[key];
      var targetValue = linkage_value[key][field.value];
      if (targetValue) {
        targetField.options[0].selected = true;
        linkageSetOptions(targetField, targetValue);
        $.ui.form.showItems(targetField);
      } else {
        $.ui.form.hideItems(targetField);
      }
    }
  }





  function getFieldsByNames (form, names, ignoreNames) {
    if ($.isArray(names)) {
      var fields = [];
      ignoreNames = ignoreNames || [];
      $.each(names, function (i, name) {
        if (!$.inArray(name, ignoreNames)) {
          fields.push(form[name]);
        }
      });
      return fields;
    } else {
      return form[names];
    }
  };




})(window, document, window.$ || (window.$ = {}));
