## 界面 UI





### 1 按钮 `Button`

<div>
  <a class="btn" href="javascript:;">&lt;a&gt;</a>
  <span class="btn">&lt;span&gt;</span>
  <button class="btn" type="button">&lt;button&gt;</button>
</div>
<div>
  <button class="btn btn-sm">.btn-sm</button>
  <button class="btn btn-md">.btn-md</button>
  <button class="btn btn-lg">.btn-lg</button>
</div>
<div>
  <button class="btn">normal</button>
  <button class="btn btn-default">.btn-default</button>
  <!-- <button class="btn btn-primary">.btn-primary</button> -->
  <button class="btn btn-success">.btn-success</button>
  <button class="btn btn-danger">.btn-danger</button>
</div>
<div>
  <button class="btn btn-flat">.btn-flat</button>
  <button class="btn btn-pill">.btn-pill</button>
</div>
<div style="position:relative;height:80px;background-color:#f7f7f7;border:1px solid #c9c9c9">
  <button class="btn btn-corner">.btn-corner</button>
</div>
<div>
  <button class="btn btn-block">.btn-block</button>
</div>

  ```html
    <a class="btn" href="javascript:;">&lt;a&gt;</a>
    <span class="btn">&lt;span&gt;</span>
    <button class="btn" type="button">&lt;button&gt;</button>

    <button class="btn btn-sm">.btn-sm</button>
    <button class="btn btn-md">.btn-md</button>
    <button class="btn btn-lg">.btn-lg</button>

    <button class="btn">normal</button>
    <button class="btn btn-default">.btn-default</button>
    <button class="btn btn-success">.btn-success</button>
    <button class="btn btn-danger">.btn-danger</button>

    <button class="btn btn-flat">.btn-flat</button>
    <button class="btn btn-pill">.btn-pill</button>

    <div style="position:relative;height:80px;background-color:#f7f7f7;border:1px solid #c9c9c9">
      <button class="btn btn-default btn-corner">.btn-corner</button>
    </div>

    <button class="btn btn-block">.btn-block</button>
  ```





<br>





### 2 表单 `Form`

<form>
  <fieldset>
    <label>
      <abbr title="abbr">*</abbr>label
    </label>
    <input type="text" class="form-control" placeholder=".form-control">
    <textarea rows="5" placeholder="textarea"></textarea>
  </fieldset>
</form>

  ```html
    <form>
      <fieldset>
        <label>
          <abbr title="abbr">*</abbr>label
        </label>
        <input type="text" class="form-control" placeholder=".form-control">
        <textarea rows="5" placeholder="textarea"></textarea>
      </fieldset>
    </form>
  ```





<br>





### 3 表格 `Table`

<div class="table-wrap">
  <table class="table">
    <thead>
      <tr> <th>head-1</th> <th>head-2</th> <th>head-3</th> <th>head-4</th> <th>head-5</th> </tr>
    </thead>
    <tbody>
      <tr> <td>cell-1-1</td> <td>cell-1-2</td> <td>cell-1-3</td> <td>cell-1-4</td> <td>cell-1-5</td> </tr>
      <tr> <td>cell-2-1</td> <td>cell-2-2</td> <td>cell-2-3</td> <td>cell-2-4</td> <td>cell-2-5</td> </tr>
      <tr> <td>cell-3-1</td> <td>cell-3-2</td> <td>cell-3-3</td> <td>cell-3-4</td> <td>cell-3-5</td> </tr>
    </tbody>
  </table>
</div>

  ```html
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr> <th>head-1</th> <th>head-2</th> <th>head-3</th> <th>head-4</th> <th>head-5</th> </tr>
        </thead>
        <tbody>
          <tr> <td>cell-1-1</td> <td>cell-1-2</td> <td>cell-1-3</td> <td>cell-1-4</td> <td>cell-1-5</td> </tr>
          <tr> <td>cell-2-1</td> <td>cell-2-2</td> <td>cell-2-3</td> <td>cell-2-4</td> <td>cell-2-5</td> </tr>
          <tr> <td>cell-3-1</td> <td>cell-3-2</td> <td>cell-3-3</td> <td>cell-3-4</td> <td>cell-3-5</td> </tr>
        </tbody>
      </table>
    </div>
  ```





<br>





### 4 面板 `Panel`

<div style="overflow:hidden;margin-bottom:10px;padding:0 10px;background-color:#f7f7f7">
  <div class="panel">
    <div class="panel-title">panel-title</div>
    <div class="panel-body">
      panel-body
      <br>...
    </div>
  </div>
</div>

  ```html
    <div style="overflow:hidden;margin-bottom:10px;padding:0 10px;background-color:#f7f7f7">
      <div class="panel">
        <div class="panel-title">panel-title</div>
        <div class="panel-body">
          panel-body
          <br>...
        </div>
      </div>
    </div>
  ```





<br>





### 5 列表 `List`

<div style="margin-bottom:10px">
  <menu class="list">
    <li class="list-item">item-1</li>
    <li class="list-item">item-2</li>
    <li class="list-item">item-3</li>
  </menu>
</div>

  ```html
    <menu class="list">
      <li class="list-item">item-1</li>
      <li class="list-item">item-2</li>
      <li class="list-item">item-3</li>
    </menu>
  ```





<br>





### 6 进度条 `Progress`

<div class="progress">
  <div class="progress-bar" title="20%" style="width:20%"></div>
</div>

  ```html
    <div class="progress">
      <div class="progress-bar" title="20%" style="width:20%"></div>
    </div>
  ```





<br>





### 7 开关 `Switch`

<div style="margin-bottom:10px">
  <label class="switch">
    <input type="checkbox" name="sfxtkzd" value="1">
    <span class="switch-handler"></span>
    <span class="switch-bg"></span>
  </label>
</div>

  ```html
    <label class="switch">
      <input type="checkbox" name="sfxtkzd" value="1">
      <span class="switch-handler"></span>
      <span class="switch-bg"></span>
    </label>
  ```





<br>





### 8 杂项 `Misc`

* `.pull-left` -- 向左浮动
* `.pull-right` -- 向右浮动
* `.text-left` -- 文本居左
* `.text-right` -- 文本居右
* `.text-center` -- 文本居中
* `.text-justify` -- 文本自适应
* `.hide` -- 隐藏
* `.clearfix` -- 清除浮动
* `.col-xs-6` -- 50%宽度
* `.list-unstyled` -- 去除 `<ul>`,`<ol>` 默认样式
* `.img`,`.img-sib`,`.icon`,`.icon-sib`,`.inline-block` -- 垂直居中的行内块样式
* `.icon` -- 图标
* `.unselect` -- 禁用文本选择





<br><br><br><br>

