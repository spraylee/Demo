
## 模块 Module


### 1 核心模块 `Core`

> 底层核心模块，参考 jQuery API 实现其中的一些功能

#### 1.1 命名空间 `$`

  1.1.1 选择器/包装器
  ```javascript
    1. $(selector);                       // 包装所查询的元素集合
  ```

  1.1.2 核心方法
  ```javascript
    1. $.isArray(data);                   // 判断数据是否数组类型
    2. $.inArray(data, array);            // 判断数据是否在数组中
    3. $.each(array, handler);            // 遍历数组
  ```

#### 1.2 原型方法 `$.fn`

  ```javascript
    1. $.fn.eq(index);                    // 选择元素
    2. $.fn.add(array);                   // 添加元素
    4. $.fn.hasClass(className);          // 判断是否含有某个类名
    5. $.fn.addClass(className);          // 添加类名
    6. $.fn.removeClass(className);       // 删除类名
    7. $.fn.toggleClass(className);       // 切换类名
    8. $.fn.find(selector);               // 查询后代元素
    9. $.fn.closest(selector);            // 查询最近的祖先元素
  ```

#### 1.3 事件封装 `Event`

  ```javascript
    1. $.Event(type, [props], [detail]);         // 创建 Event 对象
    2. $.fn.on(eventName, [delegate], handler);  // 绑定事件
    3. $.fn.one(eventName, handler);             // 绑定一次性事件
    4. $.fn.trigger(eventName, [data]);          // 触发事件
  ```

#### 1.4 异步通信 `AJAX`

  1.4.1 核心方法
  ```javascript
    1. $.ajax(url, [settings]);           // AJAX 方法
    2. $.get(url, [data], [callback]);    // GET 方法
    3. $.post(url, [data], [callback]);   // POST 方法
    4. $.ajaxSetup(settings);             // 设置全局参数
  ```

  1.4.2 Promise 回调
  ```javascript
    $.ajax(url, settings)
     .done(callback)                      // 处理成功
     .fail(callback)                      // 处理失败
     .always(callback);                   // 处理完毕 (成功或失败都执行)
  ```










<br><br>










### 2 表单模块 `Form`


#### 2.1 表单验证 `Validate`

> 覆盖 HTML5 原生 checkValidity 方法

