$(document).ready(function() {
    console.log( "ready!" );

  var getRhyme = function(word){
    $.get( "http://rhymebrain.com/talk?function=getRhymes&word="+ word + "", function( data ) {
      console.log(data[0].word);
      var i = 0;
     
      while (i < 5){
      $('.rhymeswith').prepend(" "+ data[i].word + ",");
      i = i + 1;
      }
    });
  }


    var timeSince = function(){  // called when no sound recieve, wait two seconds then launch speechweb API
     var i = 0;
     timeSincelastword = setInterval(function(){
         i = i + 1
         console.log(i + " seconds");
          clearInterval(timeSincelastword); 
          recognition.start(); 
        }, 2000);
     }
  
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";
    recognition.maxAlternatives = 1;
    recognition.interimResults = false;//only deliver final
    recognition.onend = function() {
      console.log('Speech recognition service disconnected');
      timeSince(); // wait two seconds then launch webkit again
    }
    recognition.onresult = function(event) {
      var result = event.results[event.results.length-1]
      console.log(result[0].transcript);
      $('.inputword').prepend(" "+ result[0].transcript + "<br>");
      getRhyme(result[0].transcript);
    }
    recognition.start();
  
});