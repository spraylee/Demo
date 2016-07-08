/**
 * @overview Javascript UI 库
 *
 * =============================================================================
 *  History 页面历史
 * =============================================================================
 *
 *  说明:
 *    处理单页模式的页面历史
 *
 * =============================================================================
 *
 * @require ../core/core.js, ../core/fn.js, ../core/event.js
 * @require ./page.js
 *
 * @author 董经伟
 * @create 2014-03-31
 * @version 1.4.2
 *
 * @update 2015-09-17
 *   1.添加页面定位功能
 * @update 2016-04-22
 *   1.Fixed bug
 */

$.history = (function (window, document, $) {




  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var _records = [];





  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */

  $(document).on("readystatechange", function (event) {
    if("complete" === document.readyState) {
      setHomeByActive() || setHomeByURL() || setHomeByDefault();
    }
  });

  // 从 className 设置首页
  function setHomeByActive (nowID) {
    var home = $(".page.active")[0];
    if (!home) { return false; }
    var homeID = "#" + home.id;
    $.history.nowID = homeID;
    replace(homeID);
    return true;
  }

  // 从 URL 设置首页
  function setHomeByURL () {
    var hash   = window.location.hash;
    var pageID = hash.split("&")[0];
    var page = $(pageID)[0];
    if (!page) { return false; }
    if (/&hold-data=/.test(hash)) {
      pageID = hash;
    }
    replace(pageID);
    return true;
  }

  // 设置默认首页
  function setHomeByDefault () {
    var defHome = $(".page")[0];
    if (!defHome) { return false; }
    var defID = "#" + defHome.id;
    replace(defID);
    return true;
  }





  /**
   * ---------------------------------------------------------------------------
   *  Function
   * ---------------------------------------------------------------------------
   */

  // 历史定位
  function find (pageID) {
    return _records.indexOf(pageID) + 1;
  };

  // 更新历史
  function update (pageID) {
    var index = find(pageID);
    if (index) {
      _records.splice(index);
    } else {
      _records.push(pageID);
    }
  };

  // 跳至历史
  function go (pageID) {
    var index = find(pageID);
    if (index) {
      fallback(index);
    } else {
      window.location.hash = pageID;
    }
  };

  // 历史回退
  function fallback (index) {
    var offset = index - _records.length;
    if (0 > offset) {
      window.history.go(offset);
    }
  };

  // 覆盖历史
  function replace (pageID) {
    if (pageID.split("&")[0] !== $.history.nowID) {
      _records.pop();
      if (/&hold-data=/.test(pageID)) {
        _records.push(pageID);
      } else {
        _records.push(pageID.split("&")[0]);
      }
    }
    var url = window.location.href.split("#")[0] + pageID;
    if (window.history && window.history.replaceState) {
      // Fixed Android bug
      window.history.replaceState(null, document.title, url);
      $(window).trigger("hashchange");
    } else {
      if (pageID === window.location.hash) {
        $(window).trigger("hashchange");
      } else {
        window.location.replace(url);
      }
    }
  };





  /**
   * ---------------------------------------------------------------------------
   *  Export API
   * ---------------------------------------------------------------------------
   */

  return {
    locked:  false,
    nowID:   "",
    records: _records,
    go:      go,
    find:    find,
    update:  update,
    replace: replace
  };


})(window, document, $);
