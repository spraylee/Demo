/**
 * =============================================================================
 *
 *  TITLE   :  定位
 *  for page:  location.html page-index
 *
 * =============================================================================
 *
 * @author 李军
 * @create 2016-7-4
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var $page = $("#page-index");
  var $btn = $("#location-btn");

  var $mapBox = $("#map-box");

  var _ak = "HgmYGsGcjmB6g2CTeQG9Q9i1M6xprjQm";
  var _map;
  var _defaultCity = "广州市";
  var _defaultZoom = 15;

  /**
   * ---------------------------------------------------------------------------
   *  Init
   * ---------------------------------------------------------------------------
   */
  if (navigator.geolocation) {
    // alert(' 你的浏览器支持 geolocation ');
  } else {
    alert(' 你的浏览器不支持 geolocation ');
  }

  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
  $page.on("open", function(event) {
    // var map = new BMap.Map("map-box");
    // _map = map;
    // map.centerAndZoom(_defaultCity, _defaultZoom);

  });

  $btn.on("click", function(event) {
    // $.map.getGeolocation({ success: success, fail: fail });
    $.map.getGeolocation({
      always: function(geo) {
        console.dir(geo);
        var map = new BMap.Map("map-box");
        _map = map;
        var myPoint = new BMap.Point(geo.longitude, geo.latitude);
        map.centerAndZoom(myPoint, _defaultZoom);
        var marker = new BMap.Marker(myPoint);// 创建标注
        map.addOverlay(marker);
        var geoc = new BMap.Geocoder();
        var param = {longitude: geo.longitude, latitude: geo.latitude};
        geoc.getLocation(geo.point, function(rs){
          var addComp = rs.addressComponents;
          console.dir(rs);
          alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        });
      }
    });
  });



  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */




  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */



  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */




  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */
  function AJAX_getInfoByGeo(geo, success) {
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=" + _ak + "&location=" + geo.latitude + "," + geo.longitude + "&callback=success&output=json&pois=1";
    var param = null;
    $.ajax(url, {
      type: "POST",
      dataType: "JSONP",
      success: function(data) {
        console.dir(data);
      }
    });
  }


})(window, document, $);