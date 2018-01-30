
$(document).ready(function(){

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


// $(".intro").fadeIn(3000, function(){
//    setTimeout(() => {
//     $(".intro h1").fadeOut(3000);
//    }, 1000);
// })
 
$(".intro").css("display", "block").addClass("animated lightSpeedIn")

$(".intro").on("click", function(){
  $(this).addClass("animated lightSpeedOut")
  setTimeout(() => {
    $(".intro").css("display", "none");
    $(".mode").css("display", "block").addClass("animated flipInX")
  }, 2000);
  // $("#red").animate({backgroundColor : "red"}, 2000);
  
});

$("#easy").on("click", function(){
  $(".mode").addClass("animated flipOutX	")
  $("#red").animate({backgroundColor : "red"}, 2000, function(){
    $("#yellow").animate({backgroundColor : "yellow"}, 1000, function(){
      $("#green").animate({backgroundColor : "green"}, 1000, function(){
        $("#blue").animate({backgroundColor : "blue"}, 1000, function(){
          $(".counter").css("display", "block").addClass("animated", "tada");
        });
      });
    });
  });
})




  // $('.ml11 .letters').each(function(){
  //   $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  // });
  
//   anime.timeline({loop: false})
//     .add({
//       targets: '.ml11 .line',
//       scaleY: [0,1],
//       opacity: [0.5,1],
//       easing: "easeOutExpo",
//       duration: 1000
//     })
//     .add({
//       targets: '.ml11 .line',
//       translateX: [0,$(".ml11 .letters").width()],
//       easing: "easeOutExpo",
//       duration: 1000,
//       delay: 100
//     }).add({
//       targets: '.ml11 .letter',
//       opacity: [0,1],
//       easing: "easeOutExpo",
//       duration: 1000,
//       offset: '-=775',
//       delay: function(el, i) {
//         return 34 * (i+1)
//       }
//     }).add({
//       targets: '.ml11',
//       opacity: 0,
//       duration: 1000,
//       easing: "easeOutExpo",
//       delay: 1000
//     });
  

});