!!! Demo---Validate
    <details><summary>查看代码 | [查看效果](javascript:;){: data-modal="#modal-demo-form-validate" }</summary>
      ```html
      <form name="form" novalidate>
        <input class="form-control" type="tel" name="mobile"
               placeholder="请填写手机"
               maxLength="11" required data-label="手机号码">
        <input class="form-control" type="password" name="password"
               placeholder="请填写密码"
               required data-label="密码">
        <input class="form-control" type="text" name="label"
               placeholder="不设置 data-label 的示例"
               minlength="3" required>
        <button class="btn btn-default btn-block" type="submit">提交</button>
      </form>

      <script>
        var form = document.forms("form");
        form.onsubmit = function (event) {
          event.preventDefault();
          if (!form["mobile"].checkValidity()) {
            return false;
          }
          if (!form.checkValidity()) {
            return false;
          }
          alert("提交成功");
        };
      </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-form-validate">
  <section class="page active">
    <nav class="navbar">
      <h2>Demo: 表单验证</h2>
    </nav>
    <article>
      <form name="form-validate" novalidate>
        <input class="form-control" type="tel" name="mobile" placeholder="请填写手机" maxLength="11" required data-label="手机号码">
        <input class="form-control" type="password" name="password" placeholder="请填写密码" required data-label="密码">
        <input class="form-control" type="text" name="label" placeholder="不设置 data-label 的示例" minlength="3" required>
        <button class="btn btn-default btn-block" type="submit">提交</button>
      </form>
    </article>
    <script>
      window.addEventListener("load", function (event) {
        var form = document.forms["form-validate"];
        form.onsubmit = function (event) {
          event.preventDefault();
          if (!form["mobile"].checkValidity()) {
            return false;
          }
          if (!form.checkValidity()) {
            return false;
          }
          alert("提交成功");
        };
      });
    </script>
  </section>
</div>

  2.1.1 HTML API
  ```html
    <!-- 需添加 novalidate 属性 -->
    <form novalidate>

      <!-- 支持的类型 -->
      <input type="tel">                        <!-- 手机 -->
      <input type="url">                        <!-- 网址 -->
      <input type="email">                      <!-- 邮箱 -->
      <input type="password">                   <!-- 密码 -->

      <!-- 支持的自定义类型 -->
      <input type="text" data-type="date">      <!-- 日期-->
      <input type="text" data-type="phone">     <!-- 电话-->
      <input type="text" data-type="zipcode">   <!-- 邮编-->
      <input type="text" data-type="noun">      <!-- 名词 (非纯数字/非纯特殊字符)-->
      <input type="text" data-type="chinese">   <!-- 中文名-->
      <input type="text" data-type="english">   <!-- 英文名-->
      <input type="text" data-type="resident">  <!-- 身份证号-->
      <input type="text" data-type="receipt">   <!-- 回执号-->

      <!-- 支持的属性 -->
      <input type="text" required>              <!-- 必填项 -->
      <input type="text" pattern="^\d{11}$">    <!-- 正则表达式 -->
      <input type="text" minLength="6">         <!-- 最小长度 -->
      <input type="text" maxLength="12">        <!-- 最大长度 -->

      <!-- 验证失败时的提示文本 (建议必填), 不填默认是 "内容" -->
      <input type="tel" data-label="手机号码">

    </form>
  ```

  2.1.2 Javascript API
  ```javascript
    1. HTMLFormElement.checkValidity();   // 验证表单下的所有字段
    2. HTMLInputElement.checkValidity();  // 验证单个表单字段
  ```



<br>



#### 2.2 字段联动 `Linkage`

> 根据映射关系显示或隐藏字段
> 依赖 [表单组件](#2-form_1)（涉及UI展示）
> 注：这个 API 需要进一步优化

!!! Demo---Linkage
    <details><summary>查看代码 | [查看效果](#page-form-linkage){: data-modal="#modal-demo-form-linkage" }</summary>
      ```html
        <form class="list list-form" name="form-linkage" novalidate>
          <div class="list-item input">
            <label class="label">input</label>
            <input class="form-control" type="text" name="input" placeholder="输入123">
          </div>
          <div class="list-item checkbox hide">
            <label class="label">checkbox</label>
            <input class="hide" type="checkbox" name="checkbox" hidden>
          </div>
          <fieldset class="hide" name="fieldset">
            <a class="list-item select hide" href="#page-form-linkage-select-1">
              <label class="label">select_1</label>
              <select class="form-control" name="select_1" placeholder="请选择" hidden>
                <option value selected></option>
                <option></option>
              </select>
            </a>
            <a class="list-item select hide" href="#page-form-linkage-select-2">
              <label class="label">select_2</label>
              <select class="form-control" name="select_2" placeholder="请选择" hidden>
                <option value selected></option>
                <option></option>
              </select>
            </a>
          </fieldset>
        </form>

        <section class="page" id="page-form-linkage-select-1">...</section>
        <section class="page" id="page-form-linkage-select-2">...</section>

        <script>
          var form = document.forms["form-linkage"];
          var linkage_items = {
            "input": {
              "123": ["checkbox"]
            },
            "checkbox": [
              "fieldset"
            ]
          };
          var linkage_values = {
            "select_1": {
              "select_2": {
                "0": ["0", "1"],
                "1": ["1"]
              }
            }
          };
          $.util.form.linkage(form, linkage_items, linkage_values, function (event) {
            if ("input_1" === event.target.name) {
              window.alert("input_1 has changed");
            }
          });
        </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-form-linkage">
  <section class="page active" id="page-form-linkage">
    <nav class="navbar">
      <h2>Demo: 表单字段联动</h2>
    </nav>
    <article>
      <form class="list list-form" name="form-linkage" novalidate>
        <div class="list-item input">
          <label class="label">input</label>
          <input class="form-control" type="text" name="input" placeholder="输入123">
        </div>
        <div class="list-item checkbox hide">
          <label class="label">checkbox</label>
          <input class="hide" type="checkbox" name="checkbox" hidden>
        </div>
        <fieldset class="hide" name="fieldset">
          <a class="list-item select hide" href="#page-form-linkage-select-1">
            <label class="label">select_1</label>
            <select class="form-control" name="select_1" placeholder="请选择" hidden>
              <option value selected></option>
              <option></option>
            </select>
          </a>
          <a class="list-item select hide" href="#page-form-linkage-select-2">
            <label class="label">select_2</label>
            <select class="form-control" name="select_2" placeholder="请选择" hidden>
              <option value selected></option>
              <option></option>
            </select>
          </a>
        </fieldset>
      </form>
      <script>
        window.addEventListener("load", function (event) {
          var form = document.forms["form-linkage"];
          var linkage_items = {
            "input": {
              "123": ["checkbox"]
            },
            "checkbox": [
              "fieldset"
            ]
          };
          var linkage_values = {
            "select_1": {
              "select_2": {
                "0": ["0", "1"],
                "1": ["1"]
              }
            }
          };
          $.util.form.linkage(form, linkage_items, linkage_values, function (event) {
            if ("input_1" === event.target.name) {
              window.alert("input_1 has changed");
            }
          });
          form.onsubmit = function (event) { event.preventDefault(); };
        });
      </script>
    </article>
  </section>
  <section class="page" id="page-form-linkage-select-1">
    <nav class="navbar">
      <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
      <h2>select_1</h2>
    </nav>
    <menu class="list list-form">
      <a class="list-item option" href="javascript:window.history.back();"
         data-form="form-linkage" data-select="select_1" data-value="0">select_2: [0,1]&lrm;</a>
      <a class="list-item option" href="javascript:window.history.back();"
         data-form="form-linkage" data-select="select_1" data-value="1">select_2: [1]&lrm;</a>
    </menu>
  </section>
  <section class="page" id="page-form-linkage-select-2">
    <nav class="navbar">
      <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
      <h2>select_2</h2>
    </nav>
    <menu class="list list-form">
      <a class="list-item option" href="javascript:window.history.back();"
         data-form="form-linkage" data-select="select_2" data-value="0">0</a>
      <a class="list-item option" href="javascript:window.history.back();"
         data-form="form-linkage" data-select="select_2" data-value="1">1</a>
      <a class="list-item option" href="javascript:window.history.back();"
         data-form="form-linkage" data-select="select_2" data-value="2">2</a>
    </menu>
  </section>
