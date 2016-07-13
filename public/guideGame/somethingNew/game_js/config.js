/**
 * =============================================================================
 *
 *  TITLE   :  新手体验-数据配置
 *  for page:  guideGame.js
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-6-23
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var proxy = window.location.pathname.match(/(?:\/(?:devi|tiger|biaofei))?/i)[0];
  var host  = window.location.protocol + "//" + window.location.host + proxy;

  window.CONFIG = window.CONFIG || {};
  // window.CONFIG.successWordImg = {
  //   0: host + "/Public/Xfxg/img/guide/game/u24.png",
  //   1: host + "/Public/Xfxg/img/guide/game/u27.png",
  //   2: host + "/Public/Xfxg/img/guide/game/u38.png",
  //   3: host + "/Public/Xfxg/img/guide/game/u46.png"
  // }
  window.CONFIG.successWord = {
    0: "GET: 纯色背景墙",
    1: "GET: 光线均匀明亮",
    2: "GET: 整理好头发",
    3: "GET: 纯色的衣服"
  }

  window.CONFIG.missionInfo = {
    0: {
      mainWord: "背景太杂，认不出你啦~",
      detailWord: "你才是主角儿哦"
    },
    1: {
      mainWord: "才不要待在暗处呢",
      detailWord: "拍出闪亮的自己"
    },
    2: {
      mainWord: "哎呀，精致的五官被遮住了",
      detailWord: "展现你的精气神儿"
    },
    3: {
      mainWord: "啊哦，被你的衣服抢镜了",
      detailWord: "纯色更显气质哦"
    }
  }
  // window.CONFIG.tipsWord = {
  //   "0": "移除杂物",
  //   "1": "使光线均匀明亮",
  //   "2": "整理好头发",
  //   "3": "更换纯色的衣服"
  // }

  window.CONFIG.tipsWord = {
    "0": "请将杂物移到边框之外",
    "1": "向左滑动，更换光亮均匀的环境",
    "2": "拨动头发区域，进行整理",
    "3": "拖动图标到衣服区域，换成纯色"
  }



})(window, document, $);
