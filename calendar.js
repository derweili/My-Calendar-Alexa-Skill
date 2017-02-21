var http = require('http')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an Alexa Skill, this is running on a deployed lambda function", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {

          case "GetTodaysEvents":

                var url = "http://test.derweili.de/alexa/mycalendar/test.php";

                var httpRequest = http.request(url, function(httpResponse){
                    httpResponse.setEncoding("UTF8");

                    var responseData = "";
                    httpResponse.on("data", function(data){
                        responseData = responseData + data;
                    });

                    httpResponse.on("end", function(){
                        var responseObject = JSON.parse(responseData);
                        console.log(responseObject.message);

                        context.succeed(
                        generateResponse(
                            buildSpeechletResponse(responseObject.message, true),
                            {}
                        )
                        );


                    });

                });

                httpRequest.end();

            break;

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}