</div>

2.2.1 HTML API

  ```html
    <!-- 需要按照 [表单组件] 的规范来写 -->
    <form novalidate>
      <menu class="list list-form">
        <!-- 默认显示的字段 -->
        <div class="list-item">
          <input class="form-control" name="">
        </div>
        <!-- 默认隐藏的字段 -->
        <div class="list-item hide">                   <!-- 需添加 hide 类名 -->
          <input class="form-control" name="" hidden>  <!-- 需添加 hidden 属性 -->
        </div>
        <!-- 用 <fielset> 包含多个字段 -->
        <fieldset name="">
          <!-- 当集合显示/隐藏的时候会自动设置 hide 和 hidden -->
          <div class="list-item">...</div>
          ...
        </fieldset>
        <!-- 添加 data-wrap 表明显示/隐藏的时候不触发 hide 和 hidden 的变化 -->
        <fieldset name="" data-wrap>
          ...
        </fieldset>
        <!-- 默认隐藏的字段集合 -->
        <fieldset class="hide" name="">
          <!-- 内部字段也需要同时都设为隐藏字段 -->
          <div class="list-item hide">...</div>
          ...
        </fieldset>
      </menu>
    </form>
  ```

2.2.2 Javascript API

  ```javascript
    // 联动数据映射表: 字段->值->字段
    linkage_items = {
      "checkbox_name": ["(field|fieldset)_name"...],
      "(select|input)_name": {
        "value_1": ["(field|fieldset)_name"...]
      }
    };
    // 联动数据映射表: 字段值->字段值
    linkage_values = {
      "(select|input)_1_name": {
        "select_2_name": {
          "select_1_value_1": ["select_2_value_1"...]
        }
      }
    };
    // 监听 `change` 事件的处理函数
    mixinHandler = function (event) {...};
    /**
     * 初始化
     * @require ./listForm.js
     */
    $.util.form.linkage(form, linkage_items, [linkeage_values], [mixinHandler]);
  ```



