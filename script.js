$(document).ready(function(){

  let sequence = [];
  let score = 0;
  let gameCheck = false;
  let checkingIndex = 0;
  var timeCheck = false;
  let hardMode = false;

//SVG animation

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  function describeArc(x, y, radius, startAngle, endAngle){
  
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
  
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
  
      return d;       
  }
  
    document.getElementById("arc1").setAttribute("d", describeArc(87, 87, 70, 0, 0));   // When width < 500px
    document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
 
//Intro animation

$(".intro").css("display", "block").addClass("animated rollIn")

$(".intro").on("click", function(){
  $(this).addClass("animated rollOut");
  
  setTimeout(() => {
    $(".intro").css("display", "none");
    $(".mode").css("display", "block").addClass("animated flipInX");
    $(".intro").removeClass("animated rollOut rollIn");
  }, 2000);
});

//Easy mode animation + start game

$("#easy").on("click", function(){
  $(".mode").addClass("animated flipOutX");
  $("#red").animate({backgroundColor : "red"}, 2000, function(){
    $("#yellow").animate({backgroundColor : "yellow"}, 1000, function(){
      $("#green").animate({backgroundColor : "green"}, 1000, function(){
        $("#blue").animate({backgroundColor : "blue"}, 1000, function(){
          $(".counter").css("display", "block").addClass("animated", "tada");
          setTimeout(function(){
            $(".mode").css("display", "none").removeClass("animated flipOutX flipInX");
            easyMode();
            setTimeout(function(){
              checker();
            }, 1000)
          }, 2000)
        });
      });
    });
  });
})

//Hard mode + start game

$("#hard").on("click", function(){
  $(".mode").addClass("animated flipOutX");
  $("#red").animate({backgroundColor : "red"}, 2000, function(){
    $("#yellow").animate({backgroundColor : "yellow"}, 1000, function(){
      $("#green").animate({backgroundColor : "green"}, 1000, function(){
        $("#blue").animate({backgroundColor : "blue"}, 1000, function(){
          $(".counter").css("display", "block").addClass("animated", "tada");
          hardMode = true;
          setTimeout(function(){
            $(".mode").css("display", "none").removeClass("animated flipOutX flipInX");
            easyMode();
            setTimeout(function(){
              checker();
            }, 1000)
          }, 2000)
        });
      });
    });
  });
})


//Reset button

$("#reset a").on("click", function(e){
  e.preventDefault();
  timeCheck = false;
  hardMode = false;
  clearInterval(animate);
  clearTimeout(stopTime);
  score = 0;
  sequence = [];
  $("#red").animate({backgroundColor : "#131313"}, 500, function(){
    $("#yellow").animate({backgroundColor : "#131313"}, 500, function(){
      $("#green").animate({backgroundColor : "#131313"}, 500, function(){
        $("#blue").animate({backgroundColor : "#131313"}, 500, function(){
        });
      });
    });
  });
  $("#blue").off("click");
  $("#red").off("click");
  $("#green").off("click");
  $("#yellow").off("click");    
  document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
  $(".counter").fadeOut(function(){
    $(".mode").css("display", "none");
    $(this).css("display", "none");
    $(".intro").fadeIn();
    $("span").css("display", "none");
  });

});


//Time check

function time(){
  stopTime = setTimeout(function(){
    var deg = 0;
    if (timeCheck){
      clearInterval(animate);
      document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
      setTimeout(() => {
        runAgain();  
      }, 1500);
      $("span").fadeOut(function() {
        $(this).text("TimeOut").fadeIn();
      }); 
    }
  }, 10000);
} 


//SVG arc animation


function arcAnimate(){
  var deg = 0;
  animate = setInterval(function(){
 
      if ($(window).width() < 500) {
        document.getElementById("arc1").setAttribute("d", describeArc(87, 87, 70, 0, deg));
      }
     else {
      document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, deg));
     }
    
    deg+=4.5/2;
  }, 125/2);
}


//Start easymode


function easyMode(){
  score+=1;
  $(".counter span").fadeIn(200, function(){
    $(this).html(score);
  });
  sequence.push(Math.floor(Math.random()*4));
  runAgain();
}


//Game runs again if you guessed wrong


