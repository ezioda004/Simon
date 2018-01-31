
$(document).ready(function(){

  let sequence = [];
  let score = 0;
  let gameCheck = false;
  let checkingIndex = 0;

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
  
  window.onload = function() {
    // document.getElementById("arc1").setAttribute("d", describeArc(75, 75, 50, 0, 359));   // When width < 500px
    document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 130, 0, 359));
  };
 
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
              gameCheck = true;
            checker();
            }, 1000)
            
          }, 2000)
          
          
          
        });
      });
    });
  });
})


//Easy mode


function easyMode(){
  score+=1;
  $(".counter span").html(score);
  sequence.push(Math.floor(Math.random()*4));
  
  sequence.forEach(function(val){
    if (val === 0){
      $("#greenS").get(0).play();
    }
    else if (val === 1){
      $("#redS").get(0).play();
    }
    else if (val === 2){
      $("#yellowS").get(0).play();
    }
    else if (val === 3){
      $("#blueS").get(0).play();
    }
  });
  
}


function checker(){
  console.log("working");
  if (gameCheck){
    // for (let i = 0; i < sequence.length; i++){
    //   if (sequence[i] === 0){

    //   }
    // }
    $("#green").on("click", function(e){
      e.preventDefault();
      $("#greenS").get(0).play();
      if (sequence[checkingIndex] === 0){
        checkingIndex+=1;
        setTimeout(() => {
          easyMode();
        }, 2000);
        
      }
      else {
        alert("wrong!");
      }
    });
    $("#red").on("click", function(e){
      e.preventDefault();
        $("#redS").get(0).play();
        if (sequence[checkingIndex] === 1){
          checkingIndex+=1;
          setTimeout(() => {
            easyMode();
          }, 2000);
        }
        else {
          alert("wrong!");
        }
      });
    $("#yellow").on("click", function(e){
      e.preventDefault();
      $("#yellowS").get(0).play();
      if (sequence[checkingIndex] === 2){
        checkingIndex+=1;
        setTimeout(() => {
          easyMode();
        }, 2000);
      }
      else {
        alert("wrong!");
      }
        });
    $("#blue").on("click", function(e){
      e.preventDefault();
      $("#blueS").get(0).play();
      if (sequence[checkingIndex] === 3){
        checkingIndex+=1;
        setTimeout(() => {
          easyMode();
        }, 2000);
      }
      else {
        alert("wrong!");
      }
      });
  }
}

});


