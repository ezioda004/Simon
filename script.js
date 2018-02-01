
$(document).ready(function(){

  let sequence = [];
  let score = 0;
  let gameCheck = false;
  let checkingIndex = 0;
  var timeCheck = false;

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
  
    // document.getElementById("arc1").setAttribute("d", describeArc(75, 75, 50, 0, 359));   // When width < 500px
    document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
 
//Intro animation

$(".intro").css("display", "block").addClass("animated lightSpeedIn")

$(".intro").on("click", function(){
  $(this).addClass("animated lightSpeedOut")
  setTimeout(() => {
    $(".intro").css("display", "none");
    $(".mode").css("display", "block").addClass("animated flipInX");
  }, 2000);
  // $("#red").animate({backgroundColor : "red"}, 2000);
  
});

//Easy mode animation

$("#easy").on("click", function(){
  $(".mode").addClass("animated flipOutX");
  $("#red").animate({backgroundColor : "red"}, 2000, function(){
    $("#yellow").animate({backgroundColor : "yellow"}, 1000, function(){
      $("#green").animate({backgroundColor : "green"}, 1000, function(){
        $("#blue").animate({backgroundColor : "blue"}, 1000, function(){
          $(".counter").css("display", "block").addClass("animated", "tada");
          setTimeout(function(){
            easyMode();
            setTimeout(function(){
              // gameCheck = true;
              checker();
            }, 1000)
            
          }, 2000)
          
          
          
        });
      });
    });
  });
})

function time(){
  stopTime = setTimeout(function(){
    var deg = 0;
    if (timeCheck){
      alert("timesUPP");
      console.log("ok")
      
      runAgain();
    }
    console.log("okok")
  }, 10000);
} 

function arcAnimate(){
  var deg = 9;
  animate = setInterval(function(){
    document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, deg));
    deg+=9;
  }, 250);
}
//Easy mode


function easyMode(){
  score+=1;
  $(".counter span").html(score);
  sequence.push(Math.floor(Math.random()*4));


  runAgain();
  
}

function runAgain(){
  var j = 0;
  document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 0));
gameCheck = false;
sequence.forEach(function(val, i){
  
 setTimeout(function(){
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
    (function(){
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


function checker(){
  console.log("working");
    
    checkingIndex = 0;
    $("#green").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
        // var timeCheck = setTimeout(function(){
        //   console.log("timed out");
        //   runAgain();
        // }, 5000);
        $("#greenS").get(0).play();
        console.log(checkingIndex);
        if (sequence[checkingIndex] === 0){
          
          if (checkingIndex === sequence.length-1){
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
          alert("wrong!");
          timeCheck = false;
          clearInterval(animate);
            clearTimeout(stopTime);
          setTimeout(() => {
            runAgain();
          }, 1000);
          
        }
      }

    });
    $("#red").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
        console.log(checkingIndex);
        $("#redS").get(0).play();
        if (sequence[checkingIndex] === 1){
          
          if (checkingIndex === sequence.length-1){
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
          alert("wrong!");
          timeCheck = false;
          clearInterval(animate);
            clearTimeout(stopTime);
          setTimeout(() => {
            runAgain();
          }, 1000);
        }
      }

      });
    $("#yellow").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
        console.log(checkingIndex);
      $("#yellowS").get(0).play();
      if (sequence[checkingIndex] === 2){
        
        if (checkingIndex === sequence.length-1){
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
        alert("wrong!");
        timeCheck = false;
          clearInterval(animate);
            clearTimeout(stopTime);
        setTimeout(() => {
          runAgain();
        }, 1000);
        }
      }
      
        });
    $("#blue").on("click", function(e){
      e.preventDefault();
      if (gameCheck){
        console.log(checkingIndex);
      $("#blueS").get(0).play();
      if (sequence[checkingIndex] === 3){
        
        if (checkingIndex === sequence.length-1){
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
        alert("wrong!");
        timeCheck = false;
          clearInterval(animate);
            clearTimeout(stopTime);
        setTimeout(() => {
          runAgain();
        }, 1000);
      }
      }
      
      });
}

});