<br>



#### 2.3 获取数据 `GetData`

> 1. 遍历表单字段，以 `name` 属性的值 为 key，以字段的值为 value，生成 JSON 数据
> 例：`<input name="a[b][]" value="1">` -> `{ a: { b: [1] } }`
> 2. `<select>` 标签会以 `name` 属性的值加上 `_label` 后缀生成额外的 key
> 例：`<select name="a"><option value="1">text</option></select>` -> `{ a: 1, a_label: "text"}`
> 3. 没有设置 `name` 属性，或设置了 `hidden`/`data-ignore` 属性 的字段不会被获取

!!! Demo---FormData
    <details><summary>查看代码 | [查看效果](javascript:;){: data-modal="#modal-demo-form-data" }</summary>
      ```html
        <form name="form-data" novalidate>
          <small>普通数据 name="normal"</small>
          <input class="form-control" type="text" name="normal" value="normal_value">
          <small>数组 name="array[]"</small>
          <input class="form-control" type="text" name="array[]" value="array_value_1">
          <small>数组 name="array[]"</small>
          <input class="form-control" type="text" name="array[]" value="array_value_2">
          <small>对象 name="object[key_1]"</small>
          <input class="form-control" type="text" name="object[key_1]" value="object_key_1_value">
          <small>对象 name="object[key_2]"</small>
          <input class="form-control" type="text" name="object[key_2]" value="object_key_2_value">
          <small>选择框 name="select"</small>
          <select class="form-control" type="text" name="select">
            <option value="select_value">select_text</option>
          </select>
          <small>忽略 name="ignore"</small>
          <input class="form-control" type="text" name="ignore" value="ignore_value" data-ignore>
          <small>附加字段 name="attached" (试下把值清空)</small>
          <input class="form-control" type="text" name="attached" value="attached_value"
                 data-attach-field="attach" data-attach-value="attach_value" data-attach-text="attach_text">
          <button class="btn btn-default btn-block" type="submit">获取JSON</button>
        </form>

        <script>
          var form = document.forms["form-data"];
          form.onsubmit = function (event) {
            event.preventDefault();
            var data = $.util.form.getData(form);
            window.alert("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
          };
        </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-form-data">
  <section class="page active">
    <nav class="navbar">
      <h2>Demo: 获取表单数据</h2>
    </nav>
    <article>
      <form name="form-data" novalidate>
        <small>普通数据 name="normal"</small>
        <input class="form-control" type="text" name="normal" value="normal_value">
        <small>数组 name="array[]"</small>
        <input class="form-control" type="text" name="array[]" value="array_value_1">
        <small>数组 name="array[]"</small>
        <input class="form-control" type="text" name="array[]" value="array_value_2">
        <small>对象 name="object[key_1]"</small>
        <input class="form-control" type="text" name="object[key_1]" value="object_key_1_value">
        <small>对象 name="object[key_2]"</small>
        <input class="form-control" type="text" name="object[key_2]" value="object_key_2_value">
        <small>选择框 name="select"</small>
        <select class="form-control" type="text" name="select">
          <option value="select_value">select_text</option>
        </select>
        <small>忽略 name="ignore"</small>
        <input class="form-control" type="text" name="ignore" value="ignore_value" data-ignore>
        <small>附加字段 name="attached" (试下把值清空)</small>
        <input class="form-control" type="text" name="attached" value="attached_value"
               data-attach-field="attach" data-attach-value="attach_value" data-attach-text="attach_text">
        <button class="btn btn-default btn-block" type="submit">获取JSON</button>
      </form>
      <script>
        window.addEventListener("load", function (event) {
          "use strict";
          var form = document.forms["form-data"];
          form.onsubmit = function (event) {
            event.preventDefault();
            var data = $.util.form.getData(form);
            window.alert("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
          };
        });
      </script>
    </article>
  </section>
</div>

2.3.1 HTML API

  ```html
    <!-- 数据类型 -->
    <input type="text" name="normal">              <!-- 普通数据 -->
    <input type="text" name="array[]">             <!-- 数组 -->
    <input type="text" name="object[key]">         <!-- 对象 -->

    <!-- 选项 -->
    <input type="text" name="ignore" data-ignore>  <!-- 忽略此字段 -->

    <!-- 附加字段 -->
    <!-- 当主字段有值时才生效 -->
    <input type="text" name="attach"
           attach-field="field_name"
           attach-value="field_value"
           attach-text="field_text">
  ```

2.3.1 Javascript API

  ```javascript
    $.util.form.getData(form);
  ```


<br>



#### 2.4 表单提交 `Submit`

> 封装表单提交功能
> 1\. 阻止默认提交事件
> 2\. 显示页面加载效果
> 3\. 调用表单验证模块
> 4\. 支持 AJAX Promise 对象

!!! Demo---Submit
    <details><summary>查看代码 | [查看效果](javascript:;){: data-modal="#modal-demo-form-submit" }</summary>
      ```html
        <form name="form-submit" novalidate>
          <input class="form-control" type="text" name="key" placeholder="必填项" required>
          <button class="btn btn-default btn-block" type="submit" name="dosubmit">提交表单</button>
        </form>

        <script>
          var form = document.forms["form-submit"];
          $.util.form.submit(form, function (event) {
            return {
              // 模拟 Promise 对象
              always: function (unhold) {
                window.setTimeout(function () {
                  window.alert("提交成功");
                  unhold();
                }, 1500);
              }
            };
          });
        </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-form-submit">
  <section class="page active">
    <nav class="navbar">
      <h2Demo表单提交</h2>
    </nav>
    <article>
      <form name="form-submit" novalidate>
        <input class="form-control" type="text" name="key" placeholder="必填项" required>
        <button class="btn btn-default btn-block" type="submit" name="dosubmit">提交表单</button>
      </form>
      <script>
        window.addEventListener("load", function (event) {
          var form = document.forms["form-submit"];
          $.util.form.submit(form, function (event) {
            return {
              // 模拟 Promise 对象
              always: function (unhold) {
                window.setTimeout(function () {
                  window.alert("提交成功");
                  unhold();
                }, 1500);
              }
            };
          });
        });
      </script>
    </article>
  </section>
</div>

2.4.1 HTML API
> 必须为 `<form>` 添加 `novalidate` 属性
> 必须有一个 `name="dosubmit"` 的 `<button>` 按钮

  ```html
    <form novalidate>
      <input type="text">
      <button type="submit" name="dosubmit"></button>
    </form>
  ```

2.4.1 Javascript API

  ```javascript
    $.util.form.submit(form, function (event, data, unhold) {
      event.holdon = true; // 保持加载状态
      unhold();            // 解除加载状态
      return $.ajax();     // 在 AJAX 结束时才解除加载状态
    });
  ```









<br><br>










### 3 地图模块 `Map`


#### 3.1 地理定位 `Geolocation`

  ```javascript
    // 获取地理定位
    $.map.getGeolocation({
      success: function (geo) {
        /**
         * geo = {
         *   address: {
         *     province: String,
         *     city: String
         *   },
         *   latitude:  Number,
         *   longitude: Number,
         *   point: {
         *     lat: Number,
         *     lng: Number
         *   }
         * }
         */
      },
      fail: function (geo) {},
      always: function (geo) {}
    };
  ```







<br><br><br><br>
