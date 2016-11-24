// dummy location data
var locationData = [
  {
    name: "서울특별시",
    children: [
      {
        name: "관악구",
        children: [
          { name: "낙성대동" },
          { name: "봉천동" },
          { name: "신림동" }
        ]
      },
      {
        name: "강남구",
        children: [
          { name: "역삼동" },
          { name: "개포동" },
          { name: "논현동" }
        ]
      },
      {
        name: "구로구",
        children: [
          { name: "구로동" },
          { name: "대림동" },
          { name: "신도림동" }
        ]
      }
    ]
  },
  {
    name: "부산광역시",
    children: [
      {
        name: "사하구",
        children: [
          { name: "하단동" },
          { name: "괴정동" },
          { name: "당리동" }
        ]
      },
      {
        name: "해운대구",
        children: [
          { name: "좌동" },
          { name: "송정동" },
          { name: "우동" }
        ]
      },
      {
        name: "수영구",
        children: [
          { name: "광안동" },
          { name: "망미동" },
          { name: "남천동" }
        ]
      }
    ]
  },
  {
    name: "인천광역시",
    children: [
      {
        name: "부평구",
        children: [
          { name: "산곡동" },
          { name: "청천동" },
          { name: "갈산동" }
        ]
      },
      {
        name: "서구",
        children: [
          { name: "검암동" },
          { name: "연희동" },
          { name: "가좌동" }
        ]
      },
      {
        name: "연수구",
        children: [
          { name: "송도동" },
          { name: "연수동" },
          { name: "옥련동" }
        ]
      }
    ]
  }
];
$(document).ready(function() {
  $('#get-data').click(function() {
    var accessResult = $('#access-result');

    function extemp(temp, wspd) {
      var wspd_kmh = 3.6 * wspd;
      return (13.12
        + 0.6215 * temp
        - 11.37  * Math.pow(wspd, 0.16)
        + 0.3965 * Math.pow(wspd, 0.16) * temp).toFixed(2);
    }

    // YESTERDAY
    $.ajax({
      type:"GET",
      url:"http://apis.skplanetx.com/weather/history/yesterday",
      data: {
        version:"1",
        lat:"37.4771",
        lon:"126.9634",
        appKey:"0b5e02ae-9e17-36f8-9e88-c087f2b9b97b",
        isTimeRange:"Y"
      },
      dataType:"json",
      success: function(json) {
        //accessResult.text('Success');
        console.log(json);
        var sky = json.weather.yesterday[0].day.hourly[0].sky.name;
        var wspd = json.weather.yesterday[0].day.hourly[0].wind.wspd;
        var temp = json.weather.yesterday[0].day.hourly[0].temperature;
        $('#yesterday-sky').text(sky);
        $('#yesterday-wspd').text(wspd);
        $('#yesterday-temp').text(temp);
        $('#yesterday-extemp').text(extemp(parseFloat(temp), parseFloat(wspd)));
      },
      error: function(xhr, status, error) {
        //accessResult.text('Failed');
        alert(error);
      }
    });

    // TODAY
    $.ajax({
      type:"GET",
      url:"http://apis.skplanetx.com/weather/current/hourly",
      data: {
        version:"1",
        lat:"37.4771",
        lon:"126.9634",
        appKey:"0b5e02ae-9e17-36f8-9e88-c087f2b9b97b"
      },
      dataType:"json",
      success: function(json) {
        //accessResult.text('Success');
        console.log(json);
        var sky = json.weather.hourly[0].sky.name;
        var wspd = json.weather.hourly[0].wind.wspd;
        var temp = json.weather.hourly[0].temperature.tc;
        $('#today-sky').text(sky);
        $('#today-wspd').text(wspd);
        $('#today-temp').text(temp);
        $('#today-extemp').text(extemp(parseFloat(temp), parseFloat(wspd)));
      },
      error: function(xhr, status, error) {
        //accessResult.text('Failed');
        alert(error);
      }
    });
  });
  
  // add onchange listener
  $("#city").change(changeCounty);
  $("#county").change(changeVillage);
  
  // populate city dropdown
  for (var i = 0; i < locationData.length; i++) {
    var opt = $("<option>")
      .addClass("val")
      .val(locationData[i].name)
      .text(locationData[i].name);
    $("#city").append(opt);
  }
  
  // onclick event for get weather button
  $("#get-weather").click(function() {
    var city = $("#city").val();
    var county = $("#county").val();
    var village = $("#village").val();
    
    alert("city: " + city + " county: " + county + " village: " + village);
  });
});

function changeCounty() {
  var city = $(this).val();
  
  $("#county .val").remove();
  $("#village .val").remove();
  if (!city) {
    return;
  }
  
  for (var i = 0; i < locationData.length; i++) {
    if (locationData[i].name == city) {
      for (var j = 0; j < locationData[i].children.length; j++) {
        var opt = $("<option>")
          .addClass("val")
          .data("city", city)
          .val(locationData[i].children[j].name)
          .text(locationData[i].children[j].name);
        $("#county").append(opt);
      }
      break;
    }
  }
}
function changeVillage() {
  var city = $(this).find("option:selected").data("city");
  var county = $(this).val();
  
  $("#village .val").remove();
  if (!county) {
    return;
  }
  
  for (var i = 0; i < locationData.length; i++) {
    if (locationData[i].name == city) {
      for (var j = 0; j < locationData[i].children.length; j++) {
        if (locationData[i].children[j].name == county) {
          for (var k = 0; k < locationData[i].children[j].children.length; k++) {
            var opt = $("<option>")
              .addClass("val")
              .val(locationData[i].children[j].children[k].name)
              .text(locationData[i].children[j].children[k].name);
            $("#village").append(opt);
          }
          break;
        }
      }
      break;
    }
  }
}