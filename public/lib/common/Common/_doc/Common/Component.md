
## 组件 Component





### 1 页面组件 `Page`

!!! Demo---Page
    <details><summary>查看代码 | [查看效果](#page-demo-com-page-1){: data-modal="#modal-demo-com-page" }</summary>
      ```html
        <section class="page active" id="page-demo-com-page-1">
          <nav class="navbar">
            <h2>Demo: 页面组件</h2>
          </nav>
          <article class="scrollable">
            <div class="panel-body">
              <a href='#page-demo-com-page-2'>Go to Page 2 without data</a><br>
              <a href='#page-demo-com-page-2&data="test-data"'>Go to Page 2 with data</a>
            </div>
          </article>
        </section>
        <section class="page" id="page-demo-com-page-2">
          <nav class="navbar">
            <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
            <h2>Page 2</h2>
          </nav>
          <article class="scrollable">
            <div class="panel-body" id="content-demo-com-page-2"></div>
          </article>
        </section>
        <script>
          $("#page-demo-com-page-1").on("close", function (event) {
            if (!event.pageData) {
              window.alert("Please transfer data");
              return event.preventDefault();
            }
          });
          $("#page-demo-com-page-2").on("open", function (event) {
            $("#content-demo-com-page-2")[0].innerHTML
              = "pageData: " + event.pageData + "<br>"
              + "referrer: " + event.referrer + "<br>";
          });
        </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-page">
  <section class="page active" id="page-demo-com-page-1">
    <nav class="navbar">
      <h2>Demo: 页面组件</h2>
    </nav>
    <article class="scrollable">
      <div class="panel-body">
        <a href='#page-demo-com-page-2'>Go to Page 2 without data</a><br>
        <a href='#page-demo-com-page-2&data="test-data"'>Go to Page 2 with data</a>
      </div>
    </article>
  </section>
  <section class="page" id="page-demo-com-page-2">
    <nav class="navbar">
      <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
      <h2>Page 2</h2>
    </nav>
    <article class="scrollable">
      <div class="panel-body" id="content-demo-com-page-2"></div>
    </article>
  </section>
  <script>
    window.addEventListener("load", function (event) {
      $("#page-demo-com-page-1").on("close", function (event) {
        if (!event.pageData) {
          window.alert("Please transfer data");
          return event.preventDefault();
        }
      });
      $("#page-demo-com-page-2").on("open", function (event) {
        $("#content-demo-com-page-2")[0].innerHTML
          = "pageData: " + event.pageData + "<br>"
          + "referrer: " + event.referrer + "<br>";
      });
    });
  </script>
</div>


#### 1.1 HTML

  **1.1.1 基本结构**
  > 1\. 需作为子元素放在 `<body>` 下
  > 2\. id 必须以 `page-` 为前缀

  ```html
    <body>

      <!-- 页面 1 -->
      <section class="page" id="page-id-1">
        <article class="scrollable">
          ...
        </article>
      </section>

      <!-- 页面 2 -->
      <section class="page" id="page-id-2">
        <article class="scrollable">
          ...
        </article>
      </section>

    </body>
  ```

  **1.1.2 页面标题**
  > 有两种方式，而且互斥，同时只能选择其中一种

  ```html
    <!-- 使用导航栏 -->
    <section class="page" id="page-id-1">
      <nav class="navbar">
        <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
        <h2>页面1</h2>
      </nav>
      <article class="scrollable">
        ...
      </article>
    </section>

    <!-- 直接修改 document.title -->
    <section class="page" id="page-id-1" data-title="页面1">
      <article class="scrollable">
        ...
      </article>
    </section>
  ```

  **1.1.2 页面跳转**
  > 使用 `<a>` 标签

  ```html
    <!-- 跳转到页面2 -->
    <a href="#page-id-2">页面2</a>

    <!-- 跳转到页面2, 并传送数据
      1. 数据通过 目标页面 的 `open` 事件中的 `event.pageData` 获取
      2. 数据格式为 JSON 字符串
      3. href 属性需使用单引号
      4. 默认会清除 Url 中的数据, 使用 hold-data 可保留
    -->
    <a href='#page-id-2&data={"key":"value"}'>页面2</a>
    <!-- 保留 url中的数据 -->
    <a href='#page-id-2&hold-data={"key":"value"}'>页面2</a>

    <!-- 返回 -->
    <a href="javascript:window.history.back();">返回</a>
  ```

#### 1.2 Javascript
  > 历史记录只能由点击或程序产生，如果在地址栏输入将导致历史错乱
  > pageID 可以是 selector | DOM | $(DOM)

  **1.2.1 页面跳转**
  ```javascript
    1. $.ui.page.open(pageID, pageData);    // 显示页面同时记录 url 历史
    2. $.ui.page.replace(pageID, pageData); // 显示页面并覆盖当前 url 历史
  ```

  **1.2.1 页面事件**
  ```javascript
    $(pageID).on("open", function (event) {
      event.pageData;          // 页面数据
      event.referrer;          // 上文页面ID
      event.preventDefault();  // 阻止跳转至本页面
    });
    $(pageID).on("close", function (event) {
      event.pageData;          // 页面数据
      event.referrer;          // 下文页面ID
      event.preventDefault();  // 阻止跳转至本页面
    });
  ```










<br><br>










### 2 表单组件 `Form`

!!! Demo---Form
    <details><summary>查看代码 | [查看效果](#page-demo-com-form){: data-modal="#modal-demo-com-form" }</summary>
      ```html
        <form name="form-demo-com-form" novalidate>
          <menu class="list list-form">
            <li class="list-item input empty">
              <span class="placeholder">请输入</span>
              <label class="label">文本框</label>
              <input class="form-control" type="text" name="inputName" placeholder="请输入" required data-label="文本">
            </li>
            <a class="list-item select empty" href="#page-demo-com-form-options">
              <span class="placeholder">请选择</span>
              <label class="label">选择框</label>
              <select class="form-control" name="selectName" placeholder="请选择" required data-label="选择框">
                <option value selected></option>
                <option></option>
              </select>
            </a>
            <li class="list-item radio active">
              <label class="label">单选框</label>
              <input class="hide" type="radio" name="radioName" value="value" checked>
            </li>
            <li class="list-item radio">
              <label class="label">单选框</label>
              <input class="hide" type="radio" name="radioName" value="value2">
            </li>
            <li class="list-item checkbox active">
              <label class="label">复选框</label>
              <input class="hide" type="checkbox" name="checkboxName" value="value" checked>
            </li>
          </menu>
        </form>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-form">
  <section class="page active" id="page-demo-com-form">
    <nav class="navbar">
      <h2>Demo: 表单组件</h2>
    </nav>
    <article>
      <form name="form-demo-com-form" novalidate>
        <menu class="list list-form">
          <li class="list-item input empty">
            <span class="placeholder">请输入</span>
            <label class="label">文本框</label>
            <input class="form-control" type="text" name="inputName" placeholder="请输入" required data-label="文本">
          </li>
          <a class="list-item select empty" href="#page-demo-com-form-options">
            <span class="placeholder">请选择</span>
            <label class="label">选择框</label>
            <select class="form-control" name="selectName" placeholder="请选择" required data-label="选择框">
              <option value selected></option>
              <option></option>
            </select>
          </a>
          <li class="list-item radio active">
            <label class="label">单选框</label>
            <input class="hide" type="radio" name="radioName" value="value" checked>
          </li>
          <li class="list-item radio">
            <label class="label">单选框</label>
            <input class="hide" type="radio" name="radioName" value="value2">
          </li>
          <li class="list-item checkbox active">
            <label class="label">复选框</label>
            <input class="hide" type="checkbox" name="checkboxName" value="value" checked>
          </li>
        </menu>
      </form>
    </article>
  </section>
  <section class="page" id="page-demo-com-form-options">
    <nav class="navbar">
      <a class="navbar-btn navbar-back" href="javascript:window.history.back();"></a>
      <h2>表单组件-选项列表</h2>
    </nav>
    <article>
      <menu class="list list-form">
        <a class="list-item option" href="javascript:window.history.back();"
           data-form="form-demo-com-form" data-select="selectName" data-value="1" data-text="选项1">选项1</a>
        <a class="list-item option" href="javascript:window.history.back();"
           data-form="form-demo-com-form" data-select="selectName" data-value="2" data-text="选项2">选项2</a>
        <a class="list-item option" href="javascript:window.history.back();"
           data-form="form-demo-com-form" data-select="selectName" data-value="3" data-text="选项3">选项3</a>
      </menu>
    </article>
  </section>
</div>


#### 2.1 HTML

  **2.1.1 基本结构**

  ```html
    <form name="formName" novalidate>
      <menu class="list list-form">
        <!-- 表单字段 -->
        <li class="list-item">...</li>
        ...
      </menu>
    </form>
  ```

  **2.1.2 表单字段**

> 1.设置 .list-item 的类型和状态:
>     1.类型：`.input`, `.select`, `.option`, `.radio`, `.checkbox`
>     2.状态：`.empty`(空), `.hide`(隐藏), `.active`(激活)
>     3.样式: `.radio-front`, .checkbox`-front`
> 2.阻止在 .list-item 内点击触发组件功能:
>     1.添加 data-stop-form 属性

  ```html

    <!-- 文本框 -->
    <li class="list-item input empty">
      <span class="placeholder">请输入字段1</span>
      <label class="label">字段1</label>
      <input class="form-control" type="text" name="inputName" required data-label="字段1">
    </li>

    <!-- 选择框 -->
    <li class="list-item select empty">
      <span class="placeholder">请选择字段2</span>
      <label class="label">字段2</label>
      <select class="form-control" name="selectName" required data-label="字段2">
        <option value selected></option>
        <option></option>
      </select>
    </li>

    <!-- 单选框 -->
    <li class="list-item radio active">
      <h4>字段3</h4>
      <p><small>说明</small></p>
      <input class="hide" type="radio" name="radioName" value="value" checked>
    </li>

    <!-- 复选框 -->
    <li class="list-item checkbox active">
      <h4>字段4</h4>
      <p><small>说明</small></p>
      <input class="hide" type="checkbox" name="checkboxName" value="value" checked>
    </li>
  ```

  **2.1.3 选择框的选项列表**

  > `data-form`:   对应表单的 name 属性
  > `data-select`: 对应选择框的 name 属性
  > `data-value`:  对应选择框的值
  > `data-text`:   对应选择框的文本

  ```html
    <menu class="list list-form">
      <li class="list-item option" data-form="formName" data-select="selectName" data-value="value" data-text="label">
        选项1
      </li>
    </menu>
  ```

#### 2.1 Javascript

  ```javascript
    1.$.ui.form.fill(form, data);     // 填充表单
    2.$.ui.form.reset(form);          // 重置表单
    3.$.ui.form.showItems(field...);  // 显示字段
    4.$.ui.form.hideItems(field...);  // 隐藏字段
  ```










<br><br>










### 3 模态框组件 `Modal`

!!! Demo---Modal
    <details><summary>查看代码 | [查看效果](javascript:;){: data-modal="#modal-demo-com-modal" }</summary>
      ```html
        <div class="modal fade" id="modal-demo-com-modal" data-dismiss="#modal-demo-com-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4>Modal header</h4>
                <span class="close" data-dismiss="#modal-demo-com-modal">&times;</span>
              </div>
              <div class="modal-body">Modal body</div>
              <div class="modal-footer">
                <button class="btn btn-default" type="button">OK</button>
                <button class="btn" type="button" data-dismiss="#modal-demo-com-modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ```
    </details>

<div class="modal fade" id="modal-demo-com-modal" data-dismiss="#modal-demo-com-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4>Modal header</h4>
        <span class="close" data-dismiss="#modal-demo-com-modal">&times;</span>
      </div>
      <div class="modal-body">Modal body</div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button">OK</button>
        <button class="btn" type="button" data-dismiss="#modal-demo-com-modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

#### 3.1 HTML

  ```html
    <button data-modal="#modal-id">弹出</button>
    <div class="modal fade" id="modal-id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button data-dismiss="#modal-id">关闭</button>
          </div>
        </div>
      </div>
    </div>
  ```

#### 3.2 Javascript

  ```javascript
    1.$.ui.modal.open(modal_id);   // 打开模态框
    2.$.ui.modal.close(modal_id);  // 关闭模态框
    3.$(modal_id).on("open", function (event) {   // 模态框打开事件
        event.relatedTarget;  // 触发打开的按钮
      });
    4.$(modal_id).on("close", function (event) {  // 模态框关闭事件
        event.relatedTarget;  // 触发关闭的按钮
      });
  ```










<br><br>










### 4 轮播组件 `Carousel`

!!! Demo---Carousel
    <details><summary>查看代码 | [查看效果](#page-demo-com-carousel){: data-modal="#modal-demo-com-carousel" }</summary>
      ```html
        <div class="carousel" style="height:100%;background-color:#333;">
          <ol class="carousel-inner" style="color:#fff;font-size:60px;">
            <li class="item active"><br><br>1</li>
            <li class="item"><br><br>2</li>
            <li class="item"><br><br>3</li>
          </ol>
          <ol class="carousel-indicators">
            <li class="active" data-index="0"></li>
            <li data-index="1"></li>
            <li data-index="2"></li>
          </ol>
        </div>
        <script>
          $(".carousel").on("last", function (event) {
            $(this).trigger("reset");
            window.alert("Reset the Carousel");
          });
        </script>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-carousel">
  <section class="page active" id="page-demo-com-carousel">
    <nav class="navbar">
      <h2>Demo: 轮播组件</h2>
    </nav>
    <article>
      <div class="carousel" style="height:100%;background-color:#333;">
        <ol class="carousel-inner" style="color:#fff;font-size:60px;">
          <li class="item active"><br><br>1</li>
          <li class="item"><br><br>2</li>
          <li class="item"><br><br>3</li>
        </ol>
        <ol class="carousel-indicators">
          <li class="active" data-index="0"></li>
          <li data-index="1"></li>
          <li data-index="2"></li>
        </ol>
      </div>
      <script>
        window.addEventListener("load", function (event) {
          $("#page-demo-com-carousel").find(".carousel").on("last", function (event) {
            $(this).trigger("reset");
            window.alert("Reset the Carousel");
          });
        });
      </script>
    </article>
  </section>
</div>

#### 4.1 HTML

  ```html
    <div class="carousel">
      <ol class="carousel-inner">
        <li class="item active">...</li>
        <li class="item">...</li>
        ...
      </ol>
      <ol class="carousel-indicators">
        <li class="active" data-index="0"></li>
        <li data-index="1"></li>
        ...
      </ol>
    </div>

    <!-- 垂直模式 -->
    <div class="carousel vertical">
      ...
    </div>

    <!-- 触发滑动事件的目标元素 -->
    <div class="carousel" data-target="body">
      <!-- 阻止滑动事件 -->
      <li class="item" data-stop-carousel>...</li>
      ...
    </div>
  ```

#### 4.2 Javascript

  ```javascript
    1.$(carousel_id).trigger("reset");  // 重置为首页
    2.$(carousel_id).on("last");        // 末页事件
  ```










<br><br>










### 5 标签页组件 `Tabs`

!!! Demo---Tabs
    <details><summary>查看代码 | [查看效果](#page-demo-com-tabs){: data-modal="#modal-demo-com-tabs" }</summary>
      ```html
        <ul class="tab-nav">
          <li class="active" data-tab="#tab-1">1</li>
          <li data-tab="#tab-2">2</li>
        </ul>
        <div class="tab-content" style="margin-bottom:10px">
          <div class="tab-pane active" id="tab-1">&#12288;The first tab.</div>
          <div class="tab-pane" id="tab-2">&#12288;The second tab..</div>
        </div>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-tabs">
  <section class="page active" id="page-demo-com-tabs">
    <nav class="navbar">
      <h2>Demo: 标签页组件</h2>
    </nav>
    <article>
      <ul class="tab-nav">
        <li class="active" data-tab="#tab-1">1</li>
        <li data-tab="#tab-2">2</li>
      </ul>
      <div class="tab-content" style="margin-bottom:10px">
        <div class="tab-pane active" id="tab-1">&#12288;The first tab.</div>
        <div class="tab-pane" id="tab-2">&#12288;The second tab..</div>
      </div>
    </article>
  </section>
</div>

#### 5.1 HTML

  ```html
    <ul class="tab-nav">
      <li class="active" data-tab="#tab-1">...</li>
      <li data-tab="#tab-2">...</li>
      ...
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="tab-1">...</div>
      <div class="tab-pane" id="tab-2">...</div>
      ...
    </div>
  ```










<br><br>










### 6 计价组件 `Amount`

!!! Demo---Amount
    <details><summary>查看代码 | [查看效果](#page-demo-com-amount){: data-modal="#modal-demo-com-amount" }</summary>
      ```html
        <menu class="list">
          <li class="list-item">
            <label class="label">价格</label>
            <div class="pull-right">
              ￥<span id="amount-target-id">0.00</span>
            </div>
          </li>
          <li class="list-item">
            <label class="label">数量</label>
            <div class="amount-box pull-right" style="margin-top:5px">
              <button type="button" dir="-">-</button>
              <input type="text" name="name" min="1" value="1"
                     data-target="#amount-target-id" data-price="8" data-free="1">
              <button type="button" dir="+">+</button>
            </div>
          </li>
        </menu>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-amount">
  <section class="page active" id="page-demo-com-amount">
    <nav class="navbar">
      <h2>Demo: 计价组件</h2>
    </nav>
    <article>
      <menu class="list">
        <li class="list-item">
          <label class="label">价格</label>
          <div class="pull-right">
            ￥<span id="amount-target-id">0.00</span>
          </div>
        </li>
        <li class="list-item">
          <label class="label">数量</label>
          <div class="amount-box pull-right" style="margin-top:5px">
            <button type="button" dir="-">-</button>
            <input type="text" name="name" min="1" value="1"
                   data-target="#amount-target-id" data-price="8" data-free="1">
            <button type="button" dir="+">+</button>
          </div>
        </li>
      </menu>
    </article>
  </section>
</div>

#### 6.1 HTML

  > 1\. data-target: 显示总价的目标元素 (可选)
  > 2\. data-price:  指定商品单价
  > 3\. data-free:   指定免费数量 (可选)

  ```html
    <!-- 显示总价的目标元素 -->
    <span id="target-id">...</span>
    <!-- 设置商品数量的组件 -->
    <div class="amount-box">
     <button type="button" dir="-">-</button>
     <input type="text" name="name" min="1" value="1"
            data-target="#target-id" data-price="8" data-free="1">
     <button type="button" dir="+">+</button>
    </div>
  ```










<br>










### 7 滑动导航组件 `Offcanvas`

!!! Demo---Offcanvas
    <details><summary>查看代码 | [查看效果](#page-demo-com-offcanvas){: data-modal="#modal-demo-com-offcanvas" }</summary>
      ```html
        <div class="offcanvas-wrapper" style="height:100%">
          <div class="offcanvas-container" style="height:100%">
            <section class="offcanvas">
              <article class="offcanvas-panel scrollable">
                <div class="offcanvas-inner">
                  &#12288;offcanvas-inner
                </div>
              </article>
            </section>
            &#12288;<button class="btn" type="button" data-open-offcanvas>
              offcanvas
            </button>
          </div>
        </div>
      ```
    </details>

<div is="modal-demo" id="modal-demo-com-offcanvas">
  <section class="page active" id="page-demo-com-offcanvas">
    <nav class="navbar">
      <h2>Demo: 滑动导航组件</h2>
    </nav>
    <article>
      <div class="offcanvas-wrapper" style="height:100%">
        <div class="offcanvas-container" style="height:100%">
          <section class="offcanvas">
            <article class="offcanvas-panel scrollable">
              <div class="offcanvas-inner">
                &#12288;offcanvas-inner
              </div>
            </article>
          </section>
          &#12288;<button class="btn" type="button" data-open-offcanvas>
            offcanvas
          </button>
        </div>
      </div>
    </article>
  </section>
</div>

#### 7.1 HTML

  ```html
    <div class="offcanvas-wrapper">
      <div class="offcanvas-container" style="height:80px">
        <section class="offcanvas">
          <article class="offcanvas-panel scrollable">
            <div class="offcanvas-inner">
              offcanvas-inner
            </div>
          </article>
        </section>
        <button class="btn" type="button" data-open-offcanvas>
          offcanvas
        </button>
      </div>
    </div>
  ```





<br><br><br><br>
