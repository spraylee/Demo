/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  ListForm 列表式表单
 * =============================================================================
 *
 *  说明:
 *    对表单字段元素 (input|select|option|radio|checkbox) 进行样式上的封装
 *
 *  结构:
 *    <!-- 表单 -->
 *    <form name="formName" novalidate>
 *      <menu class="list list-form">
 *        <!-- 文本框 -->
 *        <li class="list-item input empty">
 *          <span class="placeholder">请输入字段1</span>
 *          <label class="label">字段1</label>
 *          <input class="form-control" type="text" name="input" required data-label="字段1">
 *        </li>
 *        <!-- 选择框 -->
 *        <li class="list-item select empty">
 *          <span class="placeholder">请选择字段2</span>
 *          <label class="label">字段2</label>
 *          <select class="form-control" name="select1" required data-label="字段2">
 *            <option value selected></option>
 *            <option></option>
 *          </select>
 *        </li>
 *        <!-- 单选框 -->
 *        <li class="list-item radio active">
 *          <h4>标题</h4>
 *          <p><small>说明</small></p>
 *          <input class="hide" type="radio" name="radio1" value="value1" checked>
 *        </li>
 *        <!-- 复选框 -->
 *        <li class="list-item checkbox active">
 *          <h4>标题</h4>
 *          <p><small>说明</small></p>
 *          <input class="hide" type="checkbox" name="checkbox1" value="value1" checked>
 *        </li>
 *      </menu>
 *    </form>
 *
 *    <!-- 选项列表 (对应 select1) -->
 *    <menu class="list list-form">
 *      <li class="list-item option" data-form="formName" data-input="select1" data-value="value1">
 *        ...
 *      </li>
 *    </menu>
 *
 *  API:
 *    1.HTML:
 *      1.设置列表项 .list-item 的类型和状态:
 *        1.类型：.input, .select, .option, .radio, .checkbox
 *        2.状态：.empty(空), .hide(隐藏), .active(激活)
 *        3.样式: .radio-front, .checkbox-front
 *      2.绑定 .list-item.option 数据:
 *        1.data-form:   对应表单
 *        2.data-select: 对应 select 元素
 *        3.data-value:  对应 select 元素的值
 *        4.data-text:   对应 select 元素的文本
 *      3.阻止在 .list-item 内点击触发组件功能:
 *        1.添加 data-stop-form 属性
 *    2.Javascript:
 *      1.填充表单: $.ui.form.fill(form, data);
 *      2.重置表单: $.ui.form.reset(form);
 *      3.显示字段: $.ui.form.showItems(field...);
 *      4.隐藏字段: $.ui.form.hideItems(field...);
 *
 * -----------------------------------------------------------------------------
 *
 * @require ../core/core.js
 *
 * @author 董经伟
 * @create 2014-08-15
 * @version 1.7.0
 * @todo 重构优化 showItems & hideItems
 *
 * @update 2015-01-22 董经伟
 * @update 2015-03-12 董经伟
 * @update 2015-04-09 董经伟
 *   1.优化 setItem
 * @update 2015-04-20 董经伟
 *   1.重构 select/option 逻辑
 *   2.修改 fillForm
 * @update 2015-08-28 董经伟
 *   1.优化 fillForm
 * @update 2015-10-30 董经伟
 *   1.重命名, 重构, 优化, 注释
 * @update 2015-11-17 董经伟
 *   1.重构, 优化逻辑
 * @update 2015-11-25 董经伟
 *   1.重构, 优化逻辑
 *   2.修改接口!
 *   3.版本升为 1.5.0 (大改)
 * @update 2016-01-05 董经伟
 *   1.showItems 和 hideItems 添加 fieldset 的功能
 *   3.版本升为 1.6.0
 * @update 2016-01-07 董经伟
 *   1.优化 showItems, hideItems
 * @update 2016-02-18 董经伟
 *   1.list-item-box
 * @update 2016-06-17 董经伟
 *   1.setRadioItem
 * @update 2016-06-24 董经伟
 *   1.Bugfix: Set Option Active
 *
 */

$.ui = $.ui || {};

