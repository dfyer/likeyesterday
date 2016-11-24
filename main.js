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
});