function runAgain(){
  var j = 0;
  $("span").fadeOut(function(){
    $(this).text(score).fadeIn().removeClass("flash");
  })
  
  document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
  gameCheck = false;

  sequence.forEach(function(val, i){   //Loop through sequence array
  setTimeout(function(){              //Function checks value and plays sound/animation accordingly 
   if (val === 0){
        $("#green").addClass("shadowOnG").removeClass("opacity").delay(1000).queue(function(next){
          $(this).removeClass("shadowOnG");
          $(this).addClass("opacity")
          next();
        });
        $("#greenS").get(0).play();
    }
    else if (val === 1){
        $("#red").addClass("shadowOnR").removeClass("opacity").delay(1000).queue(function(next){
          $(this).removeClass("shadowOnR");
          $(this).addClass("opacity");
          next();
        });
        $("#redS").get(0).play();
    }
    else if (val === 2){
      $("#yellow").addClass("shadowOnY").removeClass("opacity").delay(1000).queue(function(next){
        $(this).removeClass("shadowOnY");
        $(this).addClass("opacity");
        next();
      });
      $("#yellowS").get(0).play();
    }
    else if (val === 3){
      $("#blue").addClass("shadowOnB").removeClass("opacity").delay(1000).queue(function(next){
        $(this).removeClass("shadowOnB");
        $(this).addClass("opacity");
        next();
      });
      $("#blueS").get(0).play();
    }
    (function(){           //IIFE to enable clicks at the end
      if (i == sequence.length-1){
        gameCheck = true;
        // checker();
        timeCheck = true;
        arcAnimate();
        time();
        
       }
    }(i));

    j++;
 }, i * 2000);
  
  
});

checkingIndex = 0;
}


//Checker to check if the player clicked correctly or otehrwise

function checker(){         
    checkingIndex = 0;

    //Green button

    $("#green").on("click", function(e){
      e.preventDefault();
      if (gameCheck){                                   //Checks if the click is enabled
        $("#greenS").get(0).play();
        console.log(checkingIndex);
        if (sequence[checkingIndex] === 0){           //Check if clicked the correct sequence
          if (checkingIndex === sequence.length-1){  // To check if the last clicked is the last in sequence : run the next sequence
            timeCheck = false;
            gameCheck = false;
            clearInterval(animate);
            clearTimeout(stopTime);
            setTimeout(() => {
            easyMode();
            }, 2000);
          }
          checkingIndex+=1;
        }
        else {
          timeCheck = false;
          clearInterval(animate);
          clearTimeout(stopTime);
          gameCheck = false;
          if (hardMode){                           //Check if hardmode is enabled
            score = 0;
            sequence = [];
            $("span").text("Wrong").addClass("animated flash");
            setTimeout(() => {
              easyMode();
            }, 2000);
          }
          else {
            $("span").text("Wrong").addClass("animated flash");
          setTimeout(() => {
            runAgain();
            }, 2000);
          }
        }
      }

      //Red button

    });
    $("#red").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
        $("#redS").get(0).play();
        if (sequence[checkingIndex] === 1){
          if (checkingIndex === sequence.length-1){
            timeCheck = false;
            gameCheck = false;
            clearInterval(animate);
            clearTimeout(stopTime);
            setTimeout(() => {
              easyMode();
            }, 2000);
          }
          checkingIndex+=1;
        }
        else {
          timeCheck = false;
          gameCheck = false;
          clearInterval(animate);
          clearTimeout(stopTime);
          if (hardMode){
            score = 0;
            sequence = [];
            $("span").text("Wrong").addClass("animated flash");
            setTimeout(() => {
              easyMode();
            }, 2000);
          }
          else {
            $("span").text("Wrong").addClass("animated flash");
            setTimeout(() => {
            runAgain();
            }, 2000);
          }
        }
      }
    });

    //Yellow button


    $("#yellow").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
      $("#yellowS").get(0).play();
      if (sequence[checkingIndex] === 2){
        if (checkingIndex === sequence.length-1){
          timeCheck = false;
          gameCheck = false;
          clearInterval(animate);
          clearTimeout(stopTime);
          setTimeout(() => {
            easyMode();
          }, 2000);
        }
        checkingIndex+=1;
      }
      else {
        timeCheck = false;
        gameCheck = false;
        clearInterval(animate);
        clearTimeout(stopTime);
        if (hardMode){
          score = 0;
          sequence = [];
          $("span").text("Wrong").addClass("animated flash");
          setTimeout(() => {
          easyMode();
          }, 2000);
        }
        else {
          $("span").text("Wrong").addClass("animated flash");
          setTimeout(() => {
            runAgain();
          }, 2000);
        }
      }
    }
  });
    
  //Blue button


    $("#blue").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
      $("#blueS").get(0).play();
      if (sequence[checkingIndex] === 3){
        if (checkingIndex === sequence.length-1){
          gameCheck = false;
          timeCheck = false;
          clearInterval(animate);
          clearTimeout(stopTime);
          setTimeout(() => {
            easyMode();
          }, 2000);
        }
        checkingIndex+=1;
      }
      else {
        gameCheck = false;
        timeCheck = false;
        clearInterval(animate);
        clearTimeout(stopTime);
        if (hardMode){
          score = 0;
          sequence = [];
          $("span").text("Wrong").addClass("animated flash");
          setTimeout(() => {
            easyMode();
          }, 2000);
        }
        else {
          $("span").text("Wrong").addClass("animated flash");
          setTimeout(() => {
            runAgain();
          }, 2000);
        }
      }
    }  
  });
}


//Hover effect on reset button


  $("#reset a").hover(function(){
    $("#icon").addClass("fa-spin");
  }, function(){
    $("#icon").removeClass("fa-spin");
  });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~The End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
