---
  references:
    - Common/Index.md
    - Common/UI.md
    - Common/Component.md
    - Common/Module.md
    - Common/Misc.md
    - Specification/Index.md
    - Workflow/Index.md

  title: Common doc
  athor: 董经伟
  date:  2015-11-18
  settings:
    css:
    - default
    - http://ems.xfxg.cn/Public/Common/_dist/1.0.0/common.css
---

<!-- Custom element -->
<script>
  var ModalDemoProto = Object.create(HTMLElement.prototype);
  ModalDemoProto.createdCallback = function () {
    this.className = "modal fade scrollable";
    this.dataset.dismiss = "#" + this.id;
    var dialog = document.createElement("div");
    var demo = document.createElement("div");
    dialog.className = "modal-dialog modal-content";
    demo.className = "demo";
    var that = this;
    window.setTimeout(function () {
      [].slice.call(that.children).forEach(function (child) {
        demo.appendChild(child);
      });
      dialog.appendChild(demo);
      that.appendChild(dialog);
    });
  };
  document.registerElement("modal-demo", {
    prototype: ModalDemoProto,
    extends: "div"
  });
</script>

<script defer src="http://ems.xfxg.cn/Public/Common/_doc/scrollSpy.js"></script>
<script defer src="http://ems.xfxg.cn/Public/Common/_dist/1.0.0/common.js"></script>


<button class="btn btn-flat btn-sm btn-menu" type="button"
        onclick="document.body.classList.toggle('show-toc');
        this.innerHTML='open menu'===this.innerHTML?'close menu':'open menu'">close menu</button>






[TOC]


# 微信前端架构说明文档 {: class="text-center" }


<br><br>






<script>
  document.body.classList.add("show-toc");
  document.getElementsByClassName("toc")[0].onmousewheel = function (event) {
    var willScrollTop = this.scrollTop + event.deltaY;
    var maxScrollTop = this.scrollHeight - this.clientHeight;
    if (0 >= willScrollTop) {
      event.preventDefault();
      this.scrollTop = 0;
    }
    if (maxScrollTop <= willScrollTop) {
      event.preventDefault();
      this.scrollTop = maxScrollTop;
    }
  }
</script>
