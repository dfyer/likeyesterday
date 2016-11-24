$(document).ready(function() {
  $('#get-data').click(function() {
    var todayData = $('#today-data');
    var accessResult = $('#access-result');

    function extemp(temp, wspd) {
      return (13.12
        + 0.6215 * temp
        - 11.37  * Math.pow(wspd, 0.16)
        + 0.3965 * Math.pow(wspd, 0.16) * temp);
    }

    /*
    var latitude = -1;
    var longitude = -1;

    if(navigator.geolocation) {
      var x = navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      });
    } else {
      accessResult.text("Geolocation is not supported by this browser");
    }
    */

    // YESTERDAY
    $.ajax({
      type:"GET",
      url:"http://apis.skplanetx.com/weather/history/yesterday",
      data: {
        version:"1",
        lat:"37.5714000000",
        lon:"126.9658000000",
        appKey:"0b5e02ae-9e17-36f8-9e88-c087f2b9b97b",
        isTimeRange:"Y"
      },
      dataType:"json",
      success: function(json) {
        //accessResult.text('Success');
        console.log(json);
        $('#yesterday-sky').text(json.weather.yesterday[0].day.hourly[0].sky.name);
        $('#yesterday-wspd').text(json.weather.yesterday[0].day.hourly[0].wind.wspd);
        $('#yesterday-temp').text(json.weather.yesterday[0].day.hourly[0].temperature);
        //$('#yesterday-extemp').text(extemp(parseFloat(temp), parseFloat(wspd)));
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
        lat:"37.5714000000",
        lon:"126.9658000000",
        appKey:"0b5e02ae-9e17-36f8-9e88-c087f2b9b97b"
      },
      dataType:"json",
      success: function(json) {
        //accessResult.text('Success');
        console.log(json);
        $('#today-sky').text(json.weather.hourly[0].sky.name);
        $('#today-temp').text(json.weather.hourly[0].temperature.tc);
      },
      error: function(xhr, status, error) {
        //accessResult.text('Failed');
        alert(error);
      }
    });
    todayData.text('Hello, World!');
  });
});