$.ui.form = (function (window, document, $) {

  "use strict";





  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  // 绑定点击事件
  $(".list-form").on("click", HANDLER_clickItem);





  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */

  /**
   * 处理点击事件
   * 为元素添加 data-stop-form 属性可阻止处理点击事件
   * @param {Object} event - 事件对象
   */
  function HANDLER_clickItem (event, isPrevent) {
    isPrevent && event.preventDefault();
    if (!("stopForm" in event.target.dataset)) {
      var item = getListItem(event.target);
      item && setListItem(item);
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Core Logic
   * ---------------------------------------------------------------------------
   */

  /**
   * 获取列表项
   * @param {Object} field - 表单字段 或 列表项内任意元素
   */
  function getListItem (field) {
    return $(field).closest(".list-item")[0];
  }

  /**
   * 设置列表项
   * @param {Object} item - 列表项
   */
  function setListItem (item) {
    item.className.replace(/(?:input|option|radio|checkbox)/, function (type) {
      switch (type) {
        case "input":
          unsetItemState(item, "empty");
          item.getElementsByTagName("input")[0].focus();
          break;
        case "option":
          setTargetSelect(item);
          break;
        case "radio":
          setRadioField(item);
          break;
        case "checkbox":
          setCheckboxField(item);
          break;
      }
      return type;
    });
  }

  /**
   * 设置目标选择框列表项
   * @param {Object} optionItem - 选项列表项
   */
  function setTargetSelect (optionItem) {
    var dataset = optionItem.dataset;
    var form    = document.forms[dataset.form];
    if (!form) { return console.log("Target Form \"" + form + "\" not found"); }
    var select  = form[dataset.select];
    if (!select) { return console.log("Target Select \"" + select + "\" not found"); }
    var value   = dataset.value;
    var text    = dataset.text || optionItem.innerText.trim();
    var item    = getListItem(select);
    setSelectField(item, select, value, text, optionItem);
  }

  /**
   * 设置选择框字段的值
   * @param {Object} select - 选择框元素
   * @param {string} value  - 值
   * @param {string} text   - 文本
   */
  function setSelectField (item, select, value, text, optionItem) {
    // Default option which will be selected
    var option = select.options[1];
    // Have change
    if (value !== select.value || text !== option.innerText) {
      // Set value of select element
      option.value     = value || text;
      option.innerHTML = text  || value;
      setFieldValue(item, select, option.value);
      // Set active of option item
      if (!optionItem) {
        item = item || $(select).closest("a")[0];
        if (item) {
          var $menu = $(item.dataset["modal"]);
          $menu = $menu[0] ? $menu : $(item.hash.split("&")[0]);
          optionItem = $menu.find("[data-value='" + value + "']")[0];
        }
      }
      if (optionItem) {
        $(optionItem).closest(".list-form")
                     .find("[data-select=\"" + select.name + "\"].active")
                     .removeClass("active");
        optionItem.classList.add("active");
      }
    }
  }

  /**
   * 设置单选框字段
   * @param {Object}  item  - 单选框列表项
   * @param {?Object} radio - 单选框元素
   */
  function setRadioField (item, radio) {
    if (undefined === radio) {
      radio = item.getElementsByTagName("input")[0];
    }
    item && setRadioItem(item, true);
    setFieldChecked(radio, true);
  }

  /**
   * 设置复选框字段
   * @param {Object}   item     - 复选框列表项
   * @param {?Object}  checkbox - 复选框元素
   * @param {?boolean} checked  - 是否选中
   */
  function setCheckboxField (item, checkbox, checked) {
    if (undefined === checkbox) {
      checkbox = item.getElementsByTagName("input")[0];
    }
    if (undefined === checked) {
      checked = !checkbox.checked;
    }
    item && setCheckboxItem(item, checked)
    setFieldChecked(checkbox, checked);
  }

  /**
   * 设置表单字段列表项
   * @param {Object} item  - 列表项
   * @param {string} value - 值
   */
  function setFieldItem (item, value) {
    if (value) {
      unsetItemState(item, "empty");
    } else {
      setItemState(item, "empty");
    }
  };

  /**
   * 设置单选框列表项
   * @param {Object} item - 单选框列表项
   * @param {Boolean} chedked - 是否选中
   */
  function setRadioItem (item, checked) {
    var curItem = $(".radio.active", item.parentNode)[0]; // Maybe need to optimize
    curItem && unsetItemState(curItem, "active");
    if (checked) {
      setItemState(item, "active");
    } else {
      unsetItemState(item, "active");
    }
  }

  /**
   * 设置复选框列表项
   * @param {Object}  item    - 复选框列表项
   * @param {boolean} checked - 是否选中
   */
  function setCheckboxItem (item, checked) {
    if (checked) {
      setItemState(item, "active");
    } else {
      unsetItemState(item, "active");
    }
  }





  /**
   * ---------------------------------------------------------------------------
   *  Exports Function
   * ---------------------------------------------------------------------------
   */

  /**
   * 显示列表项
   * @param {Array[Object]} fields - 表单元素
   * @argument {Array[Object]} - 表单元素
   */
  function showItems (fields) {
    if (!fields) { return; }
    var fieldset = ("fieldset" === fields.type) ? fields : null;
    if (fieldset) {
      if ("wrap" in fieldset.dataset) {
        unsetItemState(fieldset, "hide");
        return;
      }
    }
    fields = fieldset ? fields.elements
           : $.isArray(fields) ? fields
           : arguments;
    $.each(fields, function (i, field) {
      if (!fieldset && "FIELDSET" === field.nodeName) {
        return showItems(field);
      }
      if (field.hidden) {
        field.hidden = false;
        var item = getListItem(field);
        item && unsetItemState(item, "hide");
      }
    });
    if (fieldset) {
      unsetItemState(fieldset, "hide");
    }
  }

  /**
   * 隐藏列表项
   * @param {Array[Object]} fields - 表单元素
   * @argument {Array[Object]} - 表单元素
   */
  function hideItems (fields) {
    if (!fields) { return; }
    var fieldset = ("fieldset" === fields.type) ? fields : null;
    if (fieldset) {
      if ("wrap" in fieldset.dataset) {
        setItemState(fieldset, "hide");
        return;
      }
    }
    fields = fieldset ? fields.elements
           : $.isArray(fields) ? fields
           : arguments;
    $.each(fields, function (i, field) {
      if (!fieldset && "FIELDSET" === field.nodeName) {
        return hideItems(field);
      }
      if (!field.hidden) {
        field.hidden = true;
        var item = getListItem(field);
        item && setItemState(item, "hide");
        // Reset value
        if ("SELECT" === field.nodeName) {
          field.options[0].selected = true;
          var item = getListItem(field);
          var $menu = $(item.dataset["modal"]);
          $menu = $menu[0] ? $menu : $(item.hash.split("&")[0]);
          $menu.find(".active").removeClass("active");
        } else {
          field.value = field.defaultValue;
        }
        triggerChange(field);
      }
    });
    if (fieldset) {
      setItemState(fieldset, "hide");
    }
  }

  /**
   * 填充表单
   * @param {Object}  form     - 表单
   * @param {Object}  data     - 数据
   * @param {boolean} isForced - 是否填充未显示的字段
   */
  function fillForm (form, data, isForced) {
    if (!form) { return; }
    for (var key in data) {
      var field = form[key];
      if (field instanceof NodeList) {
        // Get radio element
        $.each(field, function (i, radio) {
          if (radio.value === data[key]) {
            field = radio;
          }
        });
      }
      if (!(field instanceof Element) || !isForced && (field.hidden || field.disabled)) {
        continue;
      }
      var item = getListItem(field);
      switch (field.type) {
        case "select-one":
          // { value: "value", text: "text" }
          if (data[key] instanceof Object) {
            setSelectField(item, field, data[key]["value"], data[key]["text"]);
          }
          break;
        case "radio":
          setRadioField(item, field);
          break;
        case "checkbox":
          setCheckboxField(item, field, data[key]);
          break;
        default:
          if (field.value !== data[key]) {
            setFieldValue(item, field, data[key]);
          }
          break;
      }
    }
  }

  /**
   * 重置表单
   * @param {Object} form - 表单
   */
  function resetForm (form) {
    form.reset();
    // 调整样式
    $.each(form.elements, function (i, field) {
      var item = getListItem(field);
      if (!item) { return; }
      switch(field.type) {
        case "radio":
          setRadioItem(item, field.checked);
          break;
        case "checkbox":
          setCheckboxItem(item, field.checked);
          break;
        default:
          setFieldItem(item, field.value);
          break;
      }
      triggerChange(field);
    });
  }






  /**
   * ---------------------------------------------------------------------------
   *  Util Function
   * ---------------------------------------------------------------------------
   */

  /**
   * 设置表单字段的值
   * @param {Object} field - 列表项
   * @param {Object} field - 表单字段
   * @param {string} value - 值
   */
  function setFieldValue (item, field, value) {
    field.value = value;
    item && setFieldItem(item, field.value);
    triggerChange(field);
  };

  /**
   * 设置表单字段的选中状态
   * @param {Object}  field   - 表单字段
   * @param {boolean} checked - 是否选中
   */
  function setFieldChecked (field, checked) {
    field.checked = checked;
    triggerChange(field);
  };

  /**
   * 设置列表项的状态
   * @param {Object} item  - 列表项
   * @param {string} state - 状态
   */
  function setItemState (item, state) {
    $.fn.addClass.call([item], state);
  };

  /**
   * 取消列表项的状态
   * @param {Object} item  - 列表项
   * @param {string} state - 状态
   */
  function unsetItemState (item, state) {
    $.fn.removeClass.call([item], state);
  };

  /**
   * 触发 change 事件
   * @param  {Object} field - 表单字段
   */
  function triggerChange (field) {
    $.fn.trigger.call([field], "change");
  }





  /**
   * ---------------------------------------------------------------------------
   *  Exports
   * ---------------------------------------------------------------------------
   */
  return {
    fill:      fillForm,   // 填充表单
    reset:     resetForm,  // 重置表单
    showItems: showItems,  // 显示字段
    hideItems: hideItems   // 隐藏字段
  };





})(window, document, $);


