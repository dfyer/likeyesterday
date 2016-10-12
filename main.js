$(document).ready(function() {
  $('#get-data').click(function() {
    var showData = $('#show-data');
    var accessResult = $('#access-result');

    $.ajax({
      type:"GET",
      url:"http://apis.skplanetx.com/weather/current/minutely",
      data: { version:"1", lat:'37.5714000000', lon:'126.9658000000', appKey:"0b5e02ae-9e17-36f8-9e88-c087f2b9b97b" },
      dataType:"json",
      success: function(json) {
        accessResult.text('Success');
        console.log(json);
        $('#sky').text(json.weather.minutely[0].sky.name);
        //$('#temperature').text(json.weather.temperature);
      },
      error: function(xhr, status, error) {
        accessResult.text('Failed');
        alert(error);
      }
    });

    /*
    var url = "http://apis.skplanetx.com/weather/current/minutely";
    var param = {
      version:1,
      lat=37.5714000000,
      lon:126.9658000000
    };
    $.getJSON(url, param, function(data) {
      console.log(data);
      var items = data.items.map(function (item) {
        return item.key + ":" + item.value;
      });

      showData.empty();

      if(items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });
    */
    showData.text('Hello, World!');
  });
});
/*
    $.getJSON('example.json', function(data) {
      console.log(data);

      var items = data.items.map(function (item) {
        return item.key + ":" + item.value;
      });

      showData.empty();

      if(items.length) {
        var content = '<li>' + items.join('</li><li>') + '</li>';
        var list = $('<ul />').html(content);
        showData.append(list);
      }
    });

    showData.text('Loading the JSON file.');
  });
*
});

/*
    var url = "http://apis.skplanetx.com/weather/current/minutely"
    var param = {
      version:1,
      citi:"서울"
      county:"강남구"
      village:"도곡동"
    }

    $.getJSON(url, data, success);
*/
