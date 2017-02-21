var http = require('http');

var url = "http://test.derweili.de/alexa/mycalendar/test.php";

var request = {
    'hostname': url,
    'auth': 'derweili:wXGZaGv7qtFXKd5S'
};

var username = 'derweili';
var password = '3RAUt4KeFgSkeRrT';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');



var httpRequest = http.request({'hostname': url,
                            'auth': auth
                           }, function(httpResponse){
    httpResponse.setEncoding("UTF8");

    var responseData = "";
    httpResponse.on("data", function(data){
        responseData = responseData + data;
    });

    httpResponse.on("end", function(){
        var responseObject = JSON.parse(responseData);
        console.log(responseObject.message);
    });

});

httpRequest.end();