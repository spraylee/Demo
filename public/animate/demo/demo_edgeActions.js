/***********************
* Adobe Edge Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes
//Edge symbol: 'stage'
(function(symbolName) {









      Symbol.bindElementAction(compId, symbolName, "${download2}", "touchstart", function(sym, e) {
         // 当用户开始触摸对象时插入的代码将运行（仅用于触摸设备）
         alert("开始下载APP");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${guide}", "touchstart", function(sym, e) {
         // 当用户开始触摸对象时插入的代码将运行（仅用于触摸设备）
         alert("进入新手体验");

      });
      //Edge binding end

})("stage");
   //Edge symbol end:'stage'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-455333329");